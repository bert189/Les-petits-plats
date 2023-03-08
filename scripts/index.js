// imports

import { getAPI } from "./api/api.js";
import { renderRecipeCard } from "./components/renderRecipeCard.js";
import { renderDropdown } from "./components/renderDropdown.js";
import { compareStringsFrench } from "./utils/frenchSort.js";
import { truncateText } from "./utils/truncate.js";
import { dropdownBehaviour } from "./behaviours/dropdownBehaviour.js";
import { tagBehaviour } from "./behaviours/tagBehaviour.js"; 


//  url API

const api_url = "datas/recipes.json";


// DOM variables

const main = document.querySelector("main");


// init() s'execute au chargement de la page :

async function init() {
	
	// récupération data API
	const recipes = await getAPI(api_url);
	
	// création des array ingredients + appliances + ustensils

	const ingredients = recipes.reduce((acc, recipe) => {
		recipe.ingredients.forEach(ingredient => {
			if (!acc.includes(ingredient.ingredient)) {
				acc.push(ingredient.ingredient);
			}
		})
		return acc;
	}, []).sort(compareStringsFrench);

	const appliances = recipes.reduce((acc, recipe) => {		
		if (!acc.includes(recipe.appliance)) {
			acc.push(recipe.appliance);
		}
		return acc;
	}, []).sort(compareStringsFrench);

	const ustensils = recipes.reduce((acc, recipe) => {
		recipe.ustensils.forEach(ustensil => {
			if (!acc.includes(ustensil)) {
				acc.push(ustensil);
			}
		});
		return acc;
	}, []).sort(compareStringsFrench);

	const timesIntegers = recipes.reduce((acc, recipe) => {
		if (!acc.includes(recipe.time)) {
			acc.push(recipe.time);
		}
		return acc;
	}, []).sort((a, b) => a - b);
	const times = timesIntegers.map(int => `${int.toString()} min`);

	
	// création des dropdowns
	const specificsWrapper = document.querySelector(".specifics-wrapper");

	specificsWrapper.innerHTML += renderDropdown("Ingrédients", "ingredients", "#3282F7", "ingredient", "5", ingredients);
	specificsWrapper.innerHTML += renderDropdown("Appareils", "appliances", "#5dc292", "appareil", "5", appliances);
	specificsWrapper.innerHTML += renderDropdown("Ustensiles", "ustensils", "#ED6454", "ustensile", "5", ustensils);
	specificsWrapper.innerHTML += renderDropdown("Temps", "time", "#b075bd", "temps", "5", times);
	

	// affichage recettes 
	recipes.forEach(function(recipe) {
		main.innerHTML += renderRecipeCard(recipe);
	})

	const descriptions = main.querySelectorAll(".description");

	descriptions.forEach(function(description) {
		description.textContent = truncateText(description.textContent.trim(), 200);
	})

	// ouverture/fermeture/affichage dropdowns
	dropdownBehaviour();

	// recherche et selection des tags
	tagBehaviour();

	// fonction recherche
	


    
}

init();