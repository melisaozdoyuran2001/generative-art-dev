/* globals Vue, p5 */

Vue.component("art", {
  template: `<div class="art" :style="barStyle">
               {{ art.age }}
               
             </div>`,
 computed: {
  barStyle() {
    let backgroundColor = this.art.gender === 'M' ? '#ADD8E6' : '#FFC0CB';
   
    return {
      height: '20px',
      width: this.art.age * 5 + 'px',
      backgroundColor: backgroundColor,
      color: 'white',
      textAlign: 'center',
    };
  },
},
props: ["art"],
});

Vue.component("finalworth", {
  template: `
    <div class="final-worth" :style="{ color: industryColor(billionaire.industries) }">
      {{ billionaire.personName }} : {{ billionaire.industries }}
    </div>
  `,
  props: ["billionaire"],
  data() {
    return {
      industryColors: {
        'Technology': '#0000FF', // Blue
        'Fashion & Retail': '#FF0000', // Red
        'Finance & Investments': '#008000', // Green
        'Automotive': '#FFA500', // Orange
      'Media & Entertainment': '#800080', // Purple
      'Telecom': '#00FFFF', // Cyan
      'Diversified': '#808080', // Grey
      'Food & Beverage': '#FFFF00', // Yellow
      'Logistics': '#8B4513', // Saddle Brown
      'Gambling & Casinos': '#FFC0CB', // Light Pink
      'Manufacturing': '#A52A2A', // Brown
      'Metals & Mining': '#B8860B', // Dark Golden Rod
      'Healthcare': '#3CB371', // Medium Sea Green
      'Real Estate': '#FFDEAD', // Navajo White
      'Energy': '#DC143C', // Crimson
      'Construction & Engineering': '#DAA520', // Golden Rod
      'Sports': '#000080', // Navy Blue
      'Service': '#2E8B57', // Sea Green
      },
    };
  },
  methods: {
    industryColor(industry) {
      return this.industryColors[industry] || '#000000'; // Default to black if industry not found
    },
  },
});





