#!/bin/bash
# description: Helper bash functions for converting study documents
# use: source ./converter_fns.sh
#   convert_all_docx

# for any docx file within the _studies directory, convert to html using pandoc

function get_convert_cmd {
  name="${1%%.docx}"                                #  remove .docx ext
  name="${name// /-}"                               #  replace space with dash
  name="$(echo $name | tr '[:upper:]' '[:lower:]')" #  lowercase name for slugs
  fhtml="${name}.html"                              #  append html ext
  tmp="tmp-$fhtml"
  # 1. Clear existing public images to make room
  # 2. Convert the study from docx to hmtl while extracting images
  # 3. Clean up the image paths in the html file
  echo "rm -rf ../public/${name} && pandoc --extract-media='../public/${name}' --metadata
  pagetitle='temporary'  \"$1\" -o $tmp && pandoc $tmp -o \"$fhtml\" --wrap=none
  && optimize_images \"$name\" && touchup_html \"$fhtml\" && rm $tmp" | tr -d '\n\r'
}

function convert_all_docx {
  echo $(tput setaf 3)Starting conversion of docx files to html...$(tput sgr0)
  i=0
  batch_size=20
  for fdocx in *.docx; do
    cmd=$(get_convert_cmd "$fdocx")
    echo $(tput setaf 4)Running command $cmd$(tput sgr0)
    eval $cmd &
    ((i=i+1))
    if [ $(expr $i % $batch_size) = "0" ]; then
      echo $(tput setaf 5)Waiting for batch of $batch_size to complete...$(tput sgr0)
      wait
    fi
  done
  wait
}

function convert_single_docx {
  echo $(tput setaf 3)Starting conversion of $1 files to html...$(tput sgr0)
  cmd=$(get_convert_cmd "$1")
  echo $(tput setaf 4)Running command $cmd$(tput sgr0)
  eval $cmd
}

function remove_chapter_from_docx {
  for f in *\ Chapter\ *.docx; do
    echo $(tput setaf 4)Cleaning 'Chapter ' from $f$(tput sgr0)
    mv "$f" "${f/Chapter\ /}"
  done
  echo "Done"
}

function optimize_images {
  # Convert any png to jpg for the study name and resize to 1024x using imagemagick.
  # Using a lower quality and compressing helps paint time signficantly.
  img_dir="../public/$1/media/"
  count=$(ls 2>/dev/null -Ubad1 -- "$img_dir"/*.png | wc -l)
  if [ "$count" -gt 0 ]; then
    echo $(tput setaf 4)Converting PNG images for $img_dir$(tput sgr0)
    for f in "$img_dir"/*.png; do
      echo $(tput setaf 4)Converting $f$(tput sgr0) to jpg
      n="${f%%.png}"
      magick "$f" "$n.jpg"
      rm "$f"
    done
  fi
  # Optimize any jpg images to < 100k
  count=$(ls 2>/dev/null -Ubad1 -- "$img_dir"/*.jpg | wc -l)
  if [ "$count" -gt 0 ]; then
    for f in "$img_dir"/*.jpg; do
      initial_size=$(get_filesize_bytes $f)
      if [ $initial_size -gt 102400 ]; then
        echo $(tput setaf 4)Optimizing $f$(tput sgr0)
        magick "$f" -define jpeg:extent=100kb "$f"
        result_size=$(get_filesize_bytes $f)
        echo $(tput setaf 5)Reduced $f from $initial_size to $result_size bytes$(tput sgr0)
      fi
    done
  fi
}

function touchup_html {
  # remove "../public/" and replace ".png" with ".jpg" for the study's image paths
  echo $(tput setaf 4)Cleaning image paths in $1$(tput sgr0)
  sed -i '' 's/\.\.\/public//g' "$1"
  sed -i '' 's/\.png/\.jpg/g' "$1"

  # remove the <mark> tags from the html; they are typically unexpected from the
  # docx conversion in gdocs
  echo $(tput setaf 4)Removing mark tags in $1$(tput sgr0)
  sed -i '' 's/<mark>//g; s/<\/mark>//g' "$1"
}

function get_filesize_bytes {
  stat -f%z $1
}

$@


# function remove_chapter_from_name {
#   for f in *-chapter-*.html; do
#     echo $(tput setaf 4)Cleaning '-chapter-' from $f$(tput sgr0)
#     mv "$f" "${f/-chapter-/-}"
#   done
#   echo "Done"
# }
