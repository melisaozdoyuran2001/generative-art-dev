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
    name: "pinky mask", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "a mask with some examples of drawing",
    
    irisColor:  [192, 100, 59],
    eyeSize: 35, 
    mouthSize: 3,
    rotationRadius: 180, 
    emojiCount : 10 , 
    

    // What kind of data does your bot need?

    //=========================================================================================
     noseHistory: [],
    maxHistoryLength: 50,
        emojis: [],
    
    
    setup({ p }) {
      // Runs when you start this mask
      console.log("START MASK - ", this.name);
      
    },

    drawBackground({ p }) {
      console.log(this.backgroundTransparency);
      p.background(0, 0, 0, this.backgroundTransparency);
    },

    setupHand({ p, hand }) {
      // Any data that you need on each hand
    },
    


    setupFace({ p, face }) {
  
    },

    
     drawHand({ p, hand }) {
      let t = p.millis() * 0.001;
      
      CONTOURS.fingers.forEach((finger, fingerIndex) =>{
        let h = (t*200 + fingerIndex)%360
        drawInNeonColors({
            p,
            color: [324, 99, 50],
            width: 20,
            fxn: () => {
              hand.drawContour({
                p,
                //contour: [0].concat(finger),
                contour: finger
                
              });
            },
          });
      })
     },

//     drawHand({ p, hand }) {
//       let t = p.millis() * 0.001;

//       //       // Landmark-based- draw an emoji on each landmark
//       //       hand.landmarks.forEach((pt, index)=> {
//       //         let size= 40*p.noise(index + t)
//       //         // p.textSize(size)
//       //         // p.text("💔", ...pt)

//       //         p.rect(...pt, size, size)
//       //       })
//     },

    drawFace({ p, face }) {
      let t = p.millis() * 0.001;
     
      
      //add rotating hearts
     const emoji = [ "💗"]; // Add more emojis to the array

    for (var i = 0; i < this.emojiCount; i++) {
      let emo = (i / this.emojiCount + t * 10 * 0.008) ;
      let x = face.center.x + this.rotationRadius * Math.cos(emo * Math.PI  * 2);
      let y = face.center.y + this.rotationRadius * Math.sin(emo * Math.PI * 2);

      // Randomly select an emoji from the array
      let randomEmoji = emoji[Math.floor(Math.random() * emoji.length)];

      // Random rotation speed (weirdness factor)
      let rotationSpeed = Math.random() * 0.01;

      // Random size (weirdness factor)
      let size = Math.random() *5 + 60;

      p.textSize(size);
      // Rotate the emoji at a random speed
      let emojiAngle = emo * Math.PI * 2 + t * rotationSpeed;
      p.push();
      p.translate(x, y);
      p.rotate(emojiAngle);
      p.text(randomEmoji, 0, 0);
      p.pop();
  }


      
       p.stroke(345,92,55)
       p.strokeWeight(3); 
      function setColor(p, sideIndex, contourLevel) {
      let hue = 320; // Hue for neon pink
      let saturation = 100; // High saturation for neon effect
      let brightness = contourLevel * 20 + 50; // Dynamic brightness
      brightness = Math.min(brightness, 100); // Ensure brightness does not exceed 100

      p.fill(hue, saturation, brightness);
    }

    // Main function to process each side of the face
    face.forEachSide((SIDE_CONTOURS, sideIndex) => {
      // Process each face contour
      for (let i = 0; i < SIDE_CONTOURS.faceRings.length - 1; i++) {
        setColor(p, sideIndex, i); // Set color for current contour level
        // Draw contour
        face.drawContour({
          p,
          contour: SIDE_CONTOURS.faceRings[i],
          contour1: SIDE_CONTOURS.faceRings[i + 6],
        });
      }

      // Special case for drawing with the center line
      setColor(p, sideIndex, 2); // Set color for the center line
      face.drawContour({
        p,
        contour: SIDE_CONTOURS.faceRings[2],
        contour1: CONTOURS.centerLine,
      });
    });
      


      // You can get points by looking up individual landmarks
//       // I also added a few
        let nosePoint = face.landmarks[CONTOURS.centerLine[9]]
        let foreheadPoint = face.landmarks[CONTOURS.centerLine[0]]
//        let chinPoint = face.landmarks[CONTOURS.centerLine[25]]
        p.circle(...nosePoint, 30)
//        p.circle(...foreheadPoint, 20)
//        p.circle(...chinPoint, 20)
//       p.stroke(0);
//       p.fill(100);
      
      
//       p.circle(...face.nose, 20);
//       p.circle(...face.chin, 20);
//       p.circle(...face.ears[0], 20);
//       p.circle(...face.ears[1], 20);
//       p.circle(...face.eyes[0], 20);
//       p.circle(...face.eyes[1], 20);
      
      // Draw the forehead circle
     
      let foreheadRadius = 20;
      // Drawing the crown emoji
      let crownEmoji = '👑';
      let emojiSize = 50; // Adjust size as needed
      p.textSize(emojiSize);
      p.textAlign(p.CENTER, p.BOTTOM);

      // Calculate the position of the crown emoji
      let crownX = face.forehead.x; // Horizontal center of the forehead circle
      let crownY = face.forehead.y - foreheadRadius + emojiSize/1.7 ; // Position above the forehead circle

      p.text(crownEmoji, crownX, crownY);
      
      
       // Draw the center line to the nose
      drawInNeonColors({
        p,
        color: [324, 99, 50],
        width: 5,
        fxn: () => {
          face.drawContour({
            p,
            contour: CONTOURS.centerLine.slice(0, 14),
          });
        },
      });
      
      
      
      // Draw some cool ears
      face.ears.forEach((earPos, earIndex) => {
        p.fill(324, 99, 50, 0.2);
        earPos.draw(p, 30 * face.scale);
      });
      
      
      // DRAW EACH EYE
      face.eyes.forEach(eyePt => {
       p.fill(100);
      p.circle(...eyePt, this.eyeSize); 


      let blueCircleX = eyePt.x;
      let blueCircleY = eyePt.y - 1; // Adjust this value as needed

      p.fill(this.irisColor); 
      p.circle(blueCircleX, blueCircleY, 20); // Blue circle, adjust size as needed

      p.fill(0);
      p.circle(eyePt.x, eyePt.y - 2, 12); // Inner eye circle
      })
      
      // Draw the mouth lines
      CONTOURS.mouth.slice(this.mouthSize).forEach((mouthLine, mouthIndex) => {
        let h = (20 + 20 * mouthIndex * t) % 360;
        drawInNeonColors({
          p,
          color: [324, 99, 50],
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
				
          
          iris color: <color-picker v-model="mask.irisColor" />
			     </div>
			  <div> eye size: <input type="range" v-model="mask.eyeSize" min="20" max="50" step=".1" /></div>
			  <div>mouth size: <input type="range" v-model="mask.mouthSize" min="1" max="5" step=".1" /></div>
        <div> rotation radius: <input type="range" v-model="mask.rotationRadius" min="100" max="300" step=".1" /></div>
         <div> emoji count: <input type="range" v-model="mask.emojiCount" min="0" max="20" step=".1" /></div>
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
