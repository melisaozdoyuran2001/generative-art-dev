/* globals Vue, systems, Vector2D, tracery */

(function () {

	let bot = {
		/*
		 * A bot that can listen, think and speak
		 */

		// Start with no messages
		messages: [],
		
		//=========================================================================================
		// TODO: custom data
		
		hide: false,
		name: "spacedrawbot", // Lowercase only no spaces! (we reuse this for some Vue stuff)
		description: "a bot that adds stars to a virtual space",
		chatControlsHeight: 100, // How big do your controls need to be?
		
		// custom display names if you want
		userDisplayName: "🪐",
		botDisplayName: "🌟",
    
          
    moods: {
     neutral: {
      starColor: [64, 100, 50], 
      numStars: 8 
    },
    happy: {
      starColor: [276, 100, 76], 
      numStars: 10 
    },
    sad: {
      starColor: [240, 100, 50], // A blue color for a sad mood
      numStars: 3 // Fewer stars for a sad mood
    },
      
    bored: {
      starColor: [141, 57, 48], // A green color for a bored mood
      numStars: 1 
    },
      
     excited: {
      starColor: [328, 100, 78], // A pink color for an excited mood
      numStars: 6 
    },
  },

 
  currentMood: 'neutral', 


  // Method to change the bot's mood
  changeMood(newMood) {
    if (this.moods[newMood]) {
      this.currentMood = newMood;
     
      this.botColor = this.moods[newMood].starColor;
     
      this.messages.push({
        text: `I'm feeling ${newMood} now.`,
        from: "bot"
      });
    }
  },
		
		// Make your own grammar for this bot, use GPT to help, or watch a tutorial!
		grammar: new tracery.Grammar({
			// Yep, I got this from ChatGPT :-)
			// You should try writing your own, though!

      
  "celestial_bodies": ["#planet#", "#star#", "#nebula#", "#asteroid#", "#comet#", "#moon#"],
  "star_qualities": ["twinkling", "distant", "radiant", "pulsating", "flickering", "constant", "dim", "bright", "shooting", "glowing"],
  "verb_star": ["scatter", "place", "dot", "strew", "embed", "arrange", "sprinkle", "cast", "float", "suspend"],
  "space_verb": ["expand", "envelop", "embrace", "fill", "surround", "engulf", "blanket", "cloak", "swathe", "encase"],
  "star_verb_phrase": ["#verb_star# #star_qualities.a# stars", "#space_verb# the cosmos with #star_qualities# stars"],
  "planet_description": ["#color# planet", "#texture# planet", "planet with #atmosphere_description#"],
  "atmosphere_description": ["a thick #color# atmosphere", "swirling #texture# clouds", "an #adj# aurora"],
  
  "bot_actions": [
    "I will #verb_star# stars around the #planet_description#.",
    "Let's #space_verb# this void with #star_qualities# stars.",
    "I am programmed to #star_verb_phrase#."
  ],

  "appreciate_space": [
    "This sector is becoming #adj# with the addition of new stars.",
    "The #celestial_bodies# seem more #adj# now.",
    "Observing the #star_qualities# stars emerge is truly #adj#."
  ],

  "space_description": [
    "A galaxy of #color# hues",
    "The #texture# of the cosmic fabric",
    "The #light# that dances across the void",
    "A symphony of #star_qualities# lights",
    "An expanse that tells a #metaphor# of creation"
  ],

  "space_activity": [
    "#verb# a #metaphor# across the heavens",
    "#verb# the universe with #celestial_bodies# and #star_qualities# stars",
    "Bringing the #texture# of the #forms# to life with stars"
  ],

  "color": ["azure", "crimson", "emerald", "sapphire", "golden", "silvery", "pearlescent", "amethyst", "onyx", "rosy"],
  "texture": ["cloudy", "smooth", "rugged", "silken", "granular", "gaseous", "translucent", "opaque", "glimmering", "matte"],
  "light": ["glimmering", "soft", "harsh", "reflective", "diffuse", "brilliant", "gentle", "faded", "muted", "iridescent"],
  "shape": ["spherical", "elliptical", "irregular", "smooth", "cratered", "ringed", "spiral", "lobed", "twisted", "disk-shaped"],
  "planet": ["world", "realm", "sphere", "orbit", "body", "entity", "habitat", "dominion", "province", "territory"],
  "star": ["sun", "beacon", "point of light", "celestial spark", "stellar flame", "cosmic lantern", "galactic light", "astral body", "sky jewel", "space diamond"],
  "nebula": ["mist", "cloud", "expanse", "formation", "veil", "mass", "swirl", "whorl", "billow", "bloom"],
  "asteroid": ["fragment", "rock", "boulder", "clump", "chunk", "piece", "body", "spire", "shard", "remnant"],
  "comet": ["wanderer", "traveler", "visitor", "voyager",, "shooting star", "trailblazer", "harbinger", "spectacle"],
  "moon": ["satellite", "companion", "follower", "observer", "spectator", "watcher", "guardian", "protector", "attendant", "witness"],
      
  "adj": ["#color#", "#light#", "#shape#", "#texture#"],
      

}),

		// For the drawing bot, we each get a color
		// What kind of data does your bot need?
		userColor: [35, 72, 58],
		botColor: [64, 100, 50],

		//=========================================================================================
		// events

		setup() {
  // Initial bot message when it starts
  this.messages.push({
    text: "Let's draw the space! 🚀 I'll add stars around your planets depending on my mood, My mood can be happy, sad, neutral, bored or excited. It's up to you and what you have to say to me on the chat!", 
    from: "bot"
  })
},

input({text, from, otherDataHere}) {
  // Add the user's message to our message list
  this.messages.push({
    text,
    from
  })

  console.log(`the bot got some input from the user: '${text}'`)
  if(text) {
     if (text.includes("happy")) {
      this.changeMood('happy');
    } else if (text.includes("sad")) {
      this.changeMood('sad');
    }else if (text.includes("bored")) {
      this.changeMood('bored');
    }else if (text.includes("excited")) {
      this.changeMood('excited');
  }
 
    }
  else {
    this.changeMood('neutral');
  }
  

// The user draws a planet
 let p = this.p;
p.fill(...this.userColor);
let x = Math.random() * p.width;
let y = Math.random() * p.height;
let size = 30; // The size of the planet

// Create a radial gradient to give the planet a more spherical appearance
let gradient = p.drawingContext.createRadialGradient(x, y, size * 0.1, x, y, size);
gradient.addColorStop(0, p.color(...this.userColor));
// Darken the color by reducing the lightness for the outer part of the gradient
let outerColor = p.color(...this.userColor);
outerColor.setAlpha(0.5); // Set transparency to make the edge softer
gradient.addColorStop(1, outerColor);

// Apply the gradient and draw the planet
p.drawingContext.fillStyle = gradient;
p.ellipse(x, y, size, size);


if (Math.random() < 0.25) {
  p.noFill();
 
  let ringColor = p.color(...this.userColor).levels.map((c, i) => i < 3 ? c * 0.8 : c);
  p.stroke(ringColor);
  p.strokeWeight(2);
  let ringSize = size * 1.5; 
  p.ellipse(x, y, ringSize, ringSize * 0.3); 
  p.noStroke(); 
}


  // Bot shows appreciation for the user's drawing
  let appreciationText = this.grammar.flatten("#appreciate_space#")
  let timeForBotToAppreciate = 1000
  setTimeout(() => {
    this.messages.push({
      text: appreciationText,
      from: "bot"
    })
  }, timeForBotToAppreciate)

  // Bot's turn to add stars
  let botText = this.grammar.flatten("#bot_actions#")
  let timeForBotToSpeak = timeForBotToAppreciate + 1000
  setTimeout(() => {
    this.messages.push({
      text: botText,
      from: "bot"
    })
  }, timeForBotToSpeak)

  // Bot draws stars after a delay
  let timeForBotToDraw = timeForBotToSpeak + 1000
  setTimeout(() => {
    // Bot draws stars
    p.fill(...this.botColor)
    let mood = this.moods[this.currentMood];
    p.fill(...mood.starColor);
    for (let i = 0; i < mood.numStars; i++) {
      drawStar(p, p.random(p.width), p.random(p.height), 5, 10, 5);
    }
  }, timeForBotToDraw)
}

	};
  
  function drawStar(p, x, y, radius1, radius2, npoints) {
  let angle = p.TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  p.beginShape();
  for (let a = 0; a < p.TWO_PI; a += angle) {
    let sx = x + p.cos(a) * radius2;
    let sy = y + p.sin(a) * radius2;
    p.vertex(sx, sy);
    sx = x + p.cos(a + halfAngle) * radius1;
    sy = y + p.sin(a + halfAngle) * radius1;
    p.vertex(sx, sy);
  }
  p.endShape(p.CLOSE);
}

	//============================================================
	/** 
	 * TODO: A panel to the right of the chat
	 * Could be for p5, drawing, displaying images, a game board, etc, 
	 * or leave it blank
	 **/

	const WIDTH = 600;
	const HEIGHT = 400;

	Vue.component(`panel-${bot.name}`, {
		template: `<div ref="p5"></div>`,

		mounted() {
			// CREATE A PROCESSING INSTANCE IN THE PANEL
			new p5(p => {
				// We have a new "p" object representing the sketch
				
				// Save p to the bot
				this.bot.p = p

			 
				p.setup = () => {
					p.createCanvas(WIDTH,HEIGHT)
					p.colorMode(p.HSL)
					p.ellipseMode(p.RADIUS)
				}
        
        p.mouseReleased = () => {
          console.log("Click")
          this.bot.input({text:this.inputText, from: "user"})
				
        }

				p.draw = () => {}


			}, this.$refs.p5)
		},

		props: {"bot":{required:true, type:Object}} // We need to have bot

	})

	//============================================================
	/** 
	 * Input controls for this bot.
	 * Do we just need a chat input? Do we need anything else?
	 * What about game controls, useful buttons, sliders?
	 **/

	Vue.component(`input-${bot.name}`, {

		// Custom inputs for this bot
		template: `<div>
			<!-- Basic chat control, press enter or the button to input -->
			<input @keyup.enter="sendText" v-model="inputText" />
			<button @click="sendText">send</button>

			<div>
				bot color:<color-picker v-model="bot.botColor" />
				human color:<color-picker v-model="bot.userColor" />
			</div>
		</div>`,

		methods: {
			sendText() {
				// Send the current text to the bot
				this.bot.input({text:this.inputText, from: "user"})
				// Then clear it
				this.inputText = ""
			}
		},

		// Custom data for these controls
		data() {
			return {
				inputText: "",
			}
		},
		props: {"bot":{required:true, type:Object}} // We need to have bot
	})

	bots.push(bot);
})();
