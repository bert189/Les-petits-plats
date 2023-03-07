// imports

import { getAPI } from "./api/api.js";
import { renderRecipeCard } from "./components/renderRecipeCard.js";
import { truncateText } from "./utils/truncate.js";
import { dropdownDisplay } from "./utils/dropdownDisplay.js";
import { renderDropdown } from "./components/renderDropdown.js";


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
	}, []).sort();

	const appliances = recipes.reduce((acc, recipe) => {		
		if (!acc.includes(recipe.appliance)) {
			acc.push(recipe.appliance);
		}
		return acc;
	}, []).sort();

	const ustensils = recipes.reduce((acc, recipe) => {
		recipe.ustensils.forEach(ustensil => {
			if (!acc.includes(ustensil)) {
				acc.push(ustensil);
			}
		});
		return acc;
	}, []).sort();
	
	// affichage tags dropdowns
	const specificsWrapper = document.querySelector(".specifics-wrapper");

	specificsWrapper.innerHTML += renderDropdown("Ingrédients", "ingredients", "Rechercher un ingredient", "#3282F7", ingredients);
	specificsWrapper.innerHTML += renderDropdown("Appareils", "appliances", "Rechercher un appareil", "#5dc292", appliances);
	specificsWrapper.innerHTML += renderDropdown("Ustensiles", "ustensils", "Rechercher un ustensile", "#ED6454", ustensils);
	

	// affichage recettes 
	recipes.forEach(function(recipe) {
		main.innerHTML += renderRecipeCard(recipe);
	})

	const descriptions = main.querySelectorAll(".description");

	descriptions.forEach(function(description) {
		description.textContent = truncateText(description.textContent.trim(), 200);
	})

	// ouverture dropdowns
	dropdownDisplay();

	// fonction recherche
	


    
}

init();