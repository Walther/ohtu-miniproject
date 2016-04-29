import json
import sys


if __name__ == '__main__':
    filenames = sys.argv[1]
    filenames = filenames.split(",")
    filenames.pop(0) # to remove static .gitignore from the list TODO reformat
    output = open('./bibtex-list.txt', 'w')
    for filename in filenames:
        inputFile = open('./data/' + filename,'r')
        contents = json.loads(inputFile.read())
        referenceType = contents['format']
        contents.pop('format')
        item = "@" + referenceType + "{" + contents['id'] + ",\n"
        contents.pop('id')
        for key in contents.keys():
            if key not "tags":
                item = item + key + " = \"" + contents[key] + "\",\n"
        item = item[:-2] + "\n" + "}\n\n"
        output.write(item)
        inputFile.close()
    output.close()
    output = open('./bibtex-list.txt', 'r')
    contents = output.read()
    print(contents)
    sys.stdout.flush()
