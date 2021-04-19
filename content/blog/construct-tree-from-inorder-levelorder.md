---
date: '2021-04-18'
title: Construct Binary Tree from In-order and Level-order traverse
category: code
---

### Question

You are given two array, `in`, which contains the result of the in-order traverse of a binary tree, and `level` which contains the result of the level-order traverse of a binary tree. Return the original binary tree.

### Algorithm

Find the root by taking the first element from level-order array, then construct new in-order array for left and right sub tree, and construct new level order array for left and right sub tree as well.

To generate in-order traverse, simply take the elements that are to the left/right of the root value.

To generate level-order traverse, take only the elements from the parent level-order array that are present in the in-order array for sub tree.

Then recursively generate the left & right sub tree.


### Solution

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int x) {
        val = x;
    }
}

class Main {

    TreeNode solution(int[] in, int[] level) {
        if (in == null || in.length == 0) {
            return null;
        }

        TreeNode root = new TreeNode(level[0]);
        int[] inLeft = buildInOrderForLeftSubTree(in, root.val);
        root.left = solution(
            inLeft,
            buildLevelOrder(level, inLeft)
        );

        int[] inRight = buildInOrderForRightSubTree(in, root.val);
        root.right = solution(
            inRight,
            buildLevelOrder(level, inRight)
        );

        return root;
    }

    int indexOf(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }

        return -1;
    }

    // return the elements in `in` array that are on the left side of root
    int[] buildInOrderForLeftSubTree(int[] in, int root) {
        int idxRoot = indexOf(in, root);
        if (idxRoot == 0) {
            return null;
        }

        int[] ans = new int[idxRoot];
        for (int i = 0; i < idxRoot; i++) {
            ans[i] = in[i];
        }

        return ans;
    }

    // return the elements in `in` array that are on the right side of root
    int[] buildInOrderForRightSubTree(int[] in, int root) {
        int idxRoot = indexOf(in, root);
        if (idxRoot == (in.length - 1)) {
            return null;
        }

        int[] ans = new int[in.length - idxRoot - 1];
        for (int i = 0; i < ans.length; i++) {
            ans[i] = in[idxRoot + 1 + i];
        }

        return ans;
    }

    int[] buildLevelOrder(int[] level, int[] in) {
        if (in == null) {
            return null;
        }

        // build set
        Set<Integer> set = new HashSet<>();
        for (int each : in) {
            set.add(each);
        }

        // generate new level-order array, containing elements that are in `in` array only
        int[] ans = new int[set.size()];
        int idx = 0;

        for (int each : level) {
            if (set.contains(each)) {
                ans[idx++] = each;
            }
        }

        return ans;
    }

    public static void main(String[] args) {
        Main main = new Main();

        TreeNode root = main.solution(new int[]{4, 8, 10, 12, 14, 20, 22}, new int[]{20, 8, 22, 4, 12, 10, 14});
        System.out.println(root.val);

    }
}
```


