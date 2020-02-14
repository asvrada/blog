---
date: '2019-10-24'
title: How to shuffle an array
---

[https://en.wikipedia.org/wiki/Fisher–Yates_shuffle](https://en.wikipedia.org/wiki/Fisher–Yates_shuffle)

```
-- To shuffle an array a of n elements (indices 0..n-1):
for i from n−1 downto 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]
```

### Python Implementation

```python
import random

def shuffle(a):
    random.seed()
    # start from last element
    for i in range(len(a) - 1, 0, -1):
        # range: [0, i)
        j = random.randrange(i)
        # swap a[i], a[j]
        a[i], a[j] = a[j], a[i]
```