// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, ml5, text, noStroke, noFill
 */

let brushHue, shouldDraw, priorX = 0, priorY = 0, strokeColor
  // Global variable to store the classifier
let classifier;
let confidence
let button;
let result
// Label
let label = 'listening...';
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/nAknZzeF5/';
let colorBox


function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(400, 450)
  rectMode(CENTER)
  colorMode(HSB, 360, 100, 100);
  brushHue = 0;
  priorX = 0;
  priorY = 0;
  background(95);
  strokeWeight(6);
  classifySound()
  strokeColor = color(0,0,0)
  // Draw the background to
  colorBox = {
    'x': 30,
    'y': 416,
    'w': 50,
    'h': 30,
    'color': color(0,0,100)
  }
}

function draw() {
  //chooseColors();
  stroke('black')
  strokeWeight(1)
  
  //line(0, 370, width, 370)
  if (mouseIsPressed) {
    // Pick one of the three behaviors below:
    // rect(mouseX, mouseY, 15, 15); // Draw a 15 x 15 sized square at mouseX and mouseY
    // ellipse(random(width), random(height), 30, 30);
    stroke(strokeColor)
    line(priorX, priorY, mouseX, mouseY);
    // line(width-priorX, height-priorY, width-mouseX, height-mouseY);
  }

  // Store the mouseX and mouseY from this frame in order to use them next
  // frame - remember from the DVD lesson that the draw loop runs once every
  // frame.
  priorX = mouseX;
  priorY = mouseY;
  noStroke()

  fill('white')
  rect(width/2, height - 25, width, 50)
  
  
  fill('black')
  text("Red", 20, 420)
  text("Blue", 80, 420)
  text("Green", 140, 420)
  stroke(colorBox.color)
  noFill()
  rect(colorBox.x, colorBox.y, colorBox.w, colorBox.h)
}

function mousePressed() {
   shouldDraw = true;
}

function mouseReleased() {
  shouldDraw = false;
}

function keyPressed() {
  background(95);
}
/* A function that sets the stroke and fill of our "paint brush". */
function chooseColors() {
  fill(brushHue, 50, 80);
  strokeWeight(5);
  stroke(brushHue, 50, 80);
  
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  result = results[0].label;
  confidence = results[0].confidence
  classifySound()
}

function classifySound() {
  
  classifier.classify(gotResult);
  if (result == "Red" && confidence >= 0.9) {
    strokeColor = color(0, 100, 100)
    colorBox.x = 30
    colorBox.color = strokeColor
  }
  else if (result == "Blue" && confidence >= 0.9) {
    strokeColor = color(210, 100, 100)
    colorBox.x = 90
    colorBox.color = strokeColor
    
  }
  else if (result == "Green" && confidence >= 0.9) {
    strokeColor = color(140, 100, 100)
    colorBox.x = 155
    colorBox.color = strokeColor
    
  }
}
