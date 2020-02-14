---
title: serialize and deserialize tree
layout: post
tags: [code]
---

[LeetCode](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/)

```python
# Definition for a binary tree node.
class TreeNode(object):
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None


class Codec:

    def serialize(self, root):
        """Encodes a tree to a single string.

        :type root: TreeNode
        :rtype: str
        """
        if not root:
            return []

        queue = [root]
        ans = []

        while len(queue) != 0:
            head = queue.pop(0)

            if head is None:
                ans.append(None)
                continue

            ans.append(head.val)

            queue.append(head.left)
            queue.append(head.right)

        while ans[-1] is None:
            ans.pop()
        ans = map(lambda x: str(x) if x is not None else "null", ans)
        return "[{}]".format(",".join(ans))

    def deserialize(self, data):
        """Decodes your encoded data to tree.

        :type data: str
        :rtype: TreeNode
        """
        if not data:
            return None
        list_data = list(map(lambda x: int(x) if x != "null" else None, data[1:-1].split(",")))

        opening_node = []

        root = TreeNode(list_data.pop(0))
        opening_node.append(root)

        while len(opening_node) != 0:
            head = opening_node.pop(0)

            if len(list_data) == 0:
                continue

            if list_data[0] is not None:
                head.left = TreeNode(list_data.pop(0))
                opening_node.append(head.left)
            else:
                list_data.pop(0)

            if len(list_data) == 0:
                continue

            if list_data[0] is not None:
                head.right = TreeNode(list_data.pop(0))
                opening_node.append(head.right)
            else:
                list_data.pop(0)

        return root

```
