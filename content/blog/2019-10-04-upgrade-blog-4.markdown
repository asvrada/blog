---
title: Write a blog with Django - 4 Test
layout: post
tags: [code]
---

With our not-that-detailed design of the website in minde, lets begin our project by writing tests.

> These articles are better than this one:  
> [ intro/tutorial05](https://docs.djangoproject.com/en/2.2/intro/tutorial05/) 
> [ Django/Testing](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Testing)

# What, Where, How?

But first, let's define "test", as it seems to be the second least welcomed thing, right behind "comments", in the Computer Science world.

## What

What is test and what do we test? So we use tests to test each and every functions that we write. We run our functions/features with some given input, and compare the output against expected result to test the correctness of them. This way, we can rest assure that these functions are working as expected, and when we change something inside these functions, we could always run these test to make sure their behaviors are not changed.

## Where

Now, where do we put these tests, specifically in this Django project? It's actually very flexible. You could put tests anywhere in your project, under each of your applications' folders (for example, `post/`, in this project), as long as the name of the file begins with `test`. I've decided to put all tests under a folder called `custom_tests`, and create one test file for each model like this:

```
post
├── custom_tests
│   └── test_post.py
```

## How

How do we write these tests then? Well, Django provides many APIs for this, should really check their website. Since I am using RESTful API for this project, I use the testing API provideds by Django REST framework. `from rest_framework.test import APITestCase`, to be specific. It's a class based test case, so it's easier to setup the env for each smaller tests. And inside the class, you write a test by prefix the function `test_xxx`. Each function's context is seperated from each other, but they all share the same env setup in the class.

```python
class PostTestsAlice(APITestCase):
    """
    Login as Alice and test behavior
    """

    # set up env
    def setUp(self):
        # do something...
        pass

    def test_something(self):
        pass
```

And you run all your tests by using `python manage.py test`.

# Let's begin

In this test case, `PostTestsAlice`, lets only test things related to post:

1. GET(list)/POST(create) to `/api/posts/`
2. GET(retrieve)/PUT(update)/DELETE(Destroy) to `/api/posts/<slug>`

Let's see a few examples:

```python
class PostTestsAlice(APITestCase):
    def test_get_posts_all(self):
        posts = Post.objects.all()
        self.assertEqual(COUNT_POST, len(posts))

        response = self.client.get('/api/posts/', format='json')

        # check number of posts
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), COUNT_POST)

        # check field of data
        self.assertEqual(POST_GET_FIELDS, set(response.data[0]))

    def test_get_post_by_slug(self):
        response = self.client.get(f"/api/posts/{self.slug_example}", format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # check fields
        self.assertEqual(POST_GET_FIELDS, set(response.data))

        # check match
        self.assertEqual(response.data["slug"], self.slug_example)
```

The test is very long, you can check the full version [here](https://github.com/asvrada/blog-django/blob/master/post/custom_tests/test_post.py)

# Pass the tests

With tests written first without actually implementing the features, we are sure going to fail every tests. It's time to implement them. But of course I didn't only write tests first before move to the implementation. It's more like an interwinded process: write test to see what I want, check implementation to see if its possible, and change tests accordingly. 

We are mainly testing the view, and here is the implementation of these APIs:

```python
# views.py
class ViewPostRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET(retrieve)/PUT(update)/DELETE(Destroy) to /api/posts/<slug>
    """
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    lookup_field = 'slug'

    queryset = Post.objects.all()

    def get_serializer_class(self):
        serializer = {
            'PUT': PostCreateSerializer,
            'PATCH': PostCreateSerializer,
            'GET': PostGetSerializer,
            'DELETE': PostGetSerializer
        }
        return serializer[self.request.method]


class ViewPostListCreate(generics.ListCreateAPIView):
    """
    Handles GET(list)/POST(create) to /api/posts/
    """
    queryset = Post.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        serializer = {
            'POST': PostCreateSerializer,
            'GET': PostGetSerializer
        }
        return serializer[self.request.method]

    # add user
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

```

Here I use two serializers because some fields are automatically generated like `content_html, author, date_publish, etc`, users should not be able to change them.

Thats it, out APIs related to Post model have been tested. In the next article, we are going to test APIs related to user login.
