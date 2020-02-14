---
title: Write a blog with Django - 0 introduction
layout: post
tags: [note]
---

Recently I plan to upgrade my blog website, that's the one you are reading now. Right now it's a static blog, from a reader's point of view, a static blog is fine: it displays articles, even provides the ability to search. But after years of using it, I find it lacks the flexibility a "normal" blog with a backend could provide. 

One main issue I am having is that you can't edit or write a post online. I integrated my blog with GitHub, so I will have to make a git commit to make changes to my posts, and that's pretty overkill: I don't want to make a commit just to fix a typo. It's reasonable, but the work to get that done is just too much, and I can't really do it on my iPad (except for login to GitHub and modify the page there then commit).

So, it's decided, I am switching from static blog site to a real one. But there are so many blog frameworks, which one should I use? I used Wordpress once before, but not soon after I switched back to the static site. Now since it has been quite some times, I can't recall the exact reason why I gave up Wordpress, I think it's something to do with their support for Markdown. There, of course, is going to be one extension that makes your Wordpress site supports Markdown perfectly, but I don't want to do that now. I want to build a site that I have absolute control.

That leaves me only one option: do it yourself. However, I won't build the entire application from ground zero. I will use the popular framework Django to serve as the back-end. I choose Django mainly because I don't want to use Java, or... I don't really know much about Java. For its syntaxes, data structures, I am fine, but when it comes to actually build an application? Not so much, especially its web framework Spring, I never used it before. For this blog, I am looking at something I can pick up fast to get the website up and running, so, yeah, Python.

That's the motivation for me to upgrade my blog, and in the next post, I will show you the first iteration of my Django blog site.
