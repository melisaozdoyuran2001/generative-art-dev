/* globals Vue, systems, Vector2D */

(function () {

  let space = {
    /*
     * A latent space is a way of turning n-dimensional points into art
     */
  
    // TODO: Make your own dimensions
    dimensions:["hue", "height", "width", "windowBrightness", "windowNum", "RoofSize", "doorHeight"],
    hide: false,
    name: "houses", // Lowercase only no spaces! (we reuse this for some Vue stuff)
    description: "some customizable houses",

    landmarks: [{
      name:"family home",
      dna: [0.77,0.17,0.94,0.86,0.42,0.91,1.00]
    }, {
      name:"small cottage",
      dna: [0.15,0.00,1.00,0.23,0.57,0.32,0.20],
    }, {
      name: "residence",
      dna: [0.00,1.00,0.17,0.71,0.95,0.00,1.00]
    },
               {
      name: "mansion",
      dna: [1.00,0.40,1.00,0.18,0.62,1.00,1.00]
    },
               {
      name: "tiny house",
      dna: [0.78,0.00,0.86,0.62,0.48,0.00,0.18]
    }],

    //==================================================================
    // POPULATION  AS A WHOLE

    setup({p, individuals, deltaTime, time}) {
      // Create initial population
      
    },

    draw({p, individuals, deltaTime, time}) {
      p.background("#03045e")
    },

   
    //==================================================================
    // INDIVIDUAL

    
    setupIndividual(individual, {p}) {
      // Setup an individual, 
      // if you need to initialize any variables for an individual
      // Note that their DNA may change after this, so only use it for non-DNA stuff

      // e.g, give each rectangle a position we can move around later (good for particles)
      // individual.position = new Vector2D()
      individual.position = new Vector2D(0,30)
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
  let hue = 0;

  let saturation = 0;
  let brightness = p.map(dim.hue, 0, 1, 20, 100);

  let height = p.map(dim.height, 0, 1, 50, 150);
  let width = p.map(dim.width, 0, 1, 60, 80);
  let windowBrightness = p.map(dim.windowBrightness, 0, 1, 25, 95);
  let windowNum = Math.floor(p.map(dim.windowNum, 0, 1, 1, 7));
  let roofSize = p.map(dim.RoofSize, 0, 1, 0, 30);
  let doorHeight = p.map(dim.doorHeight, 0, 1, 10, 20);


  p.fill(hue, saturation, brightness);
  p.rect(-width / 2, 0, width, -height);


  p.fill("#6c584c");
  p.triangle(-width / 2, -height, width / 2, -height, 0, -height - roofSize);

  p.fill("#7f5539");
  p.rect(-7, 0, 14, -doorHeight);
  p.fill(61, 100, windowBrightness);

 let maxWindowsPerRow = Math.floor(width / 20);
  let numRows = Math.ceil(windowNum / maxWindowsPerRow);
  let windowSpacing = width / (maxWindowsPerRow + 1);

  let currentWindow = 0;
  for (let row = 0; row < numRows; row++) {
    for (let i = 0; i < maxWindowsPerRow; i++) {
      if (currentWindow >= windowNum) {
        break;
      }
      let windowX = (i + 1) * windowSpacing - width / 2 - 5;
      let windowY = -height + 20 + row * 20;
      p.rect(windowX, windowY, 10, 10);
      currentWindow++;
    }
  }
  

  p.pop();
}
,  

  };

  latentSpaces.push(space);
})();
