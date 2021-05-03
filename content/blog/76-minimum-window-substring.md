---
date: '2019-10-28'
title: 76. Minimum Window Substring - Java
category: leetcode
---

Question: https://leetcode.com/problems/minimum-window-substring/

Post: https://leetcode.com/problems/minimum-window-substring/discuss/415634/sliding-window-java

```java
class Solution {
    public String minWindow(String s, String t) {
        int[] count = new int[256];
        // number of unique char in t
        int charUnique = 0;
        for (char c: t.toCharArray()) {
            if (count[c] == 0) {
                charUnique++;
            }
            count[c]++;
        }

        // value defaults to a special value so we know if there is an answer
        String ans = null;

        int end = 0;
        for (int start = 0; start < s.length(); start++) {
            while (end < s.length() && charUnique > 0) {
                // ok to expand
                char c = s.charAt(end);
                end++;
                count[c]--;
                
                if (count[c] == 0) {
                    charUnique--;
                }
            }
            
            if (charUnique == 0) {
                if (ans == null || ans.length() > (end - start)) {
                    ans = s.substring(start, end);
                }
            }
            
            // update start
            char c = s.charAt(start);
            count[c]++;
            if (count[c] > 0) {
                charUnique++;
            }
        }
        
        return ans == null ? "" : ans;
    }
}
```
