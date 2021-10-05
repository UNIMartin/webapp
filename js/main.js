"use strict";

// =========== Product functionality =========== //
/*
global variables
*/
let _frugter = [];
let _selectedFrugtId;

/*
Fetches json data from the file frugter.json
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
Append frugter i DOM
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
Søgefunktion på frugter
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
Detail view på frugter
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