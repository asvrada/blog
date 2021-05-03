---
date: '2021-02-14'
title: 785. Is Graph Bipartite?
category: leetcode
---

Question: https://leetcode.com/problems/is-graph-bipartite/

Post: https://leetcode.com/problems/is-graph-bipartite/discuss/1065679/java-bfs-assign-2-color

```java
class Solution {
    public boolean helper(int[][]graph, int[] color, int src) {
        Queue<Integer> queue = new LinkedList<>();
        
        // enqueue
        color[src] = 0;
        queue.offer(src);
        
        while (queue.size() > 0) {
            int head = queue.poll();
            
            // find neighbor
            for (int neighbor: graph[head]) {
                // if color doesn't match
                if (color[neighbor] == color[head]) {
                    return false;
                }
                
                // skip visited
                if (color[neighbor] != -1) {
                    continue;
                }
                
                // enqueue
                color[neighbor] = 1 - color[head];
                queue.offer(neighbor);
            }
        }
        
        return true;
    }
    
    public boolean isBipartite(int[][] graph) {
        // 0 or 1
        int[] color = new int[graph.length];
        Arrays.fill(color, -1);

        for (int i = 0; i < color.length; i++) {
            if (color[i] != -1) {
                continue;
            }
            
            boolean isGraphBipartite = helper(graph, color, i);
            
            if (!isGraphBipartite) {
                return false;
            }
        }
        
        return true;
    }
}
```