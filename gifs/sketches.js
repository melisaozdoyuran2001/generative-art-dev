const WIDTH = 300;
const HEIGHT = 300;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;

function drawClock(p, pct, size) {
  p.fill(100);
  p.noStroke();
  p.circle(0, 0, size);
  p.fill(0);
  p.arc(0, 0, size, size, 0, pct * Math.PI * 2);
}

function drawInformation(p, t, otherData) {
  p.textFont("Roboto Mono", 14); // Here 'Roboto' is the name of the font and 32 is the font size

  let x = 10;
  let y = 15;
  p.text("loop time:" + t.toFixed(2), x, y);
  otherData.forEach((text, index) => {
    p.text(text, x, y + 15 * (index + 1));
  });

  // Draw a clock face
  p.push();
  p.translate(p.width - 30, 30);
  drawClock(p, t, 30);
  p.pop();
}

// Three useful functions for animations
function pingpong(t) {
  // Return a number from 0 to 1
  // t=0 => 0
  // t=.5 => 1
  // t=1 => 0
  return 1 - Math.abs(((t * 2) % 2) - 1);
}

function pingpongEased(t) {
  // Same as pingpong, but it eases in and out
  return 0.5 - 0.5 * Math.cos(2 * t * Math.PI);
}

function ease(t) {
  // Ease just from 0 to 1 (the first half of pingpong)
  return 0.5 - 0.5 * Math.cos(t * Math.PI);
}

