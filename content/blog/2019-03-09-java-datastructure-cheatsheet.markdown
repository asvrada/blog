
title: Java Datastructure Cheatsheet
layout: post
tags: [note]
---

# Table of Content:

1. String
2. Array
3. Map
4. Set
5. Stack
6. Queue

Common interface Collection has method isEmpty().

## 1. String

Get char at index: use `.charAt()`, return `char`.

### Operations:

```java
s.length()
s1.equals(s2)
substring(start, end)

replaceAll(regex, str);
split(regex);
indexOf(CharSequence); // which is basically a string
```

## 2. Array

### normal array: int[] xxx

To get length: `arr.length`

```java
Arrays.sort(arr);

for (int each: xxx) {
    // you can do this
}

// to convert to List
// Do it manually
```

### List<E>

```java
Collections.sort(list, comparator);
list.sort(comparator);

for (E each: list) {
    // ok, too
}

// to convert to array
// Do it manually
```

## 3. Map

```java
Map<typeofkey, typeofvalue> xxx = new HashMap<>();
```

If to use primitive types like `int` and `char`, use wrapper class for the type decleration: `Integer` and `Character`.

### Map operations:

```java
.put(k, v) .putIfAbsent
.get(k); .getOrDefault
.remove(k)
.containsKey(k);
.containsValue(k)
.entrySet
.keySet
.values
.size
```

## 4. Set

```java
Set<type> set = new HashSet<>()
```

### Set operations

```java
.add
.contains
.size
.remove

for (type each : set) {
    ...
}
```

## 5.Stack

```java
Stack<type> stack = new Stack<>()
```

### Stack operations

```java
.peek()
.pop()
.push()
.empty()
```

## 6.Queue
```java
Queue<T> queue = new LinkedList();
PriorityQueue(Comparator)

.offer()
.poll()
.peek()
```