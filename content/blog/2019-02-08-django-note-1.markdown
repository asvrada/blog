---
title: Learning Django (1)
layout: post
tags: [note]
---

Django is a very popular Python framework for server backend.

# Django project structure

A single Django project is consist of a management script, a folder of the same name that contains settings for this project, and many Django applications. 

```
project1
├── manage.py
├── project1 # settings for this project
├── app1
├── app...
└── appN
```

To create a project, type:
`django-admin startproject`

To create an app inside a project, type:
`django-admin startapp`

## File under project folder

```
project1
├── settings.py
├── urls.py
└── wsgi.py
```

* settings.py: Settings for this project. For instance, to use any app, you have to config them here.
* urls.py: defines the url router for this project. It handles HTTP request and dispatch them to correct app.
* wsgi.py: not idea for now.

## File under app folder

```
app1
├── apps.py
├── models.py
├── urls.py
└── views.py
```

* apps.py: settings for this app
* [models.py](https://docs.djangoproject.com/en/2.1/topics/db/models/): defines model of data for this app, this is like creating table in database.
* urls.py: defines how to map the HTTP request to different views
* views.py: defines how the data will be used
