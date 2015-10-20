# jsFile-wcbff [![Build Status](https://secure.travis-ci.org/jsFile/jsFile-wcbff.png?branch=master)](https://travis-ci.org/jsFile/jsFile-wcbff)
Engine for jsFile library to work with document in [WCBFF](https://en.wikipedia.org/wiki/Compound_File_Binary_Format) format (files like .doc)

## Installation
### via NPM

You can install a <code>jsFile-wcbff</code> package very easily using NPM. After
installing NPM on your machine, simply run:
````
$ npm install jsfile-wcbff
````

### with Git

You can clone the whole repository with Git:
````
$ git clone git://github.com/jsFile/jsFile-wcbff.git
````

### from latest version

Also you can download [the latest release](https://github.com/jsFile/jsFile-wcbff/tree/master/dist) of `WCBFF` engine and include built files to your project.


##Usage
````js
import JsFile from 'JsFile';
import JsFileWcbff from 'jsfile-wcbff';

const jf = new JsFile(file, options);
````
`file` - a file of [WCBFF](https://en.wikipedia.org/wiki/Compound_File_Binary_Format) type. You may find information about options and `jsFile` in [documentation](https://github.com/jsFile/jsFile#installation)
