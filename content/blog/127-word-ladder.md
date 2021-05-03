---
date: '2021-04-26'
title: 127. Word Ladder
category: leetcode
---

Question: 
https://leetcode.com/problems/word-ladder/

Post:
https://leetcode.com/problems/word-ladder/discuss/1178426/java-bi-bfs-with-set-12ms

The general idea is to do a two end BFS with Set instead of Queue.

By using Set we can easily check if the current word is in the other direction's "queue".

```java
class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) {
            return 0;
        }
        wordSet.add(beginWord);
        
        // Bi BFS
        // two queue (startWord, endWord)
        Set<String> set1 = new HashSet<>(Arrays.asList(beginWord));
        Set<String> set2 = new HashSet<>(Arrays.asList(endWord));
        Set<String> visited = new HashSet<>();
        
        // the number of words in the transformation sequence
        int length = 0;
        while (!set1.isEmpty()) {
            Set<String> newSet = new HashSet<>();
            length++;
            
            // check next layer
            for (String word: set1) {
                visited.add(word);
                // check neighbor
                char[] arrWord = word.toCharArray();
                for (int i = 0; i < arrWord.length; i++) {
                    char oldChar = arrWord[i];
                    for (int j = 0; j < 26; j++) {
                        char newChar = (char)('a' + j);
                        
                        // skip original word
                        if (newChar == oldChar) {
                            continue;
                        }

                        arrWord[i] = newChar;
                        String newWord = String.valueOf(arrWord);

                        if (!wordSet.contains(newWord)) {
                            continue;
                        }

                        if (set2.contains(newWord)) {
                            return length + 1;
                        }
                        
                        if (visited.contains(newWord)) {
                            continue;
                        }
                        
                        newSet.add(newWord);
                    }
                    // revert change
                    arrWord[i] = oldChar;
                }
            }
            
            set1 = newSet;

            // swap queue
			// always make sure set1 is the smaller set
			// so we can end early if there is no path from begin to end word (set1 will be empty)
            if (set1.size() > set2.size()) {
                Set<String> tmpVisited = set1;
                set1 = set2;
                set2 = tmpVisited;
            }
        }
        
        return 0;
    }
}
```