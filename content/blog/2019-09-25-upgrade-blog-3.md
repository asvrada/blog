---
title: Write a blog with Django - 3 Design
layout: post
tags: [code]
---

I just realized that I am cranking out undocumented codes and articles without a clear plan for the final product... That's definitely bad for development. And in this one, I am going to address that issue.

# Final Product
The project is going to be a simple, normal blog website. With React.js as frontend and Django as backend.

Let's break it down on actions a user can do on this site:

## User related
1. register new user
2. Manage user profile
3. Login/out
4. Write comment - for normal user
5. Write post - for user in user group `writer`

## Post related
1. List all posts
2. Search by name or tags or content
4. Create/Edit/Delete
5. Manage tags

# Phases
I am going to complete backend before move to frontend. While developing features related to post first, ignoring things like comment/tag, I am going to stick to test driven development: write test, then implement features to pass these test.

For the next article, I will introduce test into my project, see how tests can make development easier (or not).
