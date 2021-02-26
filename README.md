Source code for [inspiredscripture.com](https://inspiredscripture.com/)
## Getting Started
This site is build using using [Next.js](https://nextjs.org/) as a static site generator. You can read more about building sites and apps with Next.js in their documentation at https://nextjs.org/docs. To get started ensure you have the latest of npm and nodejs installed, clone this repository and run `npm install`. Once the dependencies are installed you can run `npm start` to run the site locally. Visit http://localhost:3000/ to preview your new website. The Next.js development server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

## Tests
Automated tests may be run using the `npm test` command.

## Generating Study Pages
The primary content, study pages are rendered at design-time. John's studies are written as word documents. To best present this material in a web browser the content should be converted to html from docx. To do this you can use [pandoc](https://pandoc.org/) to handle the conversion.
Example command:
```
pandoc --self-contained \"$fdocx\" -o \"$fhtml\""
```
Or use the helper scripts in the _studies dir.
```
source _studies/converter_fns.sh && convert_all_docx
```
Note that the `--self-contained` flag is critical for perserving media within the document which reduces complexity down the line.
Studies are expected to be stored in the `_studies` dir.

## Styling and Components
- Theme and Layout: [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
- Components: [React-Bootstrap](https://react-bootstrap.netlify.app/components/navs/)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/)

## Deployment
Deployments are automatically executed on successful merge to the master branch. The production site is hosted via Netlify.
