---
date: '2021-04-30'
title: 31. Next Permutation
category: leetcode
---

Question: https://leetcode.com/problems/next-permutation/

Post: https://leetcode.com/problems/next-permutation/discuss/1188189/java-provided-on-solution-with-comments

Please see the Solution section first for proof why this works.

```java
class Solution {
    public void nextPermutation(int[] nums) {
        if (nums.length <= 1) {
            return;
        }
        // check if all number are in descending order
		// and find the index of the number that breaks this descending order
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
		    // entire array are NOT in descending order
            // find the first number (nums[j]) that is bigger than nums[i]
            int j = nums.length - 1;
            while (j > i && nums[i] >= nums[j]) {
                j--;
            }

            swap(nums, i, j);
            reverse(nums, i + 1);
        } else {      
            // if entire array are in descending order, reverse entire array
            reverse(nums, 0);
        }
    }
    
    void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    
    // Reverse array[start:]
    void reverse(int[] nums, int start) {
        // inclusive
        int i = start, j = nums.length - 1;
        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }
}
```

We can remove the duplicate reverse, since if `i >= 0` is false, then its going to be -1, then `reverse(nums, i + 1)` is the same as `reverse(nums, 0)`

```java

class Solution {
    public void nextPermutation(int[] nums) {
        if (nums.length <= 1) {
            return;
        }
        // check if all number are in descending order
		// and fine the index (which is i) of the number that break this descending order
        int i = nums.length - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) {
            i--;
        }
        
        if (i >= 0) {
		    // entire array are NOT in descending order
            // find the first number (nums[j]) that is bigger than nums[i]
            int j = nums.length - 1;
            while (j > i && nums[i] >= nums[j]) {
                j--;
            }
            
            // swap
            swap(nums, i, j);
        }
        // and reverse nums[i+1:]
        reverse(nums, i + 1);
    }
    
    void swap(int[] nums, int i, int j) {
        int tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
    }
    
    // Reverse array[start:]
    void reverse(int[] nums, int start) {
        // inclusive
        int i = start, j = nums.length - 1;
        while (i < j) {
            swap(nums, i, j);
            i++;
            j--;
        }
    }
}
```