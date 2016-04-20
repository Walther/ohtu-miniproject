import json
import sys


if __name__ == '__main__':
    filenames = sys.argv[1]
    filenames = filenames.split(",")
    filenames.pop(0)
    output = open('./bibtex-list.txt', 'w')
    for filename in filenames:
        inputFile = open('./data/' + filename,'r')
        contents = json.loads(inputFile.read())
        item = "@article{" + contents['id'] + ",\n"
        contents.pop('id')
        for key in contents.keys():
            item = item + key + " = " + contents[key] + ",\n"
        item = item + "}\n\n"
        output.write(item)
        inputFile.close()
    output.close()
    output = open('./bibtex-list', 'r')
    contents = output.read()
    print(contents)
    sys.stdout.flush()
