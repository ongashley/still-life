let screen = 1;
var inc = 0.1;
var scl = 10;
var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;

let candle; //candle illustration
let coffee; //croissant photo
let scene; //table set
let flower1;
let flower2;
let flower3;
let croissant;
var light = 0; //controls room light; 1 = light is on 
// var smoke = 1;

function preload(){
candle = loadImage('Asset 1.png');
coffee = loadImage('coffee.png');
scene = loadImage('Asset 2.png');
flower1 = loadImage('flower1.png');
flower2 = loadImage('flower2.png');
flower3 = loadImage('flower3.png');
croissant = loadImage('croissant.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(219, 171, 149);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');

  flowfield = new Array(cols * rows);
  for (var i = 0; i < 550; i++) {
    particles[i] = new Particle();
  }
  textSize(32);
  imageMode(CENTER);
  image(candle, width/2, height/2+140, 250, 350);
}

function draw() {
  if (screen == 1){
    drawscreen1(); 
  }
  if (screen == 2){
    drawscreen2();
  }
  if (screen == 3){
    drawscreen3();
  }
  if (screen == 4){
    drawscreen4();
  }
  if (screen == 5){
    screen = 4; 
  }
  
}

//candle start off 
function drawscreen1(){
//particle flow field code  
var yoff = 0;
for (var y = 0; y < rows; y++) {
  var xoff = 0;
  for (var x = 0; x < cols; x++) {
    var index = x + y * cols;
    var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
    var v = p5.Vector.fromAngle(angle);
    v.setMag(.4);
    flowfield[index] = v;
    xoff += inc;
 
  }
  yoff += inc;

  zoff += 0.00005;
}
for (var i = 0; i < particles.length; i++) {
  particles[i].follow(flowfield);
  particles[i].update();
  particles[i].edges();
  particles[i].show();''
}
// circle(width/2, height/2, 100);
noStroke();
textAlign(CENTER, CENTER);
textSize(32);
text("there are days", width/2, height/4);
}
//flower shop scene 
function drawscreen2(){
  background(196, 209, 171);
  noStroke();
  fill(240, 208, 165);
rect(0, height*.85, width, 100);
image(flower1, width/4, height/2, 350,700);
image(flower2, width/2, height/2, 350, 700);
image(flower3, width*.75, height/2, 350, 700);
noStroke();
fill(0);
text("where the light flickers", width*.3, height*.05);
}

//coffee shop scene 
function drawscreen3(){
  background(176, 188, 235);
  noStroke();
  fill(125,127,103);
  ellipse(width/2, height*.9, width, width*.5)
  image(croissant, width/2, height*.8, 400,325);
  image(coffee, width*.3, height*.65, 250,250);
  fill(0);
  text("and then i remember", width/2, height/4);
  }
  

//table/end scene 
function drawscreen4(){
  fill(40,40,40,10);
  rect(0,0,windowWidth,windowHeight);
  fill(237, 179, 102);
  circle(width/4, height/4, 100);
  fill(255);
  text("i am the light", width/2, height/2);
  if (light == 1){

    background(205, 189, 219);
    image(scene, width*.6,height*.55, 1250, 900);
    image(candle, width*.8, height*.45, 75*.8, 80);
    image(flower3, width*.85, height*.3, 175, 375);
    image(coffee, width*.65, height*.55, 100,100);
    image(croissant, width*.55, height*.57, 150,125);
    fill(0);
    textSize(32);
    text("i go in and", width/2, height/4);
    text("switch it back on", width/2, height/4+50);
    textSize(12);
    text("power - rupi kaur", width*.1, height*.9);
  }
}


function overCircle( x,  y,  r) {
  // If the (x,y) are inside the circle, return 'true'
  if (dist(mouseX, mouseY, x, y) < r) {
    return true;
  } else {
    return false;
  }
}

class Particle {
  constructor() {
    this.pos = createVector(width/2, random(height/2 - 10, height/2 + 10));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2.5;
    this.prevPos = this.pos.copy();
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow(vectors) {
    var x = floor(this.pos.x / scl);
    var y = floor(this.pos.y / scl);
    var index = x + y * cols;
    var force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    stroke(255, 10);
    strokeWeight(2);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }

  }

}

function mouseClicked(){
  /*if (screen == 1){
    if (overCircle(width/2, height/2, 100)){
    screen = 2;
  }
} else if (screen == 2){
  screen = 3;
} else if (screen == 3){
  screen = 4; 
  light = 0;
}*/
screen++;
if (overCircle(width/4,height/4, 100) == true){
  light = 1;
}
if (screen == 4){
    background(205, 189, 219);
    image(scene, width*.6,height*.55, 1250, 900);
    image(candle, width*.8, height*.45, 75*.8, 80);
    image(flower3, width*.85, height*.3, 175, 375);
    image(coffee, width*.65, height*.55, 100,100);
    image(croissant, width*.55, height*.57, 150,125);
    fill(40,40,40,10);
    rect(0,0,windowWidth,windowHeight);
}
}