// asg0.js
function main () {
  // Canvas + 2‑D context
  const canvas = document.getElementById('example');
  if (!canvas) { console.error('Canvas not found'); return; }
  const ctx = canvas.getContext('2d');

  // Store for easy access in the handler
  window._asg0 = { canvas, ctx };

  // Wire the button
  document.getElementById('drawBtn')
          .addEventListener('click', handleDrawEvent);

  // Initial draw
  handleDrawEvent();
}

/**
 * Clears canvas, reads both vectors, draws v₁ (red) and v₂ (blue)
 */
function handleDrawEvent () {
  const { canvas, ctx } = window._asg0;

  // Black background
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ---- v1 (red) ----
  const x1 = parseFloat(document.getElementById('xVal').value);
  const y1 = parseFloat(document.getElementById('yVal').value);
  const v1 = new Vector3([x1, y1, 0]);
  drawVector(v1, 'red', ctx);

  // ---- v2 (blue) ----
  const x2 = parseFloat(document.getElementById('xVal2').value);
  const y2 = parseFloat(document.getElementById('yVal2').value);
  const v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, 'blue', ctx);
}

/**
 * Draw a vector that starts at the canvas centre.
 * @param {Vector3} v   vector (z = 0)
 * @param {string}  color stroke/fill colour
 * @param {CanvasRenderingContext2D} ctx 2‑D context
 */
function drawVector (v, color, ctx) {
  const scale = 20;                    // pixels per unit
  const cx = ctx.canvas.width  / 2;    // canvas centre
  const cy = ctx.canvas.height / 2;

  // End‑point (flip y)
  const xEnd = cx + v.elements[0] * scale;
  const yEnd = cy - v.elements[1] * scale;

  ctx.strokeStyle = color;
  ctx.lineWidth   = 3;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
}

function clearCanvas() {
  const canvas = document.getElementById('example');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// register the new draw‑operation handler once DOM is ready
window.addEventListener('load', () => {
  document.getElementById('opDrawBtn').addEventListener('click', handleDrawOperationEvent);
});

function handleDrawOperationEvent() {
  const { canvas, ctx } = window._asg0;
  
  // 1. clear
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. read v1
  const v1 = new Vector3([parseFloat(document.getElementById('xVal').value), 
                         parseFloat(document.getElementById('yVal').value), 0]);
  drawVector(v1, 'red', ctx);

  // 3. read v2
  const v2 = new Vector3([parseFloat(document.getElementById('xVal2').value),
                         parseFloat(document.getElementById('yVal2').value), 0]);
  drawVector(v2, 'blue', ctx);

  // 4. determine operation
  const op = document.getElementById('opSelect').value;
  const s  = parseFloat(document.getElementById('scalarVal').value);

  switch (op) {
    case 'add': {
      const v3 = new Vector3(v1).add(v2);
      drawVector(v3, 'green', ctx);
      break;
    }
    case 'sub': {
      const v3 = new Vector3(v1).sub(v2);
      drawVector(v3, 'green', ctx);
      break;
    }
    case 'mul': {
      const v3 = new Vector3(v1).mul(s);
      const v4 = new Vector3(v2).mul(s);
      drawVector(v3, 'green', ctx);
      drawVector(v4, 'green', ctx);
      break;
    }
    case 'div': {
      const v3 = new Vector3(v1).div(s);
      const v4 = new Vector3(v2).div(s);
      drawVector(v3, 'green', ctx);
      drawVector(v4, 'green', ctx);
      break;
    }
  }
}