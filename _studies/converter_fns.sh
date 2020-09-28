#!/bin/bash
# description: Helper bash functions for converting study documents
# use: source ./converter_fns.sh 
#   convert_all_docx

# for any docx file within the _studies directory, convert to html using pandoc

function get_convert_cmd {
  fhtml="${1%%.docx}.html" # append html ext           
  fhtml="${fhtml// /-}" # replace space with dash
  tmp="tmp-$fhtml"
  echo "pandoc --self-contained --metadata pagetitle='temporary' \"$1\" -o $tmp && pandoc $tmp -o \"$fhtml\"" # we need a standalone html file first to get images encoded as a raw data, then we go back to a shortened html document.  
}

function convert_all_docx {
  echo `tput setaf 3`Starting conversion of docx files to html...`tput sgr0`     
  for fdocx in *.docx
  do    
    cmd=$(get_convert_cmd "$fdocx")
    echo `tput setaf 4`Running command $cmd`tput sgr0`      
    eval $cmd &
  done
  wait
  echo "Cleaning up..."
  rm tmp-**.html
}

function convert_single_docx {
  echo `tput setaf 3`Starting conversion of $1 files to html...`tput sgr0`    
  cmd=$(get_convert_cmd "$1")
  echo `tput setaf 4`Running command $cmd`tput sgr0`      
  eval $cmd
  echo "Cleaning up..."
  rm tmp-**.html
}

"$@"