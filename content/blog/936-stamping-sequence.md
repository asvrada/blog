---
date: '2021-04-26'
title: 936. Stamping The Sequence
category: leetcode
---

Question: https://leetcode.com/problems/stamping-the-sequence/

Post: https://leetcode.com/problems/stamping-the-sequence/discuss/1178205/the-performance-difference-between-and

Hi! I just discovered that using `|` and `||` would cause huge performance difference, and I couldn't firgure out why. (The relevant code is at the bottom half, please scroll down)

Here's my code

```java
class Solution {
    int count = 0;
    
    boolean helper(List<Integer> ans, boolean[] visited, final char[] stamp, char[] target, int start) {
        // check if stamp can be stamped at target[i]
        // if nothing changed, return false
        boolean changed = false;
        
        for (int j = 0; j < stamp.length; j++) {
            if (target[start + j] == '?') {
                continue;
            }
            // we can't stamp at this index
            if (target[start + j] != stamp[j]) {
                return false;
            }
            // we can
            changed = true;
        }

        if (changed) {
            visited[start] = true;
            // change to ?
            for (int i = 0; i < stamp.length; i++) {
                if (target[start + i] != '?') {
                    target[start + i] = '?';
                    count++;
                }
            }
            // add to ans
            ans.add(start);
        }
        
        return changed;
    }
    
    public int[] movesToStamp(String stamp, String target) {
        count = 0;
        int sizeStamp = stamp.length();
        int sizeTarget = target.length();
        List<Integer> ans = new ArrayList<>();
        
        char[] arrTarget = target.toCharArray();
        final char[] arrStamp = stamp.toCharArray();
        boolean[] visited = new boolean[sizeTarget];

        while (count < sizeTarget) {
            boolean changed = false;
            for (int i = 0; i < (sizeTarget - sizeStamp + 1); i++) {
                if (visited[i]) {
                    continue;
                }
				// Use | here: 3ms
				// Use || here: 28ms
                changed = changed | helper(ans, visited, arrStamp, arrTarget, i);
                if (count == sizeTarget) {
                    break;
                }
            }
            if (!changed) {
                return new int[0]; 
            }
        }
        
        // convert to array
        int[] steps = new int[ans.size()];
        for (int i = 0; i < ans.size(); i++) {
            steps[i] = ans.get(ans.size() - i - 1);
        }
        return steps;
    }
}
```