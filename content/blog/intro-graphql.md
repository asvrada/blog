---
date: '2020-04-04'
title: My note on GraphQL
category: note
---

> https://graphql.org/learn/

GraphQL is a different way to interact with data from a datasource. Like RESTful, it's merely a specification, an idea rather than some actual library/package that you can run on your compute. (Of course there are many libraries implement GraphQL for you)

## Concepts

Unlike RESTful where you expose many API enpoints, GraphQL exposes one root API, and it accepts a query (You could say it's like SQL in database?) to perform various data fetching.

Some keywords: 

### schema
The schema of your API, what request can it handle? What data can it provide? etc

### Pagination
