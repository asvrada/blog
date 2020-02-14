---
title: Reorder array given index
layout: post
tags: [code]
---

Encountered a situation where I have to re-order an array given the new index of its elements. Can't come up with a O(n) solution until I saw this:

```python
def reorder(arr, index):
    for i in range(len(arr)):
        while index[i] != i:
            # value to be overwritten
            index_old = index[index[i]]
            number_old = arr[index[i]]
            # put value at current index i to its correct location
            arr[index[i]] = arr[i]
            index[index[i]] = index[i]
            # recover overwritten info
            index[i] = index_old
            arr[i] = number_old

```

The outer loop for each i is required because the path may be in disjoint graphs.
