// Name any p5.js functions we use in `global` so Glitch can recognize them.
/* global
 *    HSB, background, color, colorMode, createCanvas, ellipse, fill, height, line, mouseIsPressed,
 *    mouseX, mouseY, rect, stroke, strokeWeight, width, ml5, text, noStroke, noFill
 */

let brushHue, shouldDraw, priorX = 0, priorY = 0, strokeColor
  // Global variable to store the classifier
let classifier
let confidence
let result
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
  // define the properties of the highlight box
  colorBox = {
    'x': 30,
    'y': 416,
    'w': 50,
    'h': 30,
    // start with white
    'color': color(0,0,100)
  }
}

function draw() {
  //set default stroke color and weight
  stroke('black')
  strokeWeight(1)
  
  //draw when mouse pressed
  if (mouseIsPressed) {
    stroke(strokeColor)
    line(priorX, priorY, mouseX, mouseY);

  }

  // Store the mouseX and mouseY from this frame in order to use them next frame
  priorX = mouseX;
  priorY = mouseY;
  // no stroke for the bottom white menu
  // in draw() to separate from the drawing background
  noStroke()

  fill('white')
  rect(width/2, height - 25, width, 50)
  
  // draw the color labels
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
  // commit to a color when confidence is larger than .9
  classifier.classify(gotResult);
  if (result == "Red" && confidence >= 0.9) {
    //change stroke color and colorbox color/x
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
