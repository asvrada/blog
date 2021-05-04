---
date: '2021-05-03'
title: 698. Partition to K Equal Sum Subsets
category: leetcode
---

Question: https://leetcode.com/problems/partition-to-k-equal-sum-subsets/

```java
class Solution {
    public boolean canPartitionKSubsets(int[] nums, int k) {
		if(nums == null || nums.length == 0)
			return false;
        
        if (k == 1) {
            return true;
        }
		
        Arrays.sort(nums);
        
		int n = nums.length;
		//result array
        // dp[i] = can the i-th subset meet the requirement
		boolean dp[] = new boolean[1<<n];
        // sum of i-th subset
		int total[] = new int[1<<n];
		dp[0] = true;
		
		int sum = 0;
		for(int num : nums)
			sum += num;

		if(sum % k != 0) 
			return false;

        // target sum of a subset
		sum /= k;
		if(nums[n-1] > sum)
			return false;
        if (sum == 0) {
            return true;
        }

		// Loop over power set
        // for each subset i
		for (int i = 0; i < (1<<n); i++) {
			if (!dp[i]) {
                continue;
            }
            
            // Loop over each element to find subset
            for (int j = 0; j < n; j++) {
                // Construct a new subset that include j-th number in nums
                int temp = i | (1 << j);
                // skip current subset
                if (temp == i) {
                    continue;
                }
                
                // if total sum is less than target store in dp and total array
                // total[i] % sum is to ignore previous result
                if((nums[j] + (total[i] % sum)) <= sum) {
                    dp[temp] = true;
                    total[temp] = nums[j] + total[i];
                } else {
                    break;
                }
            }

		}
		return dp[(1<<n) - 1];
	}
}
```