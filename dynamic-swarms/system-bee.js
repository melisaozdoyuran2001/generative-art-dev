/* globals Vue, systems, Vector2D */
let beeImage;

(function () {
  let system = {
    hide: false,
    name: "Bee",
    description: "bees flying around",
    
    rateOfWanderChange: 0.6,

    setup(p, {}) {
      beeImage = p.loadImage('https://cdn.glitch.global/a103b158-0f75-438e-bdf3-99d1e97cfe0a/bee.png?v=1698173957914');
      this.particles = [];
      for (var i = 0; i < 12; i++) {
        let pt = new Vector2D(
          Math.random() * p.width,
          Math.random() * p.height
        );
        pt.idNumber = this.particles.length;
        pt.velocity = new Vector2D();
        pt.force = Vector2D.polar(120, Math.random() * 50);
        pt.wanderForce = new Vector2D();
        pt.trail = [];
        pt.size = 35 + Math.random() * 25;
        this.particles.push(pt);
      }
    },

    update(p, { deltaTime, time }) {
      let center = new Vector2D(p.width / 2, p.height / 2);
      this.particles.forEach((pt) => {
        let angle = 45 * p.noise(time * this.rateOfWanderChange, pt.idNumber * 0.02);
        pt.wanderForce.setToPolar(110, angle);
        pt.force.setToAdd(pt.wanderForce);
      });

      this.particles.forEach((pt) => {
        pt.velocity.addMultiple(pt.force, deltaTime);
        pt.addMultiple(pt.velocity, deltaTime);
      });

      this.particles.forEach((pt) => {
        // Reverse direction when hitting the edge
        if (pt.x < 0 || pt.x > p.width) pt.velocity.x *= -1;
        if (pt.y < 0 || pt.y > p.height) pt.velocity.y *= -1;

        pt.velocity.constrain(25, 150);
        pt.trail.unshift(pt.clone());
        pt.trail = pt.trail.slice(0, 18);
      });
    },

    draw(p, { time, deltaTime, drawDebugInfo }) {
      if (this.hide) return;
      this.particles.forEach((pt) => {
        p.image(beeImage, pt.x - pt.size / 2, pt.y - pt.size / 2, pt.size, pt.size);
        if (drawDebugInfo) {
          pt.drawArrow(p, {
            multiplyLength: 0.5,
            v: pt.force,
            color: ['#cdb4db'],
            startOffset: 10,
          });

          pt.drawArrow(p, {
            multiplyLength: 0.5,
            v: pt.velocity,
            color: ['#ffafcc'],
            startOffset: 10,
            normalOffset: 5,
          });
          
          p.fill(0); 
         
          
          p.textSize(12);
          p.text(`Velocity: ${pt.velocity.magnitude.toFixed(2)}`, pt.x + 15, pt.y + 15);
        }
      });
    },
  };

  Vue.component(`controls-${system.name}`, {
     template: `<div>
      <table>
        <tr>
          <td>rateOfWanderChange:</td>
          <td><input 
            type="range" min="0" max="1" step="0.1"  
            v-model.number="system.rateOfWanderChange" />
          </td>
        </tr>
      </table>

    </div>`,
    data() {
      return {
        system,
      };
    },
  });

  systems.push(system);
})();