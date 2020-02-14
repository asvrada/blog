---
title: How to deploy your website backend to Heroku
layout: post
tags: [code]
---

# TL; DR

Build your backend service with [Flask](http://flask.pocoo.org) (or anything you want that is supported by [Heroku](http://heroku.com)), and deploy it to Heroku so that your front-end project hosted on [Git Pages](https://pages.github.com) can access them, without hosting a cloud server, maintaining a domain and SSL certificate yourself.

# What I what

Earlier this year I developed a [Currency Converter](https://asvrada.github.io/blog/portfolio/currencyconverter) that, well, allows you to convert between different currencies. I found this tool useful during my studying abroad to help make purchase decisions. 

Since it's entirely a front-end project, I hosted it on Git Pages, a **free** service that allows you to publish files from your GitHub repo to the internet (actually this [blog](https://github.com/asvrada/blog) is hosted on Git Pages, too).

But there is one missing part: the currency exchange rate update service. Since this project is about currency conversion, it should be able to access the most recent currency exchange rates, but the only free API providing exchange rates comes with a HTTP request, which has been permanently blocked by modern browsers, for safety concerns.

To make a ajax request from the web, it has to be a HTTPS one. At that time my solution would be set up my own server and rely that request from the front-end to the actual API provider, but that would mean that I have to pay for a 1. VPS, 2. domain name and 3. SSL certificate to enable HTTPS for my website. But that's too much for only one API request. So I left the project unfinished there, until I met Heroku.

# How to "Heroku"

Now I know that Heroku is a powerful cloud computing solution provider blah blah, all I need is that it provides **free** project hosting. And not like Git Pages where you can only host static resources, you can actually run your code on Heroku, which makes a simple API service possible *(of course Heroku is more than that)*.

So, how to do that? Well since I am pretty sure there are more than enough tutorials about this topic, I am not going to repeat it here.  

> ![人类的本质就是复读机](https://img.moegirl.org/common/2/2f/Ywwuyi_复读机.jpg)  
> 拒绝复读，从我做起

Here is two tutorials that I followed during development: [deploying-a-python-flask-app-to-heroku](https://medium.com/the-andela-way/deploying-a-python-flask-app-to-heroku-41250bda27d0) and [Deploying-Flask-To-Heroku](https://github.com/twtrubiks/Deploying-Flask-To-Heroku). 



I would recommend you simply link your GitHub repo to Heroku app and enable auto-deploy, so whenever you push to your repo, the Heroku will automatically re-build the application and publish it, which makes everything better.

And boom, now your front-end and back-end are both ready, for free!

> But if I had the money and energy, I would rather host my own server :D
