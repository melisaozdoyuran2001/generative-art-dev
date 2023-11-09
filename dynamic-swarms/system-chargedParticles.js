/* globals Vue, systems, Vector2D */

(function () {
  let system = {
    hide: false,
    name: "charges",
    description: "charged particles pulling each other,",
    particleNumber: 10,
    particleSize: 10,

    useSprings: true,
    springPower: 0.01,
    thrustPower: 160,
    thrusterTurnPower: 0.1,
    thrustForAll: true,

    setup(p, {}) {
      this.setupParticles(p);
    },

    setupParticles(p) {
      this.particles = [];
      this.edges = [];

      for (var i = 0; i < this.particleNumber; i++) {
        let pt = new Vector2D(
          Math.random() * p.width,
          Math.random() * p.height
        );
        pt.idNumber = this.particles.length;
        pt.velocity = new Vector2D();
        pt.force = Vector2D.polar(100, Math.random() * 100);
        pt.thrustForce = new Vector2D();
        pt.borderForce = new Vector2D();
        pt.edgeForce = new Vector2D();
        pt.rotation = Math.random() * 300;
        this.particles.push(pt);
      }

      function getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }

      for (var i = 0; i < 20; i++) {
        let pt0 = getRandom(this.particles);
        let pt1 = getRandom(this.particles);
        if (pt0 !== pt1) {
          this.edges.push({
            length: 100,
            pt0,
            pt1,
          });
        }
      }
    },

    update(p, { deltaTime, time }) {
      let center = new Vector2D(p.width / 2, p.height / 2);
      if (this.useSprings) {
        this.particles.forEach((pt) => pt.edgeForce.mult(0));
        this.edges.forEach((e) => {
          let offset = Vector2D.sub(e.pt1, e.pt0);
          let currentLength = offset.magnitude;
          let stretch = currentLength - e.length;
          let s = this.springPower;
          e.pt0.addMultiple(offset, (s * stretch) / currentLength);
          e.pt1.addMultiple(offset, (-s * stretch) / currentLength);
        });
      }

      this.particles.forEach((pt, index) => {
        pt.thrustDirection = undefined;
        
        if (p.isKeyPressed && (this.thrustForAll || index === 0)) {
          let thrustPower = this.thrustPower;
          let thrusterSideAngle = 1.2;
          let thrusterTurnPower = this.thrusterTurnPower;
          pt.thrustForce.setToPolar(thrustPower, pt.rotation);
          pt.thrustDirection = "forward";
          
          if (p.key === "ArrowRight") {
            pt.thrustForce.setToPolar(
              thrustPower,
              pt.rotation + thrusterSideAngle
            );
            pt.rotation += thrusterTurnPower;
            pt.thrustDirection = "right";
          }

          if (p.key === "ArrowLeft") {
            pt.thrustForce.setToPolar(
              thrustPower,
              pt.rotation - thrusterSideAngle
            );
            pt.rotation -= thrusterTurnPower;
            pt.thrustDirection = "left";
          }
        } else {
          pt.thrustForce.mult(0);
        }

        let directionToCenter = Vector2D.sub(center, pt);
        let dist = directionToCenter.magnitude;
        let borderAmount = Math.max(0, dist - 200);
        pt.borderForce.setToMultiple(borderAmount / dist, directionToCenter);

        pt.force.setToAdd(pt.thrustForce, pt.borderForce);
      });

      this.particles.forEach((pt) => {
        pt.velocity.addMultiple(pt.force, deltaTime);
        pt.addMultiple(pt.velocity, deltaTime);
      });

      this.particles.forEach((pt) => {
        pt.velocity.mult(0.94);
      });
    },

    draw(p, { time, deltaTime, drawDebugInfo }) {
      this.particles.forEach((pt) => {
        let chargeColor = pt.charge > 0 ? [0, 0, 0] : [0, 0, 100];
        p.stroke(...chargeColor);
        p.fill("#B50202");
        p.ellipse(...pt, this.particleSize, this.particleSize);
      });

      if (drawDebugInfo) {
        this.particles.forEach((pt) => {
          pt.drawArrow(p, {
            multiplyLength: 1,
            v: pt.thrustForce,
            color: "#B50202"
          });
          
          const distanceFromOrigin = Math.sqrt(pt.x * pt.x + pt.y * pt.y);
          p.fill("#FF3D00"); 
          p.text(`Distance: ${distanceFromOrigin.toFixed(2)}`, pt.x + 10, pt.y + 20);
        });
        
        if (this.useSprings) {
          this.edges.forEach((e) => {
            p.stroke(0);
            p.line(...e.pt0, ...e.pt1);
          });
        }
      }
    },
  };

  Vue.component(`controls-${system.name}`, {
    template: `<div>
      <table>
        
        <tr>
          <td>Particle Size:</td>
          <td>
            <input 
              type="range" min="1" max="100" step="1"  
              v-model.number="system.particleSize" />
          </td>
        </tr>
      </table>
    </div>`,
    data() {
      return {
        system,
      };
    },
    methods: {
      updateParticles() {
        this.system.setupParticles();
      }
    }
  });

  systems.push(system);
})();
