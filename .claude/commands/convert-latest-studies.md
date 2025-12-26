---
description: 'Process the latest Google Drive download containing study documents'
allowed-tools: ['Bash', 'LS']
---

# Process Studies

Automatically processes the latest Google Drive download containing study documents:

1. Finds the latest `drive-download-*` folder in ~/Downloads
2. Extracts any zip files within that folder
3. Moves all `.docx` files to the local `_studies` directory
4. In the \_studies directory, source the converter_fns.sh file
5. Run the remove_chapter_from_docx function
6. Run the convert_all_docx command and observe results
