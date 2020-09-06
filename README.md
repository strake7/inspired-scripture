# Resources
## Generating Study Pages
John's studies are written as word documents. To best present this material in a web browser the content should be converted to markdown. To do this use [pandoc](https://pandoc.org/).
Example command:
```
pandoc --extract-media . \"$fdocx\" -o \"$fhtml\""
```
Or use the helper scripts in the _studies dir.
```
source _studies/converter_fns.sh && convert_all_docx
```

Once the markdown is generated, move the generated file to 
## Styling and Components
- Theme and Layout: [Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/introduction/)
- Components: [React-Bootstrap](https://react-bootstrap.netlify.app/components/navs/)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/)

# A Next.js starter for the [JAMstack](https://jamstack.org)
This is a boilerplate for using [Next.js](https://nextjs.org/) as a static site generator.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/next-starter-jamstack)

## Usage

### Getting started

To start your project, either:

1. Deploy to Netlify using the button above, or
2. Clone this repository and run:

```bash
npm install
```

This will take some time and will install all packages necessary to run the starter.

### Development

While developing your website, use:

```bash
npm start
```

Then visit http://localhost:3000/ to preview your new website. The Next.js development server will automatically reload the CSS or refresh the whole page, when stylesheets or content changes.

### Static build

To build a static version of the website inside the `/dist` folder, run:

```bash
npm run build
```

See [package.json](package.json) for all tasks.

## Basic Concepts

You can read more about building sites and apps with Next.js in their documentation here:

https://nextjs.org/docs

## Doing dynamic things

A few resources for doing anything you can imagine with a 100% static site/app on the JAMstack
using Next.js. If you would like to add more resources please open a pull request!

- [Using Next.js as a Static Site Generator for Netlify](https://scotch.io/@sw-yx/using-nextjs-as-a-static-site-generator-for-netlify) - [Shawn Wang](https://twitter.com/swyx)
- [Serverless Next.js 9 on Netlify Functions](https://community.netlify.com/t/serverless-next-js-9-on-netlify-functions/1956) - [Shawn Wang](https://twitter.com/swyx)

## Deploying to Netlify

The deploy to Netlify button above will create a new site and repo in one click. If you've created your repo manually, you can deploy to Netlify as follows:

- Push your clone to your own GitHub repository.
- [Create a new site on Netlify](https://app.netlify.com/start) and link the repository.

Now Netlify will build and deploy your site whenever you push to git.
