import os

# Return filename only


def list_of_markdown(path):
    files = os.listdir(path)
    files = list(
        filter(lambda name: 'markdown' in name, files))

    return files

# change the file name, add new yield


def process_file(filename):
    newname = filename.replace('.markdown', '.md')
    with open(PREFIX + filename, 'r') as f:
        with open(PREFIX + newname, 'w') as new_f:
            new_f.write(f.read())


PREFIX = "blog/"
# 2015-05-06T23:46:37.121Z
if __name__ == "__main__":
    files = list_of_markdown(
        "/Users/zijie/IDE_Projects/web/gatsby-blog/content/blog")
    for each in files:
        # print(each)
        process_file(each)
