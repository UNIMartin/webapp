"use strict";

// =========== Product functionality =========== //
/*
global variables (Casper)
*/
let _frugter = [];
let _smoothies = [];
let _selectedFrugtId;
let _selectedSmoothieId;

/*
Fetches json data from the file frugter.json (Casper)
*/
async function fetchData() {
  const response = await fetch('json/frugter.json');
  const data = await response.json();
  _frugter = data;
  console.log(_frugter);
  appendFrugter(_frugter);
}

fetchData();

/*
Append frugter i DOM (Casper)
*/
function appendFrugter(frugter) {
  let htmlTemplate = "";
  for (let frugt of frugter) {
    htmlTemplate += /*html*/`
        <article onclick="showDetailView(${frugt.id})">
          <img src="${frugt.img}">
          <h2>${frugt.navn}</h2>
        </article>
    `;
  }
  document.querySelector('#frugter-container').innerHTML = htmlTemplate;
}

/*
Søgefunktion på frugter (Martin)
*/
function search(value) {
	
	let filteredFrugter = [];
	
  let searchQuery = value.toLowerCase();
  let filteredProducts = [];
  for (let frugt of _frugter) {
    let navn = frugt.navn.toLowerCase();
    if (navn.includes(searchQuery)) {
      filteredFrugter.push(frugt);
    }
  }
  appendFrugter(filteredFrugter);
}


/*
Detail view på frugter (Martin)
*/
function showDetailView(id) {
  const frugtToShow = _frugter.find(frugt => frugt.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view-container").innerHTML = /*html*/`
    <article>
		<img src="${frugtToShow.gif}">
		<h3>1 servering</h3>
		<h3>${frugtToShow.navn} (${frugtToShow.servering})</h3><br>
		<p>
  			<span style="float: left"><b>Samlet kalorietal:</b></span>
  			<span style="float: right">${frugtToShow.kalorier}</span><br>
		</p>
		<p>
  			<span style="float: left"><b>Samlet kulhydrater:</b></span>
  			<span style="float: right">${frugtToShow.kulhydrater}</span><br>
		</p>
		<p>
  			<span style="float: left"><b>--- heraf sukker:</b></span>
  			<span style="float: right">${frugtToShow.sukker}</span><br><br>
		</p>
		<p>
  			<span style="float: left"><b>Protein:</b></span>
  			<span style="float: right">${frugtToShow.protein}</span><br><br>
		</p>
		<p>
  			<span style="float: right"><i>% af dagligt indtag</i></span><br>
		</p>
		<p>
  			<span style="float: left"><b>Vitamin A:</b></span>
  			<span style="float: right">${frugtToShow.vitaminA}</span><br>
		</p>
		<p>
  			<span style="float: left"><b>Vitamin B6:</b></span>
  			<span style="float: right">${frugtToShow.vitaminB6}</span><br>
		</p>
		<p>
  			<span style="float: left"><b>Vitamin C:</b></span>
  			<span style="float: right">${frugtToShow.vitaminC}</span><br>
		</p>
		<p>
  			<span style="float: left"><b>Vitamin E:</b></span>
  			<span style="float: right">${frugtToShow.vitaminE}</span><br>
		</p>
    </article>
  `;
}

/*
Fetches json data from the file smoothies.json (Casper)
*/
async function fetchSmoothiesData() {
  const response = await fetch('json/smoothies.json');
  const smoothiesData = await response.json();
  _smoothies = smoothiesData;
  console.log(_smoothies);
  appendSmoothies(_smoothies);
}

fetchSmoothiesData();

/*
Append smoothies i DOM (Casper)
*/
function appendSmoothies(smoothies) {
  let htmlTemplate = "";
  for (let smoothie of smoothies) {
    htmlTemplate += /*html*/`
        <article onclick="showSmoothieDetailView(${smoothie.id})">
          <img src="${smoothie.img}"><br>
			<img style="width: 45px;" src="${smoothie.frugt1img}">
			<img style="width: 45px;" src="${smoothie.frugt2img}">
			<img style="width: 45px;" src="${smoothie.frugt3img}">
          <h2>${smoothie.navn}</h2>
        </article>
    `;
  }
  document.querySelector('#smoothies-container').innerHTML = htmlTemplate;
}

/*
Detail view på smoothies (Martin)
*/
function showSmoothieDetailView(id) {
  const smoothieToShow = _smoothies.find(smoothie => smoothie.id === id);
  navigateTo("smoothie-detail-view");
  document.querySelector("#smoothie-detail-view-container").innerHTML = /*html*/`
    <article>
		<img src="${smoothieToShow.img}">
		<h3>${smoothieToShow.navn}</h3><br>
		<p>
  			<b>Smag:</b><br>
			${smoothieToShow.smag1}, ${smoothieToShow.smag2} og ${smoothieToShow.smag3}<br><br>
		</p>
		<p>
  			<span style="float: left"><b>Frugter:</b></span><br>
		</p>
		<p>
  			<span style="float: right">1 servering af: ${smoothieToShow.frugt1navn}</span><br>
		</p>
		<p>
  			<span style="float: right">1 servering af: ${smoothieToShow.frugt2navn}</span><br>
		</p>
		<p>
  			<span style="float: right">1 servering af: ${smoothieToShow.frugt3navn}</span><br><br>
		</p>
		<p>
  			<span style="float: left"><b>Andre ingredienser:</b></span><br>
		</p>
		<p>
  			<span style="float: right">200ml valgfri mælk el. yoghurt</span><br>
		</p>
    </article>
  `;
}