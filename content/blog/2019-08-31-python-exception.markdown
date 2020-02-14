---
title: python3 exception snippets
layout: post
tags: [code]
---

Create custom exception like:

```python
class YourException(Exception):
    def __str__(self):
        return type(self).__name__ + ": " + super().__str__()

class BadRuleException(YourException):
    pass

class BadRequestException(YourException):
    pass
```

And catch them like:

```python
try:
    do_something_might_raise_exception()
expect BadRuleException as e:
    return str(e)
```
