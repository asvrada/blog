---
title: PyCharm docstring example
layout: post
thumbnail: "uploads/pycharm_docstring.png"
tags: [code]
---

I know this is different than what proposed by PEP (Python Enhancement Proposals), but hey, it works in PyCharm!

```python
def entropy_2d(true_labels, pred_labels):
    """
    Calculate the entropy of the contingency matrix of clustering results
    Ref.: Wiki
    :param true_labels: the ground truth clustering result
    :type true_labels: list[int | str]
    :param pred_labels: the predicted clustering result by our algorithms
    :type pred_labels: list[int]
    :return: The entropy
    :rtype: int
    """
    pass
```
