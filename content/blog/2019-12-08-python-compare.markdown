---
title: Python what is id, hash, ==, != for custom classes
layout: post
tags: [python, hash, class]
---

What is `id, hash, ==, !=` in Python and how to use them.

# id

The built-in function `id` is like the pointer in C/C++, it can uniquely identify an object, and even for the same object, its value will be different between two runs of the program. It's like the pointer in C/C++ because the memory location would always change for different runs. If `id(x) == id(y)`, then x and y are exactly the same object

For example:

```python
class Num:
    def __init__(self, num):
        self.num = num


n = Num(100)
print(id(n))
print(id(1))

# first run:
4317974864
4315161744

# second run:
4546015440
4543202448
```

We can see that even the content (Num(100) and 1) has the same value during these two runs, they don't have the same id. 

Also the id won't be the same for two instance of a class, even if they have exactly the same content:

```python
class Num:
    def __init__(self, num):
        self.num = num


n1 = Num(100)
n2 = Num(100)
print(id(n1))
print(id(n2))

# output
4360906320
4360906384
```

In summary, `id` is like pointer, each instance has a unique id.

# hash

Like `id`, the `hash` function would return some random number, except that this number is calculated in a way that the same value would always results in the same hash value. It's more controlled than `id`.

For a class in python, without overriding `__hash__` function, the hash value for two instances with the same value would still be different:

```python
class Num:
    def __init__(self, num):
        self.num = num


n1 = Num(100)
n2 = Num(100)
print(hash(n1))
print(hash(n2))

# first run
274718565
274718569

# second run
281771105
281771109
```

If we wish to treat two instances to be the same if they have exactly the same value, then we could add `__hash__` to the class like this:

```python
class Num:
    def __init__(self, num):
        self.num = num

    def __hash__(self):
        return hash(self.num)
```

For a more complicated class, return the hash value of a tuple of variables of the class that when combined, could uniquely identify an instance would do the job.

```python
class Pair:
    def __init__(self, key, value):
        self.key = key 
        self.value = value

    def __hash__(self):
        return hash((self.key, self.value))


a = Pair(1, 1)
b = Pair(1, 1)
c = Pair(1, 2)
print(hash(a))
print(hash(b))
print(hash(c))

# first run:
3713081631935493181
3713081631935493181
3713081631934410656

# second run:
3713081631935493181
3713081631935493181
3713081631934410656
```

Now we could compare two instances of the same class by checking the hash value. But of course there is a better way to do this.

# == / !=

To compare two instances of the same class, always override `__eq__` and `__nq__`. It may seem unnecessary to implement both, since if `__eq__` returns True, then logically `__nq__` returns False. However you could have both functions to return True and Python interpreter doesn't check or care at all. So remember to always override two together like below.

```python
class Pair:
    def __init__(self, key, value):
        self.key = key 
        self.value = value

    def __hash__(self):
        return hash((self.key, self.value))

    def __eq__(self, value):
        if isinstance(value, self.__class__):
            return self.key == value.key and self.value == value.value

        return False

    def __ne__(self, value):
        return not (self == value)


a = Pair(1, 1)
b = Pair(1, 1)
c = Pair(1, 2)
print(a == b)
print(a != b)
print(a == c)
print(a != c)

# output
True
False
False
True
```
