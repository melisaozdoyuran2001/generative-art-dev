const WIDTH = 1000;
const HEIGHT = 600;
const DEFAULT_FRAME_RATE = 30;
const DEFAULT_LOOP_LENGTH_IN_FRAMES = 100;

const STARTING_COLOR0 = [130, 100, 87];
const STARTING_COLOR1 = [0, 87, 61];
const STARTING_BRUSH_SIZE = 1;

function startDrawing(p) {
  // Change if you want to start with a different background,
  // or even *no background!*
  p.background(0);
}

function addMult(v0, v1, m) {
  // v0 += v1*m
  v0[0] += v1[0]*m
  v0[1] += v1[1]*m
}
  

let brushes = [
  // Your brushes here!
  //======================================================

  // //   TEMPLATE BRUSH
  // {
  //   label: "✏️",
  //   hide: false,
  //   description: "A brush that does nothing",
  //   mouseDragged(p, { color0, color1, brushSize }) {},
  // },
  
  
  ///MY ERASER
  
  {
  label: "🧽",
  show: false,
  description: "Eraser makes entire screen black",
  particles: [],


  mouseDragged(p, { color0, color1, brushSize }) {
 
  p.fill(color0[0], color0[1], color0[2], 255);  
  p.noStroke();
  p.ellipse(p.mouseX, p.mouseY, 20, 20); 

  
  for (let i = 0; i < 5; i++) {
    let particle = {
      x: p.mouseX,
      y: p.mouseY,
      vx: p.random(-1, 1),
      vy: p.random(-5, -1),
      alpha: 255
    };
    this.particles.push(particle);
  }

  
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let particle = this.particles[i];
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha -= 5;

    
    p.noStroke();
    p.fill(color0[0], color0[1], color0[2], particle.alpha);
    p.ellipse(particle.x, particle.y, 30);

    if (particle.alpha < 0) {
      this.particles.splice(i, 1)
    }
  }
}
  },
  
  

  //MY DISCRETE BRUSH 
    {
    label: "🔫",
    hide: false,
    description: "Gunshot Brush",
    gunshotParticles: [],
      

    mousePressed(p, { color0, color1, brushSize }) {
      this.gunshotParticles = [];
    },

    mouseDragged(p, { color0, color1, brushSize }) {
      let x = p.mouseX;
      let y = p.mouseY;
      let r = brushSize * 5 + 1;

      for (let i = 0; i < 10; i++) {
        let angle = p.random(p.TWO_PI);
        let distance = p.random(5, 20);
        let dx = x + p.cos(angle) * distance;
        let dy = y + p.sin(angle) * distance;

        let gunshotParticle = {
          x: dx,
          y: dy,
          r: r / 4,  
          color: color1
        };
        this.gunshotParticles.push(gunshotParticle);
      }
    },

    draw(p, { color0, color1, brushSize }) {
      for (let gunshotParticle of this.gunshotParticles) {
        p.noStroke();
        p.fill(gunshotParticle.color[0], gunshotParticle.color[1], gunshotParticle.color[2]);
        p.circle(gunshotParticle.x, gunshotParticle.y, gunshotParticle.r);
      }
    }
  },
  
  
  //CONTINUOUS BRUSH
    {
    label: "🧪",
    description: "Dynamic Slimy Spill Brush",
      
    mousePressed(p, { color0, color1 }) {
      this.px = p.mouseX;
      this.py = p.mouseY;
      this.sizeFactor = 0;
    },

    mouseDragged(p, { color0, color1 }) {
      let x = p.mouseX;
      let y = p.mouseY;

      this.sizeFactor = (this.sizeFactor + 0.5) % 7;

      
      let green = [132, 87, 61];
      let darkGreen = [110, 100, 74];

      p.strokeWeight(10 + this.sizeFactor); 

     
      p.stroke(green[0], green[1], green[2]);
      p.line(x, y, this.px, this.py);
      p.stroke(darkGreen[0], darkGreen[1], darkGreen[2]);
      p.line(x + 2, y + 2, this.px + 2, this.py + 2);

      this.px = x;
      this.py = y;
    }
  },
  
  
  
  {
    label: "🍅",
    hide: false,
    description: "Pimple Popping",

    setup(p) {
      this.points = [];
      p.background(38, 100, 84); 
    },

    mouseDragged(p, { color0, color1, brushSize }) {
      let x = p.mouseX;
      let y = p.mouseY;
      let pt = [x, y];

      pt.totalLifespan = 5 + Math.random() * 20;
      pt.lifespan = pt.totalLifespan;
      this.points.push(pt);

      p.circle(x, y, 10);
    },

    draw(p, { color0, color1, brushSize }) {
      let radius = 5;
      let t = p.millis() * 0.001;  

      this.points.forEach((pt, index) => {
        pt.lifespan--;

        if (pt.lifespan > 0) {
          let pctLife = pt.lifespan / pt.totalLifespan;
          let r = radius * 0.7;
          let theta = p.noise(index, t * 0.1) * 50;  

          pt[0] += r * Math.cos(theta);
          pt[1] += r * Math.sin(theta);

          p.noStroke();
          p.fill(0,87,61);
          p.circle(...pt, pctLife * radius * 1.5);
          

          p.fill(55, 75, 59 * (1 - 0.3 * pctLife));
          p.circle(...pt, pctLife ** 0.01 * radius);
        }
      });
    }
  },
   
  
  {
    label: "🌀",
    show: true,
    description: "A unique continuous brush using curves",

    mousePressed(p, { color0, color1, brushSize }) {
      this.points = [];
    },

    mouseDragged(p, { color0, color1, brushSize }) {
      let x = p.mouseX;
      let y = p.mouseY;
      this.points.unshift([x, y]);

      p.noFill();
      p.stroke(color1[0], color1[1], color1[2]);
      p.strokeWeight(brushSize);
      p.beginShape();

      this.points
        .filter((pt, index) => index % 3 == 0)
        .forEach(([x, y], index) => {
          let dx = Math.sin(index) * 30;
          let dy = Math.cos(index) * 20;
          p.curveVertex(x + dx, y + dy);
        });

      p.endShape();
    }
  },
  
  
    {
    label: "🛒",
    show: true,
    description: "Grocery Shopping",

    mousePressed(p, { color0, color1, brushSize }) {
      this.fruits =  ['🍎', '🍌', '🍇', '🍊', '🍋', '🍉', '🍈', '🍒', '🍑', '🍍', '🥥', '🥦', '🥕', '🌽', '🌶', '🍅', '🍆', '🥒', '🥬', '🥑', '🍓', '🍏', '🍐', '🍈', '🍠', '🥔', '🥗', '🍄', '🥜', '🌰'];
    },

    mouseDragged(p, { color0, color1, brushSize }) {
      let x = p.mouseX;
      let y = p.mouseY;

      let randomFruit = this.fruits[Math.floor(Math.random() * this.fruits.length)];

      p.textSize(32);
      p.text(randomFruit, x, y);
    }
  },
  
  
  

];
