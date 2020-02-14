---
title: Write a blog with Django - 1 the minimal demo
layout: post
tags: [code]
---

In this article I am going to show you how to build a minimal blog website using Django. I am not going to go through Django concepts in detail as I myself don't even quite understand them... So if you spot something wrong, please leave a comment below!

[Demo](https://imgur.com/jKHx3zb)

> Source code for the full project will by provided at the end of the article. So you really shouldn't copy & paste from each step as I only post part of the code.

## Create project and app

The first step is to create the skeleton of our project. I am going to call this Django project "blog", and it has one single app "post":

```bash
django-admin startproject blog
cd blog
python manage.py startapp post
```

Next, let's move to the design of the blog.

## The MVC deisgn

To make things easier, I think my blog should only display a list of articles on the home screen, and you can click and view each post in detail. In each article's webpage, you should be able to edit or delete that post. And that's all the functionality. Maybe in the future there will be a comment section, or even a tag system, a search function. But for now, let's keep it simple.

Django generally follows the Model-View-Controller architecture, and I am going to cover them one by one.

The model in Django is like a foundation. Whatever we do, we are mostly interact with models, like adding posts, register users, etc. To begin with, I think we only need two models: a custom `User` class and a `Post` class.

### User class

```python
# post/models.py
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    User for this website
    """
    pass

```

I create a custom `User` class and leave it empty, in case I want to make some change to the user's model in the future. 

With custom user class, don't forget to register it with Django:

```python
# post/admin.py
from django.contrib.auth.admin import UserAdmin
from .models import User

admin.site.register(User, UserAdmin)
```

Also swap the default User inside `settings.py`:

```python
# blog/settings.py
AUTH_USER_MODEL = 'post.User'
```

### Post class

This is the model where we store articles. I envision (take some random guess) that it's going to have several fields: `title, content, author, date of publish and date of last edit`. Since we have custom User class, remember to link to that when creating author field.

```python
class Post(models.Model):
    """
    A post model represent a article write by User
    """
    title = models.CharField(max_length=250)
    content = models.TextField(default='placeholder', null=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    date_publish = models.DateTimeField(auto_now=True)
    data_last_edit = models.DateTimeField(auto_now_add=True)

    class Meta:
        # newest post comes first
        ordering = ['-date_publish']

    def __str__(self):
        return self.title
```

## The View

The View in the MVC is where we display our data, and where user interact with our system. 

Unfortunately there is a concept called view in Django, and they are very different. For me, I think the view in Django is more like controller, because we put a lost of logic inside them. I will cover this in more detail in the Controller section, for now, just remember the View in MVC and the view in Django is not the same.

So the view in the MVC is all the HTML templates we are going to fill out data in. 

Right now there are only three pages that matter: a page listing all the posts, a page displays the article, and a page to edit article.

There are all navie html, I am just gonna leave them on GitHub and you could check them out yourself... Again, link at the bottom of the page.

## The Controller

This is the part where we get data from model, and figure out how to prepare them to display in the View. This part is called view in Django, generally we put them inside a python file called `views.py`.

I mentioned three pages to display in the View section, that will be one controller for each view. I am using Django's magic as frequent as possible to reduce codes you need to write. For the list and detail view, they are all just a simple Django built-in class:

```python
class PostListView(ListView):
    model = Post
    paginate_by = 10


class PostDetailView(DetailView):
    model = Post
```

### The permission system
When it comes to the page where we edit the article, its a little tricky. So reasonably, a post can only be editted by its author and the superadmin. Remember that I choose to use user authtication for possible future "comment section" upgrade, even though for now I am the only user who are posting stuff on the website.

In other words, we need a permission system to block unauthorized actions, like some random user deleting your posts.

Luckily, Django by default comes with its permission system. However, its a model-based system, not object-based. That means I can only control if a user can edit all the objects of the same type, but can't limit his access to part of the object base on rules like if his the author or not. 

The solution is: Guardian, a extension to Django that provides exactly what we need: per-object permission control. After reading through Guardian's documentation, I came up with the following codes:

```python
# post/views.py
class PostCreate(PermissionRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content']
    permission_required = 'post.add_post'

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def get_success_url(self):
        """
        Assign perm
        """
        owner = self.request.user
        assign_perm('post.change_post', owner, self.object)
        assign_perm('post.delete_post', owner, self.object)
        return super().get_success_url()

class PostUpdate(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content']

    # Test if user is the author of this post or is admin
    def test_func(self):
        user = self.request.user

        if user.is_superuser:
            return True

        # check if user has perm to change this post
        if 'change_post' not in get_perms(user, self.get_object()):
            return False

        return True

```

As the name of these two classes suggest, these two are for edit/create of a post. Note we are using `assign_perm` -- a Guardian's shortcut -- to assign the change and delete permission to the author of the post he just submitted. 

And inside `PostUpdate`, we check for that permission to see if this user owns this article.

## The rest

In this article I only posted codes that matter, just to save some space. However, you can find this repo at [here](https://github.com/asvrada/blog-django/tree/tutorial-1/post).
