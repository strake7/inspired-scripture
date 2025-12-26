---
description: "Sync new videos from YouTube channel to study metadata"
allowed-tools: ["Bash", "LS"]
---

# Sync Embed Links
1. Read the contents of lib/study_metadata.yml and make note of twhat studies have video links
2. Open https://www.youtube.com/@inspiredscripture/videos and find any new videos not yet in lib/study_metadata.yml. To help reduce the search, be on the lookout for what studies don't already have links.
3. Add embed links to the metadata file


# Test Embed Links
1. Assert that the local app is running. If not, start it.
2. For any new additions, open the study via https://localhost:3000/bible-studies/{study_slug} and assert that the new video loads
