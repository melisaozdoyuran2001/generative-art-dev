/* globals Vue, systems, Vector2D */

(function () {

  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */
  
    // TODO: Make your own dimensions
    dimensions: ["bearSize", "bearColor", "eyeSize", "smileCurve", "earSize", "eyeColor"],

    hide: false,
    name: "gummy bears", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "some rectangles",

    landmarks: [{
      name:"happy cherry",
      dna: [0.61,0.00,0.31,0.79,0.25,0.22],
    }, {
      name:"mango",
      dna: [0.50,0.14,0.75,0.50,0.39,0.50],
    }, {
      name: "blueberry",
      dna: [1.00,0.62,0.75,0.50,1.00,0.00]
    },
               {
      name: " sad kiwi",
      dna: [0.81,0.33,0.75,0.02,0.00,0.00]
    },
               {
      name: "grape",
      dna: [0.00,0.72,0.61,0.21,0.72,0.33]
    }],

    //==================================================================
    // POPULATION  AS A WHOLE

    setup({p, individuals, deltaTime, time}) {
      // Create initial population
      
    },

    draw({p, individuals, deltaTime, time}) {
      p.background("#d0f4de")
    },

   
    //==================================================================
    // INDIVIDUAL

    
    setupIndividual(individual, {p}) {
      // Setup an individual, 
      // if you need to initialize any variables for an individual
      // Note that their DNA may change after this, so only use it for non-DNA stuff

      // e.g, give each rectangle a position we can move around later (good for particles)
      // individual.position = new Vector2D()
    },


    updateIndividual(individual, {p, time, deltaTime}) {

    },  

    drawIndividual(individual, {p, time, deltaTime}) {
  let dim = {};
  this.dimensions.forEach((dimName, index) => {
    dim[dimName] = individual.dna[index];
  });

  p.push();

  const [x, y] = individual.basePosition;
  p.translate(x, y);

  // Map DNA to bear characteristics
  let bearSize = p.map(dim.bearSize, 0, 1, 25, 35);
  let bearColor = p.map(dim.bearColor, 0, 1, 0, 360);
  let earSize = p.map(dim.earSize, 0, 1, 4, 10);
  let eyeColor = p.map(dim.eyeColor, 0, 1, 0, 140);
  

  // Draw the bear body
  p.stroke(0);
  p.strokeWeight(2); 
  p.fill(bearColor, 100, 73);
  p.ellipse(0, 0, bearSize, bearSize);

  // Draw the bear head
  p.ellipse(0, -bearSize/ 0.7 , bearSize / 1.5, bearSize / 1.5);
      
  // Draw the bear ears
  p.ellipse(-bearSize / 2.5, -bearSize / 0.5,earSize, earSize);
  p.ellipse(bearSize / 2.5, -bearSize / 0.5, earSize, earSize);

  // Draw the bear arms
  p.ellipse(-bearSize / 2, 0, bearSize / 3, bearSize / 3);
  p.ellipse(bearSize / 2, 0, bearSize / 3, bearSize / 3);

  // Draw the bear legs
  p.ellipse(-bearSize / 1.4, bearSize / 1.4, bearSize / 3, bearSize / 3);
  p.ellipse(bearSize / 1.44, bearSize / 1.4, bearSize / 3, bearSize / 3);
      
  let eyeSize = p.map(dim.eyeSize, 0, 1, 2, 5);
  let smileCurve = p.map(dim.smileCurve, 0, 1, 0, 5);
  

  p.strokeWeight(3)
  // Draw the bear eyes
  p.fill(0, 0, eyeColor);
  p.ellipse(-eyeSize / 0.6, -bearSize / 0.7, eyeSize, eyeSize);
  p.ellipse(eyeSize / 0.6, -bearSize / 0.7, eyeSize, eyeSize);

  // Draw the bear smile or frown
  p.noFill();
  p.arc(0, -bearSize/0.9 , 5, smileCurve, 0, Math.PI);

    
  p.pop();
}
,  

  };

  latentSpaces.push(space);
})();
