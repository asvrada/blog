---
title: Learning Django (2)
layout: post
tags: [note]
---

In [last part](/blog/2019/02/08/django-note-1.html) we talked about the basic structure of a Django project. This part we will talk about basic rules/assumptions django makes.

> Following project is based on the [LocalLibrary](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Tutorial_local_library_website) tutorial by Mozilla.  
> This tutorial is actually better than the official one.

# Project level

Inside the settings.py for the project, we should point the URL to our apps' root URL.

```python
urlpatterns += [
    # Redirect if there is only one app
    path('', RedirectView.as_view(url='/catalog', permanent=True)),
    path('catalog/', include('catalog.urls'))
]
```

# App level

## Models

You just define what fields that each model contains, and relations like ForeighKey.

Let's define the following models for later:

```python
class Book(models.Model):
    """
    Model representing a book (but not a specific copy of a book).
    """
    title = models.CharField(max_length=200)

    # Foreign Key used because book can only have one author, but authors can have multiple books
    # Author as a string rather than object because it hasn't been declared yet in the file
    author = models.ForeignKey('Author', on_delete=models.SET_NULL, null=True)
    
class Author(models.Model):
    """Model representing an author."""
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

```

Sometime it's better to overwirte the `get_absolute_url` function, so this model can generate a URL pointing to itself. To do that, just use `reverse` function and the name of this routing defined in the `urls.py`:

```python
def get_absolute_url(self):
    """Returns the url to access a particular author instance."""
    return reverse('author-detail', args=[str(self.id)])
        
# and this would be in your urls.py
# you are refering to this rule from above
urlpatterns = [
    ...,
    path('book/<int:pk>', views.BookDetailView.as_view(), name='book-detail'),
    ...
]
```

## Views

It's the easiest to just inherent one of the generic view classes (ListView, DetailView, etc). 

For `ListView`, it will list all rows stored in this table inside database.

For `DetailView`, it implicitly accpets a primary key that identifies the object to display in detail. We don't need to query and filter the objects manually.

Then provide essentials like `model` that this view is going to represent, `template_name` that the name of the template HTML this view is going to fill its data with, and `content_object_name` that to use in template HTML.


## Templates

Templates define how the HTML page will look like.

One useful thing is to quickly find the objects that one model point to others with relations like ForeignKey.

Given above book and author example, if we want to know all the books published by one author, we could use this in our templates:

`author.book_set.all` with the structure of `<object1>.<object2>_set.all`, where object2 has a foreign key to object1.

Django will fetch all the books which has a foreign key that points to this author, so we can use them.

## URLs

Looks something like this.

We call `as_view` function because we need to convert class based views into function based views that routers can handle.

```python
urlpatterns = [
    path('', views.index, name='index'),
    path('books/', views.BookListView.as_view(), name='books'),
    path('book/<int:pk>', views.BookDetailView.as_view(), name='book-detail'),
    path('authors/', views.AuthorListView.as_view(), name='authors'),
    path('authors/<int:pk>', views.AuthorDetailView.as_view(), name='author-detail'),
    path('mybooks/', views.LoanedBooksByUserListView.as_view(), name='my-borrowed'),
    path('borrowed/', views.LoanedBooksAdminListView.as_view(), name='all-borrowed'),
    path('book/<uuid:pk>/renew/', views.renew_book_librarian, name='renew-book-librarian'),

]
```

> One thing Django really confuses beginner is that there is so much simplified process and you have no idea how one thing works because the process gets covered up under layers of classes..

