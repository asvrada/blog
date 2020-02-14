---
date: '2019-04-23'
title: C++ cheatsheet
---

# Table of Content:

1. String
2. Array
3. Map
4. Set
5. Stack
6. Queue

## 1. String

```cpp
string s = "abce"
string s("a")
```

### Operations:

```cpp
s.length()
s.size()
s1 == s2
s1.compare(s2)
substr(start, length)

replace(start, length, s2);

vector<string> split(string str, char delimiter) {
  vector<string> internal;
  stringstream ss(str); // Turn the string into a stream.
  string tok;
 
  while(getline(ss, tok, delimiter)) {
    internal.push_back(tok);
  }
 
  return internal;
}

find(char or str); // string::npos if not found
```

## 2. Array

### normal array

```cpp
int xxx[];
int *xxx = new int[];
```

To get length: **you can't**, use another variable to store the length;

```cpp
Arrays.sort(arr);

for (auto each: xxx) {
    // you can do this
}

// to convert to vector
// Do it manually

// or use iterator
vector<int> v(begin(arr), end(arr));
```

### vector<E>

```cpp
l.push_back();
l.pop_back();

sort(l.begin(), l.end());

for (auto each: list) {
    // ok, too
}

// to convert to array
int *a = v.data();
```

## 3. Map

```cpp
map<typeofkey, typeofvalue> xxx;
```

### Map operations:

```cpp
// access or modify or insert
map[key] = value;
// non-exist, use find(key) instead
.putIfAbsent
// non-exist
.getOrDefault

.erase(key or iterator)
.find(key);
// non-exist
.containsValue(k)

template<typename Map, typename Key>
bool contains(const Map &input, const Key &key) {
    for (const auto &pair: input) {
        if (pair.second == key) {
            return true;
        }
    }

    return false;
}

// non-exist
.entrySet
.keySet

.size
```

## 4. Set

```cpp
set<int> set_int;
```

### Set operations

```java
.insert
// compare with .end() iterator to see if its in the set
.find
.size
.erase

for (auto each : set) {
    ...
}
```

## 5.Stack

```java
Stack<type> stack = new Stack<>()
```

### Stack operations

```java
.top()
.pop()
.push()
.empty()
```

## 6.Queue & deque
```java
// Create a deque containing integers
std::deque<int> d = {7, 5, 16, 8};
 
// Add an integer to the beginning and end of the deque
d.push_front(13);
d.push_back(25);
```