/* globals Vue, systems, Vector2D */
let antImage;

(function () {
  let system = {
    hide: false, 
    name: "Ants", 
    description: "basic particles",

    //=====================
    // tuning values

    drawStroke: true,
    wanderStrength: 100,
    gravityStrength: 70,
    borderStrength: 100,
    mouseStrength: 100,
    drag: 0.15,
    color0: [100, 100, 50],
    legLength: 20,
    crowdSize: 30,
    bodySize: 20,

    //=====================
    // events

    setup(p, {}) {
      console.log("SETUP BASICS")
      // Create the initial particles
       antImage = p.loadImage('https://cdn.glitch.global/a103b158-0f75-438e-bdf3-99d1e97cfe0a/ant?v=1698190987300');
      this.particles = [];
      for (var i = 0; i < 20; i++) {
        this.createParticle(p);
      }
    },

    // Helper function
    createParticle(p) {
      // Set up a single particle
      let pt = new Vector2D(Math.random() * p.width, Math.random() * p.height);
      // let pt = new Vector2D(Math.random() * p.width, 0);
      // let pt = Vector2D.polar(100, 100*Math.random())
      // pt.x += p.width/2
      // pt.y += p.height/2

      // Helpful: a link back to the rest of the particles
      pt.particles = this.particles;
      // Helpful: a unique ID number
      pt.idNumber = this.particles.length;

      // Basic particle info
      pt.velocity = new Vector2D();
      pt.force = new Vector2D();

      // Custom forces
      pt.gravityForce = new Vector2D();
      pt.wanderForce = new Vector2D();
      pt.borderForce = new Vector2D();
      pt.mouseForce = new Vector2D();

      // You could also give each point a color, a mass, a radius,
      // ... an emoji, a lifespan, a mood, an orbiting moon, a trail of past positions ...
      // What does this particle need to do its job?

      this.particles.push(pt);
    },

    update(p, { deltaTime, time }) {
      let center = new Vector2D(p.width / 2, p.height / 2);

      // Set the forces
      this.particles.forEach((pt) => {
        
        
        // Calculate forces
        pt.gravityForce.setTo(0, this.gravityStrength);

        // WANDER FORCE
        // Move around randomly
        let rateOfWanderChange = 0.1;
        // let angle = 40*p.noise(pt.idNumber)
        // let angle = 40*p.noise(time*rateOfWanderChange)
        let angle =
          40 * p.noise(time * rateOfWanderChange, pt.idNumber * 0.01);
        pt.wanderForce.setToPolar(this.wanderStrength, angle);

        // BORDER FORCE
        let directionToCenter = Vector2D.sub(center, pt);
        let dist = directionToCenter.magnitude;
        // How much should the border affect us?
        // Maybe not at all if we are close enough, then linearly after that
        let borderAmount = Math.max(0, dist - 200);
        borderAmount *= 0.1;

        // Increasing the force exponentially as you go farther out makdes it feel "bouncy"
        borderAmount = .2*Math.pow(borderAmount, 2)
        // Increasing the force by a root as you go farther out makdes it feel "squishy"
        // borderAmount = Math.pow(borderAmount, 0.2);

        // Ok, now make a force in this direction, at this magnitude (divide by the original magnitued)
        pt.borderForce.setToMultiple(
          (borderAmount * this.borderStrength) / dist,
          directionToCenter
        );
        
        
        // MOUSE FORCE
        let mousePos = new Vector2D(p.mouseX, p.mouseY)
        let directionToMouse = Vector2D.sub(mousePos, pt);
        pt.mouseForce.setToMultiple(1, directionToMouse)
        

        // Add up all the forces
        pt.force.setToAdd(
          pt.gravityForce,
          pt.mouseForce,
          pt.borderForce,
          pt.wanderForce
        );
      });
      
      
      

      // Move the particles
      this.particles.forEach((pt) => {
        // Apply the force to the velocity

        pt.velocity.addMultiple(pt.force, deltaTime);

        // Apply the velocity to the position
        pt.addMultiple(pt.velocity, deltaTime);

        // Do you want to slow them down? You can limit speeds in lots of ways:
        // Apply a drag force (ie, lose more speed the faster you are going)
        pt.velocity.mult(1 - this.drag);

        // Apply a maximum (or minimum speed limit)
        // e.g. this makes particles move at a constant rate
        // pt.velocity.constrain(100, 100)
      });
    },
    
    // mouseDragged(p, held, { time, deltaTime, drawDebugInfo }) {
      // console.log("dragged", p.mousePos, p.mouseVelocity)
    // },
draw(p, { time, deltaTime, drawDebugInfo }) {
  this.particles.forEach((pt) => {
    // Regular drawing
    if (this.drawStroke) {
      p.strokeWeight(2)
      p.stroke(100);
    }
    else p.noStroke();
    
    
    let angle = Math.atan2(pt.velocity.y, pt.velocity.x);
    
    p.push();  // Save current drawing settings
    p.translate(pt.x, pt.y);  // Move to the particle's position
    p.rotate(angle);  // Rotate the coordinate system
    
    p.fill(0);
        p.ellipse(0, 0, this.bodySize, this.bodySize/2);
    
    
    // Draw spider legs with adjustable length
        p.stroke(0);
        p.strokeWeight(2);
        for(let legAngle = 0; legAngle < 360; legAngle += 45) {
          let x1 = this.legLength / 2 * Math.cos(p.radians(legAngle));
          let y1 = this.legLength / 2 * Math.sin(p.radians(legAngle));
          let x2 = this.legLength * Math.cos(p.radians(legAngle));
          let y2 = this.legLength * Math.sin(p.radians(legAngle));
          p.line(x1, y1, x2, y2);
        }
    
    p.pop(); 
  });
      if (drawDebugInfo) {
  this.particles.forEach((pt) => {
    // Draw helpful debugging info here
    p.strokeWeight(1);
    
    // Draw force arrow (Red)
    pt.drawArrow(p, {
      multiplyLength: 0.4,
      v: pt.force,
      color: ["#FF0303"],
      startOffset: 20,
    });

    // Draw velocity arrow (Green)
    pt.drawArrow(p, {
      multiplyLength: 0.25,
      v: pt.velocity,
      color: ["#00FF75"],
      startOffset: 20,
      normalOffset: 5,
    });

   
    let forceMagnitude = pt.force.magnitude;
    p.fill("#FF639B");  
     p.stroke(0)
    p.circle(pt.x, pt.y, forceMagnitude/30);
  });
}

    },
  };

  /*
   * Controls for this system
   */

  Vue.component(`controls-${system.name}`, {
    template: `<div>
			<!-- TODO: set this to your system's controls --> 
			<table>
				<tr>
        <td>Leg Length:</td>
        <td><input 
          type="range" min="10" max="50" step="1"  
          v-model.number="system.legLength" />
        </td>
      </tr>
      <tr>
        <td>Body Size:</td>
        <td><input 
          type="range" min="10" max="50" step="1"  
          v-model.number="system.bodySize" />
        </td>
      </tr>

	
			
		</div>`,
    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();
