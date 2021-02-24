const assign = require('./assign');

// TODO Kei to replace example canvas rendering technology with something more performant
// e.g. DeckGL

// you can probably just set everything up in the constructor if you're using
// just a bunch of functional getters
function Renderer(options) {
  console.log('constructor', options);

  const cy = options.cy;
  const container = cy.container();

  const data = this.data = {};

  const canvas = data.canvas = document.createElement('canvas'); 
  canvas.width = cy.width();
  canvas.height = cy.height();

  const context = data.context = canvas.getContext('2d');

  container.appendChild(canvas);
}

// focus on this function if you're rendering imperatively
function render(options) {
  console.log('render', options);

  const cy = this.cy;
  const { context } = this.data;
  const zoom = cy.zoom();
  const pan = cy.pan();

  context.fillStyle = 'red';
  context.strokeStyle = 'blue';

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(-99999, -99999, 99999999, 99999999);

  context.translate(pan.x, pan.y);
  context.scale(zoom, zoom);

  cy.edges().forEach(e => {
    const p1 = e.source().position();
    const p2 = e.target().position();

    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.closePath();

    context.stroke();
  });

  cy.nodes().forEach(n => {
    const w = n.width();
    const h = n.height();
    const pos = n.position();
    const x = pos.x - w/2;
    const y = pos.y - h/2;

    context.fillRect(x, y, w, h);
  });
}

// you can probably just ignore these functions...
assign(Renderer.prototype, {
  render,

  nodeShapeImpl(name, context, centerX, centerY, width, height, points) {
    // this can be ignored as it could be refactored out of the current base renderer assumptions
  },

  arrowShapeImpl(name) {
    // this can be ignored as it could be refactored out of the current base renderer assumptions
  },

  matchCanvasSize(container) {
    // ignore for now: used for automatically resizing the container to fit the available dom area
  },

  redrawHint(group, isDirty) {
    // optimisation (e.g. only need to redraw selection box): can be ignored for now
  },

  renderTo(cxt, zoom, pan, pxRatio) {
    // deprecated: ignore
  }
});

module.exports = Renderer;