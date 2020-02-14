---
title: How to integrate Linux pipe in your Python program
layout: post
tags: [code]
---

## What is Linux pipe

Generally, you can redirect/channeling stdin/out from one program to another under a CLI:

```
# some examples
echo $SHELL > shell.txt
cat shell.txt | grep zsh
```

## Handling text data

```python
import argparse
import sys

def parse():
    desc = "Reverse text file content"
    parser = argparse.ArgumentParser(description=desc)

    # default to stdin
    # so if no file given, we read from stdin
    parser.add_argument("files", nargs="*", default=sys.stdin, type=argparse.FileType('r'))
    
    argv = parser.parse_args()

    files = argv.files
    return files

def reverse_content(files):
    if type(files) is list:
        # if file given, some codes here
        pass
    else:
        # read from stdin
        content = files.read()

        # output to stdout
        sys.stdout.write(content[::-1])

if __name__ == '__main__':
    files = parse()
    reverse_content(files)
```

Example:

```
echo "ABCDEFG" | python playground.py
# output: GFEDCBA
```

## Handling binary data

```python
import argparse
import sys

def parse():
    desc = "Reverse any file content"
    parser = argparse.ArgumentParser(description=desc)

    # Instead of stdin
    # We read binary data from buffer 
    parser.add_argument("files", nargs="*", default=sys.stdin.buffer, type=argparse.FileType('rb'))
    
    argv = parser.parse_args()
    files = argv.files

    return files

def reverse_content(files):
    if type(files) is list:
        # if file given... some codes here
        pass
    else:
        # read directly from buffer of the stdin
        content = files.read()
        # type(content) == bytes

        # output binary data to buffer, two
        sys.stdout.buffer.write(content[::-1])

if __name__ == '__main__':
    files = parse()
    reverse_content(files)
```
