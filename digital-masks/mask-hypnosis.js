/* globals Vue, p5, masks, CONTOURS, Vector2D */
(function () {
  function drawInNeonColors({ p, color, width, fxn }) {
    // Handy function to draw neon!
    p.noFill();
    p.strokeWeight(width*3);
    p.stroke(color[0], color[1], color[2], 0.3);
    fxn();
    
    p.strokeWeight(width*4);
    p.stroke(color[0], color[1], color[2] + 10, 0.3);
    fxn();

    p.strokeWeight(width*1.5);
    p.stroke(color[0], color[1], color[2] + 30, 1);
    fxn();
    p.strokeWeight(1)
  }
  let mask = {
    //=========================================================================================
    // TODO: custom data

    hide: false,
    name: "hypnosis mask", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "a mask with some particle systems",

    eyeDiff: 40, 
    outline: 0.4, 
    handSize: 60,
    
    // What kind of data does your mask need?

    //=========================================================================================

    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
    },

    drawBackground({ p }) {
      // console.log(this.backgroundTransparency);
      p.background(0, 0, 0);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },

    setupFace({ p, face }) {
      // Any data that you need on each face

      face.particles = [];
      face.earrings = [];
      face.eyeballs = [];

      face.ears.forEach((ear) => {
        let dangleCount = 1;
        for (var i = 0; i < dangleCount; i++) {
          // Earring particle
          let pt = new Vector2D(0, 0);
          pt.velocity = new Vector2D(0, 0);
          pt.force = new Vector2D(0, 0);
          pt.offsetToParent = new Vector2D(0, 0);
          pt.parent = ear;
          pt.idNumber = i;

          face.particles.push(pt);
          face.earrings.push(pt);
        }
      });

      face.eyes.forEach((eye) => {
        // Earring particle
        let pt = new Vector2D(0, 0);
        pt.velocity = new Vector2D(0, 0);
        pt.force = new Vector2D(0, 0);
        pt.offsetToParent = new Vector2D(0, 0);
        pt.parent = eye;

        face.particles.push(pt);
        face.eyeballs.push(pt);
      });
    },
    
    
  
       drawHand({ p, hand }) {
      let t = p.millis() * 0.001;

            // Landmark-based- draw an emoji on each landmark
            hand.landmarks.forEach((pt, index)=> {
              let size= this.handSize*p.noise(index +t*3)
             
              p.stroke(0,0,0); 
              p.strokeWeight(3); 
              p.fill(74,73,51); 
              p.circle(...pt, size, size)
            })
    },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
      let dt = p.deltaTime * 0.001;
      // Before drawing the face, do my particle simulation
      face.particles.forEach((pt) => {
        pt.force.mult(0);
      });
      
      
      // Draw the mouth lines
      CONTOURS.mouth.slice(4).forEach((mouthLine, mouthIndex) => {
        let h = (20 + 20 * mouthIndex * t) % 360;
        drawInNeonColors({
          p,
          color: [100, 99, 50],
          width: 2,
          fxn: () => {
            face.drawContour({
              p,
              contour: mouthLine.slice(1),
              close: true,
            });
          },
        });
      }); 
      
      
      // Make an outline but also make it weird
      let outlineCount = 4;
      for (var i = 0; i < outlineCount; i++) {
        let pct = (i / outlineCount + t *0.3) % 1;
        let opacity = 0.2 + 0.2 * Math.sin(pct * Math.PI);

        let faceContour = CONTOURS.sides[0].faceRings[0].concat(
          CONTOURS.sides[1].faceRings[0].slice().reverse()
        );

        p.noFill();
        p.stroke(84, 100, 70, opacity);
        p.strokeWeight(9);
        face.drawContour({
          p,
          // the finalPoint gets moved into position
          transformPoint: (finalPoint, basePoint, index) => {
            finalPoint.setToLerp(
              face.center,
              basePoint,
              0.8 + pct + pct * p.noise(t + index * this.outline + pct)
            );
          },
          useCurveVertices: true,
          contour: faceContour,
          close: true,
        });
      }
      

        // Set eyeball forces
      face.eyeballs.forEach((pt) => {
        // be attracted to parent
        pt.velocity.mult(0.9);
        pt.force.addMultiple(pt.offsetToParent, -2);

        // apply force toward ear
        pt.offsetToParent.setToOffset(pt.parent, pt);
        if (pt.offsetToParent.magnitude > 1) pt.setToLerp(pt, pt.parent, 0.1);
      });
      
     
      // Particle update v and pos
      face.particles.forEach((pt) => {
        pt.velocity.mult(1);
        pt.addMultiple(pt.velocity, dt);
        pt.velocity.addMultiple(pt.force, dt);
      });


      // draw eyes
      face.eyeballs.forEach((pt, index) => {
        p.fill(100);
        p.stroke(0);
        p.circle(...pt.parent, 75);

        let emojiSize = 70 + this.eyeDiff * Math.sin(t * 2); 

        p.textAlign(p.CENTER, p.CENTER); // Center the emoji on the point
        p.textSize(emojiSize); // Set the emoji size. Adjust as needed
        p.text("🌀", pt.x, pt.y);
      
      });

    },
  };
  
   

  //============================================================
  /**
   * Input controls for this bot.
   * Do we just need a chat input? Do we need anything else?
   * What about game controls, useful buttons, sliders?
   **/

  Vue.component(`input-${mask.name}`, {
    // Custom inputs for this bot
    template: `<div>
		
			<div>
      
      Eye Hypnosis Rate: <input type="range" v-model ="mask.eyeDiff"  min="20" max="100" step=".1"/> {{mask.eyebrowRaise}}
			</div>
      <div>
      
      Outline Hypnosis Rate: <input type="range" v-model ="mask.outline"  min="0.1" max="1" step=".1"/> {{mask.eyebrowRaise}}
			</div>
      
       <div>
      
      Hand Circle Size: <input type="range" v-model ="mask.handSize"  min="10" max="100" step=".1"/> {{mask.eyebrowRaise}}
			</div>
		</div>`,

    // Custom data for these controls
    data() {
      return {};
    },
    props: { mask: { required: true, type: Object } }, // We need to have bot
  });

  masks.push(mask);
})();
