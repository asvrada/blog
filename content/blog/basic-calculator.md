---
date: '2020-02-27'
title: Infix to Postfix, a general approach to Basic Calculator problem set
---

Following are a series of questions on LeetCode that require user to write a simply calculator to compute equations like "1+1" and "1x(3-6)/3".

| [Basic Calculator](https://leetcode.com/problems/basic-calculator/)  | [Solution](https://leetcode.com/problems/basic-calculator/discuss/414898/Infix-to-Postfix-a-general-approach-to-similar-questions)  |
|---|---|
| [Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)  | [Solution](https://leetcode.com/problems/basic-calculator-ii/discuss/414897/Infix-to-Postfix-a-general-approach-to-similar-questions)  |
| [Basic Calculator III](https://leetcode.com/problems/basic-calculator-iii/)  | [Solution](https://leetcode.com/problems/basic-calculator-iii/discuss/414896/Infix-to-Postfix-a-general-approach-to-similar-questions)  |

> Following is a copy & paste from above link.

These questions all ask we to evaluate a infix expression with simple math operators in it.

Whats infix? For infix expression(the one we use daily) binary operators appear between two operand. And for postfix, operator appears after operand, even for unary operand.

Infix:  
`1 - (2 + 3)`

Postfix:  
`1 2 3 + -`

Evaluating postfix expressions is much easier and simpler than infix ones, so the general idea is to convert infix expression to a postfix one, and evaluate postfix expression with the help of stack.

The general solution comes in two parts:

1. Convert infix expression to postfix expression
2. Evaluate postfix expression

## Convert

Here is the algorithm I found online:

[https://condor.depaul.edu/ichu/csc415/notes/notes9/Infix.htm](https://condor.depaul.edu/ichu/csc415/notes/notes9/Infix.htm)

For this question, the code looks like this. For the code for other questions, please see the link above.

```python
def calculate(self, s: str) -> int:
	stack = []
	# postfix result
	output = []

	rank = {
		'+': 1,
		'-': 1,
		'*': 2,
		'/': 2,
	}

	# None means no number is parsed
	num = None

	for c in s:
		if c == ' ':
			continue

		if c in "0123456789":
			if num is None:
				num = 0
			num = num * 10 + int(c)
			continue

		# c is opeartor or ()
		# output prev num to output
		if num is not None:
			output.append(num)
			num = None

		if c == '(':
			stack.append('(')
		elif c == ')':
			# pop until (
			while stack[-1] != '(':
				output.append(stack.pop())

			# pop (
			stack.pop()
		else:
			# pop all aperator with higher or equal rank in stack, until meet (
			while stack and stack[-1] != '(' and rank[stack[-1]] >= rank[c]:
				output.append(stack.pop())

			# push cur operator
			stack.append(c)

	# handle leftover
	if num != None:
		output.append(num)
	while stack:
		output.append(stack.pop())

	return self.eval(output)
```

## Evaluate

The evaluation of postfix expression is much easier.

We scan the expression from left to right, push every number into a stack, when encountered with a binary operation, we pop the top two numbers from the stack and do appropriate math operation on them, push back the result, and repeat.

This operation remains almost the same for all three questions.

```python
def eval(self, postfix):
	stack = []
	for token in postfix:
		if token == '+':
			a = stack.pop()
			b = stack.pop()

			stack.append(a + b)
		elif token == '-':
			b = stack.pop()
			a = stack.pop()

			stack.append(a - b)
		elif token == '*':
			a = stack.pop()
			b = stack.pop()

			stack.append(a * b)
		elif token == '/':
			b = stack.pop()
			a = stack.pop()

			stack.append(a // b)
		else:
			stack.append(token)

	return stack[-1]

```
