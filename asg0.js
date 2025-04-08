function main () {
  const canvas = document.getElementById('example');
  if (!canvas) { 
    console.error('Canvas not found');
    return; 
  }
  const ctx = canvas.getContext('2d');

  // Store for easy access in event handlers.
  window._asg0 = { canvas, ctx };

  // Wire the buttons.
  document.getElementById('drawBtn').addEventListener('click', handleDrawEvent);
  document.getElementById('opDrawBtn').addEventListener('click', handleDrawOperationEvent);

  // Initial draw.
  handleDrawEvent();
}


function getVector1() {
  const x = parseFloat(document.getElementById('xVal').value);
  const y = parseFloat(document.getElementById('yVal').value);
  return new Vector3([x, y, 0]);
}


function getVector2() {
  const x = parseFloat(document.getElementById('xVal2').value);
  const y = parseFloat(document.getElementById('yVal2').value);
  return new Vector3([x, y, 0]);
}

/**
 * Draws a vector starting at the canvas center.
 * @param {Vector3} v   vector (assumed z = 0)
 * @param {string}  color stroke/fill colour
 * @param {CanvasRenderingContext2D} ctx 2D drawing context
 */
function drawVector(v, color, ctx) {
  const scale = 20;               
  const cx = ctx.canvas.width  / 2; 
  const cy = ctx.canvas.height / 2; 

  // Compute the end point (flip y coordinate)
  const xEnd = cx + v.elements[0] * scale;
  const yEnd = cy - v.elements[1] * scale;

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(xEnd, yEnd);
  ctx.stroke();
}

function handleDrawEvent () {
  const { canvas, ctx } = window._asg0;

  // Fill the background in black.
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const v1 = getVector1();
  const v2 = getVector2();
  drawVector(v1, 'red', ctx);
  drawVector(v2, 'blue', ctx);
}

/**
 * Computes the angle (in degrees) between two vectors.
 * @param {Vector3} v1 
 * @param {Vector3} v2 
 * @returns {number} Angle in degrees.
 */
function angleBetween(v1, v2) {
  const dot = Vector3.dot(v1, v2);
  const magProduct = v1.magnitude() * v2.magnitude();
  if (magProduct === 0) return 0;  // avoid division by zero
  return 180 / Math.PI * Math.acos(dot / magProduct);
}

/**
 * Computes the area of the triangle formed by vectors v1 and v2.
 * @param {Vector3} v1 
 * @param {Vector3} v2 
 * @returns {number} Area of the triangle.
 */
function areaTriangle(v1, v2) {
  const cross = Vector3.cross(v1, v2);
  return cross.magnitude() / 2;
}


function handleDrawOperationEvent() {
  const { canvas, ctx } = window._asg0;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const v1 = getVector1();
  const v2 = getVector2();

  drawVector(v1, "red", ctx);
  drawVector(v2, "blue", ctx);

  const op = document.getElementById("opSelect").value;
  const scalar = parseFloat(document.getElementById("scalarVal").value);

  switch(op) {
    case "add": {
      const result = v1.add(v2);
      drawVector(result, "green", ctx);
      break;
    }
    case "sub": {
      const result = v1.sub(v2);
      drawVector(result, "green", ctx);
      break;
    }
    case "mul": {
      const v1Scaled = v1.mul(scalar);
      const v2Scaled = v2.mul(scalar);
      drawVector(v1Scaled, "green", ctx);
      drawVector(v2Scaled, "green", ctx);
      break;
    }
    case "div": {
      if (scalar === 0) {
        alert("Cannot divide by zero!");
      } else {
        const v1Scaled = v1.div(scalar);
        const v2Scaled = v2.div(scalar);
        drawVector(v1Scaled, "green", ctx);
        drawVector(v2Scaled, "green", ctx);
      }
      break;
    }
    case "mag": {
      console.log("Magnitude of v₁: " + v1.magnitude());
      console.log("Magnitude of v₂: " + v2.magnitude());
      break;
    }
    case "norm": {
      const normalizedV1 = v1.normalize();
      const normalizedV2 = v2.normalize();
      drawVector(normalizedV1, "green", ctx);
      drawVector(normalizedV2, "green", ctx);
      break;
    }
    case "angle": {
      const angle = angleBetween(v1, v2);
      console.log("Angle between v₁ and v₂: " + angle.toFixed(2) + "°");
      break;
    }
    case "area": {
      const area = areaTriangle(v1, v2);
      console.log("Area of triangle formed by v₁ and v₂: " + area);
      break;
    }
    default:
      console.error("Operation not supported: " + op);
  }
}

// Register the initial draw event when the window loads.
window.addEventListener('load', main);
