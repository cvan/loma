# loma

It's a list of mobile apps.


# Installation

We use [grunt](http://gruntjs.com/):

    npm install grunt-cli -g

Then install our dependencies:

    npm install

For local settings:

    cp src/settings_local.js.dist src/settings_local.js

For production settings:

    cp src/settings_local.js.dist src/settings_prod.js


# Development

Load from a page with an origin (i.e., a server). If you're running locally,
use grunt to fire up a local server:

    DEBUG=1 OPEN=1 grunt server

And to automatically recompile templates upon file changes:

    grunt watch

To run both simultaneously:

    DEBUG=1 OPEN=1 grunt

To build production-ready `index.html` and minified assets to a `dist/`
directory:

    grunt minify

To run the production-ready `index.html`:

    npm start


# Deployment

We use stackato:

    stackato push --no-prompt

To start the instance on stackato:

    stackato start

To read the logs on stackato:

    stackato logs

To run shell commands on stackato:

    stackato run cat ../logs/stdout.log

To access the shell on stackato:

    stackato ssh
