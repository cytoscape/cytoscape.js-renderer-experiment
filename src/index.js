/* global cytoscape */

const Renderer = require('./renderer');

// registers the extension on a cytoscape lib ref
let register = function (cytoscape) {
  if (!cytoscape) { return; } // can't register if cytoscape unspecified

  // register with cytoscape.js
  cytoscape('renderer', 'experiment', Renderer);
};

if (typeof cytoscape !== 'undefined') { // expose to global cytoscape (i.e. window.cytoscape)
  register(cytoscape);
}

module.exports = register;
