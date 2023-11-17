/* globals Vue, p5 */

// By ChatGPT
const pokemonTypes = {
  normal: {
    emoji: "😀",
    color: [0, 100, 50, 1],
  },
  fire: {
    emoji: "🔥",
    color: [15, 100, 50, 1],
  },
  water: {
    emoji: "💧",
    color: [210, 100, 50, 1],
  },
  electric: {
    emoji: "⚡",
    color: [60, 100, 50, 1],
  },
  grass: {
    emoji: "🌿",
    color: [120, 100, 50, 1],
  },
  ice: {
    emoji: "❄️",
    color: [180, 100, 50, 1],
  },
  fighting: {
    emoji: "🥊",
    color: [0, 100, 50, 1],
  },
  poison: {
    emoji: "☠️",
    color: [300, 100, 50, 1],
  },
  ground: {
    emoji: "🏜️",
    color: [30, 100, 50, 1],
  },
  flying: {
    emoji: "🦅",
    color: [210, 100, 50, 1],
  },
  psychic: {
    emoji: "🔮",
    color: [270, 100, 50, 1],
  },
  bug: {
    emoji: "🐛",
    color: [90, 100, 50, 1],
  },
  rock: {
    emoji: "🪨",
    color: [30, 100, 50, 1],
  },
  ghost: {
    emoji: "👻",
    color: [270, 100, 50, 1],
  },
  steel: {
    emoji: "🛡️",
    color: [210, 100, 50, 1],
  },
  dragon: {
    emoji: "🐉",
    color: [270, 100, 50, 1],
  },
  dark: {
    emoji: "🌑",
    color: [0, 100, 50, 1],
  },
  fairy: {
    emoji: "🧚",
    color: [330, 100, 50, 1],
  },
};

// A reusable component for pokemon names in a little div
Vue.component("pokemon-chip", {
  template: `<div  class="pokemon-chip" :style="style">
      {{poke.name}}
      {{pokeEmoji}}
    </div>`,

  computed: {
    pokeEmoji() {
      return this.poke.types.map((type) => pokemonTypes[type].emoji).join("");
    },
    style() {
      return {
        color: "blue",
      };
    },
  },

  props: ["poke"],
});

// Component for the pokemon essay
Vue.component("essay-pokemon", {
  template: `	
    <article>
      <section v-if="true">
        <h1>Pokemon Types</h1>
      </section>
      
      <!-- SECTION #1: one section just listing all the pokemon -->
      <section v-if="true">
        <div class="viz">
             <pokemon-chip  v-for="p in pokemon" :poke="p" />
             
        </div>
        <p>There sure are a lot of pokemon.  There are 718 in the first generation</p>
      </section>
      
      
      <!-- SECTION#2 A bar graph of each type -->
      <section v-if="true">
        <div class="viz">
          <div v-for="(pokes, type) in pokemonByType">
          {{type}}:{{pokemonTypes[type].emoji.repeat(pokes.length)}}
          </div>
           
        </div>
        
        <p>There are 18 different types of pokemon: <span v-for="type,name in pokemonTypes">{{name}}({{type.emoji}}), </span> but how many of each are there?</p>
        
        <p>Electric, ice, and poison don't have many represented.  Compare that to water and normal types!</p>
      </section>
      
       
      <!-- SECTION#3 A bar graph of each type -->
      <section>
        <div class="viz">
          <h4>{{selectedType}}</h4>
          <div v-for="(pokes, type) in pokemonByTypeWithSelectedType" v-if="selectedType !== type">
          {{type}}:{{pokemonTypes[type].emoji.repeat(pokes.length)}}
          </div>
        
        </div> 
        
        <p>
          <button v-for="(type,name) in pokemonTypes" @click="selectedType=name">{{name}}</button>
        </p>
        <p>
          Look at each type. Which ones have the most shared types?  Normal and flying go together, so do grass and poison. Can you spot any that are missing? (🔥🧚‍♀️)
        </p>
      </section>
    </article>`,

  computed: {
    pokemonByType() {
      // Make a dict of each pokemon by type
      let byType = {};
      this.pokemon.forEach((p) => {
        p.types.forEach((type) => {
          if (byType[type] == undefined) byType[type] = [];
          byType[type].push(p);
        });
      });
      return byType;
    },
    pokemonByTypeWithSelectedType() {
      console.log("Search by type", this.selectedType);
      // Make a dict of each pokemon by type, but only ones with the current type
      let byType = {};
      let pokesToSearch = this.pokemonByType[this.selectedType] || [];
      pokesToSearch.forEach((p) => {
        p.types.forEach((type) => {
          if (byType[type] == undefined) byType[type] = [];
          byType[type].push(p);
        });
      });
      return byType;
    },
  },

  data() {
    // LOAD SOME LOCAL JSON DATA
    // Fetch the JSON data from the URL
    var pokemonURL = "data/pokemon-v1.json";
    fetch(pokemonURL)
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        // Now 'data' is a JavaScript object containing the parsed JSON data
        console.log(data);
        // THIS RUNS AFTER THE DATA FUNCTION ENDS SO I CANT PASS STUFF BACK
        // I have pokemon data now, I'm adding it to the list
        this.pokemon = data;
      })
      .catch((error) => {
        console.error("Error loading JSON data:", error);
      });

    return {
      selectedType: "normal",
      pokemon: [],
    };
  },
});
