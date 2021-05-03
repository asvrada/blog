---
date: '2019-10-28'
title: 273. Integer to English Words
category: leetcode
---

Question: https://leetcode.com/problems/integer-to-english-words/

Post: https://leetcode.com/problems/integer-to-english-words/discuss/415384/straightforward-python-solution-beats-97

```python
class Solution:
    # convert number < 1000 to English
    def three(self, num):
        special = {
            10: 'Ten',
            11: 'Eleven',
            12: 'Twelve',
            13: 'Thirteen',
            14: 'Fourteen',
            15: 'Fifteen',
            16: 'Sixteen',
            17: 'Seventeen',
            18: 'Eighteen',
            19: 'Nineteen'
        }
        
        single = {
            1: 'One',
            2: 'Two',
            3: 'Three',
            4: 'Four',
            5: 'Five',
            6: 'Six',
            7: 'Seven',
            8: 'Eight',
            9: 'Nine'
        }
        
        ten = {
            2: 'Twenty',
            3: 'Thirty',
            4: 'Forty',
            5: 'Fifty',
            6: 'Sixty',
            7: 'Seventy',
            8: 'Eighty',
            9: 'Ninety'
        }
        
        output = []
        # number is like: xyz
        # add x
        x = num // 100
        if x != 0:
            output.append(single[x])
            output.append("Hundred")
            
        # add yz
        yz = num % 100
        if yz == 0:
            return output
        
        # if yz is special two digit number
        if yz in special:
            output.append(special[yz])
            return output
        
        # yz is non special
        # get y and z
        y = yz // 10
        if y != 0:
            output.append(ten[y])
            
        z = yz % 10
        if z != 0:
            output.append(single[z])
            
        return output
        
    def numberToWords(self, num: int) -> str:
        if num == 0:
            return 'Zero'
        
        output = []
        
        threes = {
            1: 'Thousand',
            2: 'Million',
            3: 'Billion'
        }
        
        count = 0
        
        while num != 0:
            xyz = num % 1000
            num = num // 1000
            
            tmp = self.three(xyz)
            
            if tmp:
                # add seperator first
                if count in threes:
                    output.append(threes[count])

                output.append(" ".join(tmp))
                
            count += 1

        return " ".join(output[::-1])
```