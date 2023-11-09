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
		name: "fruitField", // Lowercase only no spaces! (we reuse this for some Vue stuff)
		description: "a bot that draws with you",
		chatControlsHeight: 100, // How big do your controls need to be?
		
		// custom display names if you want
		userDisplayName: "🧑🏻‍🌾",
		botDisplayName: "🤖",
		
		// Make your own grammar for this bot, use GPT to help, or watch a tutorial!
		grammar: new tracery.Grammar({
			// Yep, I got this from ChatGPT :-)
			// You should try writing your own, though!


	

		}),

		// For the drawing bot, we each get a color
		// What kind of data does your bot need?
		userColor: [320, 100, 50],
		botColor: [160, 100, 50],

		//=========================================================================================
		// events

		setup() {
			// TODO: does this bot need any setup?
			// Should it say something when it starts?

			// Setup this bot
			this.messages.push({
				text: "Tell me what fruit you want me to plant and grow! I can grow a strawberry🍓 ,an orange 🍊, a lemon 🍋, and a watermelon 🍉",
				from: "bot"
			})

			
			// Make fake messages to test it your grammar quickly
			// You can see here how to add a message to the message board
			// for (var i = 0; i < 10; i++) {
			// 	let text = this.grammar.flatten("#bots_turn#")
			// 	console.log(text)
			//   let msg = {
			//     text,
			//     from: "bot"
			//   }
			//   this.messages.push(msg)
			// }
		},

		// If you need more input data, add it here, and pass it in
		input({text,from, otherDataHere}) {
			/** 
			 * TODO: what happens when we get some input from the user?
			 * Consider "listen" "think" "speak"
			 * How long should the bot wait to respond?
			 * Maybe it can say some things fast, but needs more time for other things
			 **/

			//==============================================
			// LISTEN - What did the human do?

			// Add the human's message to our message list
			this.messages.push({
				text,
				from
			})

			console.log(`the bot got some input from the user: '${text}'`)

			


			//==============================================
			// THINK - What should the bot do now?
			//  this is a good time to pretend that you (the bot) are thinking deeply
			//  - even if you are faking it -- artificial intelligence is theater
			// Maybe you need a call to HuggingFace to decide what to do?
			
			
			
      let lastDrawnFruit = '';
      if(text){
        if (text.includes('strawberry')) {
          lastDrawnFruit = 'strawberry 🍓';
          let p = this.p;
        // Set the fill color for the strawberry body (red)
        p.fill(0, 100, 52); // RGB color for red
        //p.noStoke();
       
        let x = Math.random() * p.width;
        let y = Math.random() * p.height;
          
    
          p.drawingContext.shadowBlur = 10;
        

        
        p.triangle(x - 45, y - 40, x, y + 40, x + 45, y - 40);



       
        p.fill(130, 100, 44); 

        p.triangle(x - 20, y -30, x, y -60, x + 20, y -30); 

        
        p.fill(64, 100, 50); 
        for (let i = 0; i < 10; i++) { 
          let sx = x + p.random(-15, 15);
          let sy = y + p.random(-35, 20);
          p.circle(sx, sy, 2); 
        }

        }
        
        
        if (text.includes('orange')) {
          lastDrawnFruit = 'orange 🍊';
        let p = this.p;
        
        p.fill(35, 100, 50); 

        let x = Math.random() * p.width;
        let y = Math.random() * p.height;

        
      
        p.circle(x, y, 50); 
        p.fill(165, 42, 42); 
       
        p.rect(x - 5, y - 60, 10, 20); // A small rectangle for the stem
      }
        
        if (text.includes('lemon')) {
           lastDrawnFruit = 'lemon 🍋';
      let p = this.p;
      
      p.fill(64, 100, 50); 

      let x = Math.random() * p.width;
      let y = Math.random() * p.height;

      p.drawingContext.shadowBlur = 10;
      p.drawingContext.shadowColor = 'rgba(0, 0, 0, 0.5)';

      
      p.ellipse(x, y, 60, 40); 

     

      // Disable shadow for other drawings
      p.drawingContext.shadowBlur = 0;
    }
        
        if (text.includes('watermelon')) {
          lastDrawnFruit = 'watermelon 🍉';
        let p = this.p;
          
          p.fill(138, 100, 50); 
           let x = Math.random() * p.width;
           let y = Math.random() * p.height;
        
        p.arc(x, y, 85, 85, Math.PI, 0, p.OPEN); 
        
        p.fill(0, 100, 73); 


        p.arc(x, y, 80, 80, Math.PI, 0, p.CHORD); 

       
        p.fill(0, 0, 0); 
        for (let i = 0; i < 5; i++) { 
          let angle = p.random(Math.PI, 0); 
          let seedX = x + (40 * Math.cos(angle)); 
          let seedY = y - (40 * Math.sin(angle)); 
          p.ellipse(seedX, seedY, 5, 8); 
        }
      }

      if(lastDrawnFruit) {
        setTimeout(() => {
				this.messages.push({
				text: `Planting a ${lastDrawnFruit}...`,
				from: "bot"
			})
			})
      }
        else {
          setTimeout(() => {
				this.messages.push({
				text: `i don't have any of those. I just have strawberry, lemon, orange and watermelon`,
				from: "bot"
			})
			})
        }
      
      
      }
      else {
        setTimeout(() => {
				this.messages.push({
				text: "Please input a fruit  😁",
				from: "bot"
			})
			})
      }
     
			

			//==============================================
			// SPEAK - What should the bot do now?
			//  this is a good time to pretend that you (the bot) are thinking deeply
			//  - even if you are faking it -- artificial intelligence is theater
			
			 // Think a bit longer, then post a message
			let timeForBotToSpeak = timeForBotToAppreciate + 1000
			setTimeout(() => {
				let botText = this.grammar.flatten("#bots_turn#")
			
			// Need more control? You can add HTML to your messages too
			// 	let color = this.botColor
			// 	let inlineStyle = `
			// 		background-color: hsl(${color[0]}, ${color[1]}%, ${color[2]}%);
			// 		width: 20px;
			// 		height: 20px;
			// 		border-radius: 10px;
			// 		display:inline-block;
			// 	`
			// botText = botText + `<div style=${inlineStyle} />`
				this.messages.push({
				text: botText,
				from: "bot"
			})
	
			}, timeForBotToSpeak)

			// Think a bit, then draw
			let timeForBotToDraw = timeForBotToSpeak + 1000
			setTimeout(() => {
				// the bot draws something
				p.fill(...this.botColor)
				p.circle(Math.random()*p.width, Math.random()*p.height, 30)
			}, timeForBotToSpeak)
		}
	};

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