// =================================================
const sketches = [
  
// First Sketch
{
  name: 'Stars',
  show: true,
  description : 'A different night sky every time you refresh!',
  loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
  setup(p) {
    this.starPositions = Array.from({ length: 5 }, () => ({
      x: Math.random() * WIDTH - WIDTH / 2,
      y: Math.random() * HEIGHT - HEIGHT / 2,
      scaleFactor: 1.5 + Math.random() * 0.5,
    }));
  },
  draw(p) {
    let t = (p.frameCount / this.loopLength) % 1;
    p.background(240, 100, 20); // Dark blue background

    p.push();
    p.translate(WIDTH / 2, HEIGHT / 2);

    // Draw multiple stars
    for (const { x, y, scaleFactor } of this.starPositions) {
      let yellow = 60;
      p.stroke(yellow, 90, 45); // Yellow outline
      p.fill(yellow, 90, 45); // Yellow fill

      let points = 5;
      let modulatingFactor = Math.sin(t * Math.PI * 2); 
      let radius1 = 22 * (scaleFactor + modulatingFactor * 0.5);
      let radius2 = 12 * (scaleFactor + modulatingFactor * 0.5); 
      let angle = Math.PI * 2 / points;

      p.push();
      p.translate(x, y); // Position each star

      p.beginShape();
      for (let i = 0; i < points; i++) {
        let x1 = radius1 * Math.cos(angle * i);
        let y1 = radius1 * Math.sin(angle * i);
        p.vertex(x1, y1);
        let x2 = radius2 * Math.cos(angle * (i + 0.5));
        let y2 = radius2 * Math.sin(angle * (i + 0.5));
        p.vertex(x2, y2);
      }
      p.endShape(p.CLOSE);
      p.pop();
    }
    p.pop();
  }
},


   
 // Second Sketch
{
  name: "My Name",
  show: true,
  description: "Letters of the name 'Melisa' appear one by one",
  loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
  setup(p) {
    p.textSize(52);
    p.textAlign(p.CENTER, p.CENTER);
  },
  
  draw(p) {
    p.background(0, 100, 80); 
    let name = "♡MELISA♡";
    let t = Math.floor(p.frameCount / 5) % (name.length + 1); 
    let displayText = name.substring(0, t);
    p.fill(0, 100, 40); 
    p.text(displayText, p.width / 2, p.height / 2);
  },
},

  
   
 // Third Sketch
{
  name: 'Pendulum',
  show: true,
  description: 'Pendulum swinging left and right',
  setup(p) {
    this.origin = { x: p.width / 2, y: 150 };
    this.position = { x: 0, y: 0 };
    this.length = 130;
    this.angle = Math.PI / 3;
    this.angularVelocity = 0.2; 
    this.angularAcceleration = 0.01;
  },
  
  draw(p) {
    let hue = (p.frameCount % 360);
    
    p.background(30,79,30);
    p.stroke(hue, 100, 100);
    p.fill(hue, 100, 100);

    this.angularAcceleration = (-0.4 / this.length) * Math.sin(this.angle);
    this.angle += this.angularVelocity; // Update angle
    this.angularVelocity += this.angularAcceleration; 
    this.angularVelocity *= 0.99; 

    this.position.x = this.origin.x + this.length * Math.sin(this.angle);
    this.position.y = this.origin.y + this.length * Math.cos(this.angle);

    p.line(this.origin.x, this.origin.y, this.position.x, this.position.y);
    p.ellipse(this.position.x, this.position.y, 20, 20);
  },
},
  
   
  // Fourth Sketch
{
  name: "Bounce",
  show: true,
  description: "Circle increase speed every time it hits a border",
  loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
  setup(p) {
    this.x = p.width / 2;
    this.y = p.height / 2;
    this.xSpeed = 2;
    this.ySpeed = 3;
    this.hue = 0;
    p.colorMode(p.HSB, 360, 100, 100);
    p.background(30); // Set initial background to black
  },

  draw(p) {
    // Change color
    this.hue = (this.hue + 5) % 360;
    p.fill(this.hue, 100, 100);
    p.noStroke();

    p.ellipse(this.x, this.y, 20, 20);

    
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    
    if (this.x < 10 || this.x > p.width - 10) {
      this.xSpeed = -this.xSpeed * 1.25;
      this.x = p.constrain(this.x, 10, p.width - 10);
    }
    if (this.y < 10 || this.y > p.height - 10) {
      this.ySpeed = -this.ySpeed * 1.25;
      this.y = p.constrain(this.y, 10, p.height - 10);
    }
  },
}

,

  
   
  // Fifth Sketch
{
  name: "Planets",
  show: true,
  description: "Planets spinning around each other",
  setup(p) {
    this.angle1 = 0;
    this.angle2 = 0;
    this.radius1 = 100;
    this.radius2 = 50;
    p.colorMode(p.HSB, 360, 100, 100);
  },

  draw(p) {
    p.background(0); // Black background

    p.push();
    p.translate(p.width / 2, p.height / 2);

    
    this.angle1 += 0.02;
    let x1 = this.radius1 * Math.cos(this.angle1);
    let y1 = this.radius1 * Math.sin(this.angle1);
    p.fill(0, 100, 100);
    p.ellipse(x1, y1, 20, 20);

    
    p.translate(x1, y1);
    this.angle2 += 0.05;
    let x2 = this.radius2 * Math.cos(this.angle2);
    let y2 = this.radius2 * Math.sin(this.angle2);
    p.fill(120, 100, 100);
    p.ellipse(x2, y2, 10, 10);

    p.pop();
  }
},

  
   
  /// Sixth Sketch
{
  name: 'Christmas Tree ',
  show: true,
  description: 'A Christmas tree with increasing number of ornaments',
  setup(p) {
    
    p.ornaments = [];
  },

  draw(p) {
    p.background(0); 

    // Draw tree
    p.fill(139, 69, 19); // Green
    p.triangle(200, 100, 150, 250, 250, 250);
    p.triangle(200, 50, 125, 200, 275, 200);

    // Draw trunk
    p.fill(34, 139, 34);// Brown
    p.rect(185, 250, 30, 50);

    // Add a new ornament every frame
    if (p.frameCount % 10 === 0) {
      let x = p.random(170, 220);
      let y = p.random(100, 250);
      p.ornaments.push({ x, y });
    }

    // Draw ornaments
     p.fill(0, 90, 60);
   
    for (let ornament of p.ornaments) {
      p.ellipse(ornament.x, ornament.y, 10, 10);
    }
  }
},
  
  
// Seventh Sketch
{
  name: 'Autoportrait',
  show: true,
  description: 'An autoportrait that changes over time',
  loopLength: DEFAULT_LOOP_LENGTH_IN_FRAMES,
  setup(p) {
    p.textSize(152);  
    p.textAlign(p.CENTER, p.CENTER);
  },
  
  draw(p) {
    let t = (p.frameCount / this.loopLength) % 1;  
    let easedT = 0.5 - 0.5 * Math.cos(t * Math.PI * 2);  
    
    p.background(0, 100, 80); 
    let faceFeatures = ['😀', '😁', '😂', '🤣', '😃'];
    let index = Math.floor(easedT * faceFeatures.length);
    let displayFace = faceFeatures[index];
    
    p.fill(0, 100, 40); 
    p.text(displayFace, p.width / 2, p.height / 2);
  },
},


];
