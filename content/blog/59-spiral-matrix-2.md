---
date: '2019-10-10'
title: 59. Spiral Matrix II - Simulation
category: leetcode
---

```java
class Solution {
    public int[][] generateMatrix(int n) {
        if (n == 0) {
            return null;
        }
        
        if (n == 1) {
            return new int[][]{{1}};
        }
        
        // right, down, left, up
        int[][] dir = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        
        int[][] ans = new int[n][n];
        int num = 1;
        // pointer
        int x = 0;
        int y = 0;
        int idx = 0;
        
        while (num <= n * n) {
            // put num
            ans[x][y] = num;
            num++;
            
            // move pointer
            int nx = x + dir[idx][0];
            int ny = y + dir[idx][1];
            // if oob or filled
            if (!(0 <= nx && nx < n && 0 <= ny && ny < n) || ans[nx][ny] != 0) {
                // change dir
                idx = (idx + 1) % 4;
                
                // new nx, ny
                nx = x + dir[idx][0];
                ny = y + dir[idx][1];
            }
            x = nx;
            y = ny;
        }
        
        return ans;
    }
}
```