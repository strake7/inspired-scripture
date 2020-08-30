#!/bin/bash
# description: Helper bash functions for converting study documents
# use: source ./converter_fns.sh 
#   convert_all_docx

# for any docx file within the _studies directory, convert to html using pandoc

function convert_all_docx() {
  echo `tput setaf 3`Starting conversion of docx files to html...`tput sgr0`   
  echo "Media files will be extracted to ./media"
  for fdocx in *.docx
  do
    fhtml="${fdocx%%.docx}.html" # append html ext           
    fhtml="${fhtml// /-}" # replace space with dash
    cmd="pandoc --extract-media . \"$fdocx\" -o \"$fhtml\""
    echo "Converting $fdocx to $fhtml. "
    echo `tput setaf 4`Running command $cmd`tput sgr0`      
    eval $cmd
  done
}

"$@"