---
date: '2019-01-25'
title: About Python truth value test
---

If you are using Python, you probably will write something like this to check if a list is empty:

```python
if list:
    print("not empty!")
else:
    print("empty list")
```

That's because empty list evaluates to `False`, as described on [official docs](https://docs.python.org/3.7/library/stdtypes.html#truth),.

But, if you type `[] == False` in a Python interactive shell and hit enter, the result is `False`!

```
>>> [] == False
False
```

If empty list evaluates to `False` in a if statement, then why a direct comparision between empty list and `False` evaluates to `False`? It should be `True`, right? What's happening here?

Because of this, I am using `len(some_list) == 0` to check empty-ness since the beginning, which is the least confusing and most explict way to do this.

But that doesn't resolve the problem: I don't know why it works, which didn't really bother me, until today.

## == operator

To know how things work, its better to have a look at the official documents, [here](https://docs.python.org/3.7/library/stdtypes.html#index-7) is the page for `==` operator.

And this page makes it very clear:

> Objects of different types, except different numeric types, never compare equal.

Back to `[] == False`, since these two objects are of different types: `list` and `bool` respectively, the result is `False`.

You can check this by `[] == {}`, which evaluates to `False`, because even if they are both empty and will evaluates to `True` in a `if` statement, they are not of the same type.

```python
if {}:
    # {} evaluates to False

if []:
    # [] evaluates to False
    
{} == []
# although they both evaluates to False above, the result here is False
```

## if statement

This part is described by [Truth Value Testing](https://docs.python.org/3.7/library/stdtypes.html#truth).

> Any object can be tested for truth value, for use in an if or while condition

So inside `if` statement, the truth value of variables like `[]` is defined by its `__bool__` functions:

> By default, an object is considered true unless its class defines either a `__bool__()` method that returns False or a `__len__()` method that returns zero, when called with the object.

That explains why empty list evaluates to False in a if statement. Now I am more comfortable to use `if some_list: xxx` in my code!