/* globals Vue, systems, Vector2D */

(function () {

  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */
  
    // TODO: Make your own dimensions
    dimensions:["teaHue", "cupSize", "bobaNum", "bobaHue","bobaSize" ,"strawSize"],
    hide: false,
    name: "boba tea", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "some boba teas",

    landmarks: [{
      name:"small apple",
      dna: [0.63,0.00,0.20,0.32,0.00],
    }, {
      name:"medium passion fruit",
      dna: [0.31,0.27,0.45,0.14,0.11],
    }, {
      name: "orange",
      dna: [0.21,1.00,0.90,0.08,1.00,1.00]
    },
               {
      name: "lemon",
      dna: [0.00,0.75,0.90,1.00,0.54]
    },
               {
      name: "acai",
      dna: [0.98,0.82,1.00,0.84,0.32,1.00]
    }],

    //==================================================================
    // POPULATION  AS A WHOLE

    setup({p, individuals, deltaTime, time}) {
      // Create initial population
      
    },

    draw({p, individuals, deltaTime, time}) {
      p.background("#ffe5ec")
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

  let yOffset = -5;
  let xOffset = 0;

  p.push();

  const [x, y] = individual.basePosition;

  p.translate(x + xOffset, y + yOffset);

  p.scale(individual.baseScale);

  let bobaHue= p.map(dim.bobaHue, 0, 1, 0, 360);
  let teaHue = p.map(dim.teaHue, 0, 1, 0, 180);
  let cupSize = p.map(dim.cupSize, 0, 1, 50, 80);
  let bobaNum = Math.floor(p.map(dim.bobaNum, 0, 1, 5, 40));
  let strawSize = p.map(dim.strawSize, 0, 1, 70, 130);
  let bobaSize = p.map(dim.bobaSize, 0, 1, 4, 8);
  

  
  p.stroke(0);
  p.strokeWeight(1);
  p.fill(255, 100, 50);
  p.rect(-cupSize / 2, 0, cupSize, -cupSize * 1.5, 10);

  // Draw the tea
  p.noStroke();
  p.fill(teaHue, 130, 85);
  p.rect(-cupSize / 2 + 5, -5, cupSize - 10, -(cupSize * 1.5 - 10), 5);

  p.stroke(0);
  p.strokeWeight(1);
  p.fill(bobaHue, 100, 75);

  let maxBobaPerRow = Math.floor((cupSize - 20) / 10);
  let numRows = Math.ceil(bobaNum / maxBobaPerRow) +1;
  let bobaSpacing = (cupSize - 20) / (maxBobaPerRow + 1) + 3;

  let currentBoba = 0;
  for (let row = 0; row < numRows; row++) {
    for (let i = 0; i < maxBobaPerRow; i++) {
      if (currentBoba >= bobaNum) {
        break;
      }
      let bobaX = (i + 1) * bobaSpacing - cupSize / 2 +1.5 ;
      let bobaY = -10 - row * 10;
      p.ellipse(bobaX, bobaY, bobaSize, bobaSize);
      currentBoba++;
    }
  }

  p.stroke(0);
  p.strokeWeight(1);
  p.fill(255);
  p.rect(cupSize / 6, 0, 8, -strawSize);

  p.pop();
},  

  };

  latentSpaces.push(space);
})();
