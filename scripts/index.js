// imports

import { getAPI } from "./api/api.js";
import { renderRecipeCard } from "./utils/recipeCard.js";
import { truncateText } from "./utils/truncate.js";


//  url API

const api_url = "datas/recipes.json";


// DOM variables

const main = document.querySelector("main");


// init() s'execute au chargement de la page :

async function init() {
	
	// récupération data API
	const recipes = await getAPI(api_url);
	
	// création des array ingredients + appliances + ustensils

	
	// affichage tags dropdowns


	// affichage recettes 
	recipes.forEach(function(recipe) {
		main.innerHTML += renderRecipeCard(recipe);
	})

	const descriptions = main.querySelectorAll(".description");
	const descriptionsArray = Array.from(descriptions);

	descriptionsArray.forEach(function(description) {
		const descriptionText = description.textContent.trim();
		console.log(descriptionText)
		const descriptionTruncated = truncateText(descriptionText, 200);
		description.textContent = descriptionTruncated;
	})

	// ouverture dropdowns


	// fonction recherche
	


    
}

init();