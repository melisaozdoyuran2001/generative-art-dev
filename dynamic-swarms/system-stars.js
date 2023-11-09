/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: "Stars",
    description: "Particles moving in  paths, represented as yellow stars",
    trailLength: 20, // Added control for trail length

    setup(p, {}) {
      this.particles = [];
      for (var i = 0; i < 10; i++) {
        let pt = new Vector2D(
          Math.random() * p.width,
          Math.random() * p.height
        );
        pt.idNumber = this.particles.length;
        pt.angle = Math.random() * 360;
        pt.trail = [];
        this.particles.push(pt);
      }
    },

    update(p, { deltaTime, time }) {
  this.particles.forEach((pt) => {
    let border = 20;
    pt.wrap(-border, -border, p.width + border, p.height + border);
    pt.angle += 1;
    pt.x += Math.cos(pt.angle * Math.PI / 180) * 2; // Constant velocity
    pt.y += Math.sin(pt.angle * Math.PI / 180) * 2; // Constant velocity

    pt.trail.push(pt.clone());
    if (pt.trail.length > this.trailLength) { // Use control for trail length
      pt.trail.shift();
    }
    // Truncate the trail if it's longer than the current trailLength
    if (pt.trail.length > this.trailLength) {
      pt.trail = pt.trail.slice(-this.trailLength);
    }
  });
},


    draw(p, { time, deltaTime, drawDebugInfo }) {
  this.particles.forEach((pt) => {
    p.fill("#FFE927");
    p.stroke(0);
    p.strokeWeight(0.1);

    // Draw star
    p.push();
    p.translate(pt.x, pt.y);
    p.beginShape();
    for (let i = 0; i < 5; i++) {
      let x = Math.cos((i * 144 - 90) * Math.PI / 180) * 10;
      let y = Math.sin((i * 144 - 90) * Math.PI / 180) * 10;
      p.vertex(x, y);
    }
    p.endShape(p.CLOSE);
    p.pop();

    // Draw trail
   for (let i = 0; i < pt.trail.length; i += 3) {  // Increment by 2 to add spacing
      let trailPt = pt.trail[i];
      p.circle(trailPt.x, trailPt.y, 3);  
     p.stroke(255);
     p.strokeWeight(0.3); 
    }

    // Debug text for trail length
    if (drawDebugInfo) {
      
        let centerX = p.width / 2;
      let centerY = p.height / 2;
      p.stroke(255, 0, 0); // Red line
      p.line(pt.x, pt.y, centerX, centerY);
     
    }
  });
},
  };

  Vue.component(`controls-${system.name}`, {
    template: `<div>
      <label for="trailLength">Trail Length:</label>
      <input type="range" id="trailLength" min="10" max="100" v-model.number="system.trailLength" />
    </div>`,
    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();
