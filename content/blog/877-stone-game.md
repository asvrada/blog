---
date: '2019-11-16'
title: 877. Stone Game
category: leetcode
---

Question: https://leetcode.com/problems/stone-game/

Post: https://leetcode.com/problems/stone-game/discuss/430915/java-single-dp-array-easier-to-understand

```java
class Solution {
    public boolean stoneGame(int[] piles) {
        int N = piles.length;
        if (N == 0) {
            return true;
        }
        
        // True if dp[i][j] is already computed
        boolean[][] flag = new boolean[N][N];
        // dp[i][j] := Maximum stone Alice can pick given piles[i...j] (both inclusive)
        int[][] dp = new int[N][N];
        
        // init dp
        // calculate sum
        int sum = 0;
        for (int i = 0; i < N; i++) {
            dp[i][i] = piles[i];
            sum += piles[i];
        }
        
        int ans = helper(0, N - 1, piles, flag, dp);
        
        // You win if you have more than half of all the stones
        return ans > (sum / 2);
    }
    
    int helper(int i, int j, int[] piles, boolean[][] flag, int[][] dp) {
        if (i > j) {
            return 0;
        }
        
        // memo
        if (flag[i][j]) {
            return dp[i][j];
        }
        
		// We take the minimal of two because Bob is going to pick optimially, leaving us minimal result
		
        // Alice pick left
														 // Then Bob pick left
        int left = piles[i] + Math.min(helper(i + 2, j, piles, flag, dp),
                                       // bob pick right
                                       helper(i + 1, j - 1, piles, flag, dp));
        // Alice pick right
															// Then Bob pick left
        int right = piles[j] + Math.min(helper(i + 1, j - 1, piles, flag, dp),
                                        // bob pick right
                                       helper(i, j - 2, piles, flag, dp));
        
        int best = Math.max(left, right);
        dp[i][j] = best;
        flag[i][j] = true;
        return best;
    }
}
```
