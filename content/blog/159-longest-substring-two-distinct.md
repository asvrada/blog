---
date: '2019-10-28'
title: 159. Longest Substring with At Most Two Distinct Characters
category: leetcode
---

Question: https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/

Post: https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/discuss/415644/sliding-window-java

```java
class Solution {
    public int lengthOfLongestSubstringTwoDistinct(String s) {
        int[] count = new int[256];
        int unique = 0;
        
        int ans = 0;
        int end = 0;
        
        for (int start = 0; start < s.length(); start++) {
            while (end < s.length() 
                   && unique <= 2 
                   && !(count[s.charAt(end)] == 0 && unique == 2)) {
                // ok to expand
                char c = s.charAt(end);
                
                end++;
                count[c]++;
                if (count[c] == 1) {
                    unique++;
                }
            }
            
            if (unique <= 2) {
                // update ans
                ans = Math.max(ans, end - start);
            }
            
            // update start
            char c = s.charAt(start);
            count[c]--;
            if (count[c] == 0) {
                // one less unique char
                unique--;
            }
        }
        
        return ans;
    }
}
```