---
title: Union Find Template
layout: post
tags: [code]
---

Problems can be solved with Union Find

1. [200. Number of Islands](https://leetcode.com/problems/number-of-islands)
1. [305. Number of Islands II](https://leetcode.com/problems/number-of-islands-ii/)
2. [323. Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/)

```java
// Following is the solution to 305. Number of Islands II
class Solution {
    int row;
    int col;
    
    class UnionFind {
        int[] parent;
        int count;
        
        UnionFind(int m, int n) {
            parent = new int[m * n];
            count = 0;
            
            Arrays.fill(parent, -1);
        }
        
        int find(int id) {
            while (parent[id] != id) {
                parent[id] = find(parent[id]);
                id = parent[id];
            }
            
            return id;
        }
        
        void union(int node1, int node2) {
            int root1 = find(node1);
            int root2 = find(node2);
            
            // do nothing
            if (root1 == root2) {
                return;
            }
            
            count--;
            parent[root1] = root2;
        }
    }
    
    public List<Integer> numIslands2(int m, int n, int[][] positions) {
        int[][] dirs = { {0, 1}, {1, 0}, {-1, 0}, {0, -1} };

        List<Integer> ans = new ArrayList();
        
        if (positions.length == 0 || positions[0].length == 0) {
            return ans;
        }
        
        row = m;
        col = n;
        
        UnionFind uf = new UnionFind(m, n);
        
        for (int[] pos: positions) {
            // add new island
            int id  = pos[0] * col + pos[1];
            uf.parent[id] = id;
            uf.count++;
            
            // union in four direction
            for (int[] dir: dirs) {
                int x = pos[0] + dir[0];
                int y = pos[1] + dir[1];
                int nid = x * col + y;
                
                if (x < 0 || x >= row || y < 0 || y >= col || uf.parent[nid] == -1) {
                    continue;
                }
                
                uf.union(nid, id);
            }
            
            ans.add(uf.count);
        }
        
        return ans;
    }
}
```
