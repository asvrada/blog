---
title: Write a blog with Django - 2 RESTful
layout: post
tags: [code]
---

Welcome to another episode of write a blog with Django... but actually not, not entirely.

So actually I plan to seperate the fronend and backend for this project. For the frontend, I am going to use React.js, and for the backend, we continue to use Django but with a huge change: we will convert this backend into a RESTful service for the frontend to fetch info. I will cover this RESTful thing later in this article.

Why bother seperating the frontend? We can use Django's template engine to easily create frontend pages, but that's not very fun. Want SCSS? Install a whole bunch of extensions to Django and add lots of config to your settings only to make it work, and may be you end up messing the whole system. I don't want that. 

Before we move on, I made some quick change to the project since last post, mainly are the introduction of slug and markdown.

### slug

Slug is originated as a newspaper's term, used to refer to the article a reporter might be working on, while the final title for that article is not yet determined. Generally, It's like a human-readable ID. We use this mainly inside a URL so the link makes sense for reader. 

To add this to our site, Django actually does most of the job for us, all we need is to add a slug field to our `Post` model:

However slug will not be automatically generated, so we have to call the function to do that, which is done inside `save()`. We only generate the slug when a new post is created, so the link to this article remains consistent.

```python
# models.py
class Post(models.Model):
    """
    A post model represent a article write by User
    """
    slug = models.SlugField(max_length=32)

    def save(self, *args, **kwargs):
        """
        Set slug once
        """
        if not self.slug:
            # Newly created object, set slug
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

```

Now, to use slug instead of id like we currently are, just replace `<int:pk>` to `<slug:slug>` inside `urls.py`.

> The pattern `<type:parameter>` we use here inside a route means, for this input (from URL) of `type`, we assign it to `parameter`.

```python
# urls.py
urlpatterns = [
    ...,
    path('post/<slug:slug>/', views.PostDetailView.as_view(), name='post-detail'),
    path('post/<slug:slug>/edit/', views.PostUpdate.as_view(), name='post-edit'),
    path('post/<slug:slug>/delete/', views.PostDelete.as_view(), name='post-delete'),
]
```

Also don't forget to use `self.slug` instead of `self.id` for functions like `get_absolute_url`.

### Markdown

I decided to use markdown to write each article, and let the backend compile these markdown into HTML. So I am going to add a new field to the Post model to store the compiled HTML codes.

```python
# models.py
import markdown2

class Post(models.Model):
    """
    A post model represent a article write by User
    """
    content_html = models.TextField(null=False)

    # remember to call this inside self.save
    def compile_content(self):
        self.content_html = markdown2.markdown(self.content)
```

# RESTful API?

Ok, lets get back to the beginning of this article. What is the RESTful API for? 

This RESTful thing is basically an architecture for designing API, luckily we won't do much because there is this thing called [Django REST framework](https://www.django-rest-framework.org/) that does all this for us. The installation process is on their website and easy to follow. After installed it, let's see how to use it.

# The Serializers
One new concept introduced by this framework is `serializers`. As the name suggests, it serializes Python object into something suitable for transferring using HTTP calls, usually string in JSON format. Let's create a new file called `serializers.py` to put all the new serializers.

```python
# serializers.py
from .models import Post, User
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'title', 'content_html', 'author', 'date_publish', 'data_last_edit']
```

# A new view

As we are converting backend into a RESTful service that only accepts API calls, we entirely discard HTML pages from backend. That means no more HTML templates, views, urls we wrote previously.

And instead, we use ViewSet from REST framework. In side the `views.py`, lets create some new views.

```python
# RESTful views
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('username')
    serializer_class = UserSerializer


class PostViewSet(viewsets.ModelViewSet):
    """
        API endpoint that allows posts to be viewed or edited.
        """
    queryset = Post.objects.all().order_by('-date_publish')
    serializer_class = PostSerializer
```

Right now we just use the default implementation to expose the Get/Update/Delete/Create operation to any user calling this API. That's is not final because we will be adding authorization to these endpoints later. But just leave it as simple as possible now.

# URLs

Finally, let's create URL endpoints to expose these new APIs. This is done using framework's router. Let's put every endpoint behind `/api/`.

```python
from rest_framework import routers
# router for restful API
router = routers.DefaultRouter()
router.register(r'posts', views.PostViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
```

# Codes
You can see the codes related to this article [here](https://github.com/asvrada/blog-django/tree/v0.2).