Vue.component("essay-artinstitute", {
  template: `	
    <article>
      <!-- title section -->      
      <section v-if="true" id="title">
        <h1>World's Billionaires</h1>
     
      </section> 
      
    <section v-if="true">
        <!-- 1ST INTRO PARAGRAPH -->
         <p>Imagine a gallery where instead of art, the walls are adorned with tales of wealth and success. This visualization brings to life the elusive realm of billionaires, a world often shrouded in mystery and allure. </p>
        <p> The first section of our exhibit unveils a unique bar chart, not of numbers, but of ages. Each bar, glowing in a serene shade of blue and pink, represents the age and gender of a billionaire, its length proportional to their years. If you press on the button below, you can see the list visualization.  This simple yet powerful visualization tells a story of time — the time taken to build empires, to innovate, and to influence. It's a reminder that age is not just a number but a tapestry of experiences, decisions, and milestones. </p>
  
        <!-- Bar Chart Visualization -->
        <div v-if="!showListInsteadOfBar" class="viz">
          <art v-for="billionaire in filteredBillionaires" :art="billionaire" :key="billionaire.rank" />
        </div>

        <!-- List Visualization -->
        <ul v-else class = "viz">
          <li v-for="billionaire in filteredBillionaires" :key="billionaire.rank">
            {{ billionaire.personName }} - Age: {{ billionaire.age }}
          </li>
        </ul>
         <button @click="showListInsteadOfBar = !showListInsteadOfBar">Chart / List</button>
</section>

    
      
      <!-- SECTION2 --> 
 
      <section v-if="true">
             <p>As we move to the second section, the narrative shifts from the personal journey of billionaires to their professional realms. Here, names are not just labels but symbols of legacies, each accompanied by the industry that made their fortune. This visualization is akin to a map, each name a city, each industry a country. The diversity of industries — from technology to retail, from finance to pharmaceuticals — reflects the vastness of the entrepreneurial spirit. This section doesn't just show who these billionaires are; it reveals the sectors that shape our world, highlighting the varied paths to monumental success.</p>
              <div class="viz">
      <div class="billionaire-grid">
        <finalworth v-for="billionaire in billionaires" :billionaire="billionaire" :key="billionaire.rank" class="billionaire-item" />
      </div>
    </div>
              
              
            </section>

      
      <!-- SECTION3 --> 
      
      <section v-if="true">
    <p>The final part of our exhibit invites interaction. Clicking on a name transforms it from a mere label into a portal, offering a glimpse into the life of each billionaire. This interactive element is like opening a book to discover a story. You learn about their net worth, their origins, their triumphs, and their tools of trade. This section provides context to the names and numbers, adding depth to our understanding of what it takes to join the ranks of the ultra-wealthy. It's a reminder that behind every fortune lies a unique story, a combination of ambition, opportunity, and perhaps a touch of serendipity.</p>
    <div class="viz">
      <div v-for="billionaire in filteredBillionaires" :key="billionaire.rank">
        <p @click="toggleDetails(billionaire.rank)" class = "b-name">
    {{billionaire.personName }}
          <span v-if="expandedBillionaire === billionaire.rank"> (Click to Hide Details)</span>
          
        </p>
        <div  v-if="expandedBillionaire === billionaire.rank" class= "infoss">
          <!-- Additional details here -->
          <p>Net Worth: {{ billionaire.finalWorth }} million USD</p>
          <p>Age: {{ billionaire.age }}</p>
          <p>Country: {{ billionaire.country }}</p>
          <p>City: {{ billionaire.city }}</p>
          <p>Source of Wealth: {{ billionaire.source }}</p>
          <p>Industry: {{ billionaire.industries }}</p>
          <p>Self-Made: {{ billionaire.selfMade }}</p>
          <p>Status: {{ billionaire.status }}</p>
          <p>Gender: {{ billionaire.gender }}</p>
          <!-- Add more details as needed -->
        </div>
        
       
      </div>

    </div>
     <button >CLICK ON THE NAME TO VIEW DETAILS</button>
  </section>
  
  <section v-if="true">
  <p> Together, these three visualizations offer a panoramic view of the world of billionaires. From the quiet narrative of age in the bar chart to the loud declaration of industries, and finally, to the intimate details of individual lives, the exhibit connects the dots in the story of wealth and success. It's a journey through time, industry, and personal triumphs, painting a vivid picture of what it means to be a billionaire in the modern world.</p>
  </section>      
      
    </article>
    `,

  
  computed: {
  
     filteredBillionaires() {
    let filtered = this.billionaires.filter(b => 
      b.age === parseInt(this.inputAge)
    );
    return filtered.slice(0, 9); // Get only the first 9 elements
  },

    
    
  },
  

 methods: {
  fetchBillionairesData() {
    let dataURL = 'data/csvjson.json'; // Path to your JSON file
    fetch(dataURL)
      .then(response => response.json())
      .then(data => {
        this.billionaires = data;
        this.filteredBillionaires = this.billionaires; 
       
        this.uniqueStates = [...new Set(data.map(b => b.state))]; // Populate unique states
      })
      .catch(error => console.error('Error:', error));
  },
   
   applyGenderFilter(gender) {
      if (gender != "all") {
        this.filteredBillionaires = this.billionaires.filter(b => b.gender === gender);
      } else {
        this.filteredBillionaires = this.billionaires; // Reset to all billionaires if no gender is specified
      }
    },
   toggleDetails(rank) {
      if (this.expandedBillionaire === rank) {
        this.expandedBillionaire = null; // Collapse if it's already expanded
      } else {
        this.expandedBillionaire = rank; // Expand the clicked billionaire's details
      }
    },
   
   applyAgeFilter() {
    if (this.inputAge) {
      this.filteredBillionaires = this.billionaires.filter(b => b.age === parseInt(this.inputAge));
    } else {
      this.filteredBillionaires = this.billionaires; // Reset to all billionaires if no age is entered
    }
  },
   
  
},
  mounted() {
  this.fetchBillionairesData();
    this.filteredBillionaires = this.billionaires;
},

 
  data() {
    return {
      timespan: {
        start:1900,
        end: 2020,
        width: 400,
      },
      genderFilter: '',
      
      allArt: [],
      currentArt: {},
      billionaires: [],
      filteredBillionaires: [],
      expandedBillionaire: null,
     
       showListInsteadOfBar: false,
     
      
    
    };
    
  },
});
