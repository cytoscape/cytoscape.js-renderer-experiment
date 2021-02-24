cytoscape-renderer-experiment
================================================================================

## Description

A Cytoscape.js extension for an experimental renderer

## Dependencies

 * Cytoscape.js ^3.2.0


## Build targets

* `npm run test` : Run Mocha tests in `./test`
* `npm run build` : Build `./src/**` into `cytoscape-popper.js`
* `npm run watch` : Automatically build on changes with live reloading (N.b. you must already have an HTTP server running)
* `npm run dev` : Automatically build on changes with live reloading with webpack dev server
* `npm run lint` : Run eslint on the source

N.b. all builds use babel, so modern ES features can be used in the `src`.
