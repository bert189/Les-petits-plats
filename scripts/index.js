// imports

import { getAPI } from "./api/api.js";
import { renderRecipeCard } from "./components/renderRecipeCard.js";
import { createDropdown } from "./components/createDropdown.js";
import { compareStringsFrench } from "./utils/frenchSort.js";
import { dropdownBehaviour } from "./behaviours/dropdownBehaviour.js";
import { filterRecipes } from "./businessLogic/filterRecipes.js";


//  url API

const api_url = "datas/recipes.json";


// DOM variables

const main = document.querySelector("main");


// création des array ingredients + appliances + ustensils + times
export function tagLists(recipes) {

	const ingredients = [];
	const appliences = [];
	const ustensils = [];
	const times = [];

	recipes.forEach( recipe => {

		recipe.ingredients.forEach(ingredient => {
			ingredients.push(ingredient.ingredient);
		});

		appliences.push(recipe.appliance);

		recipe.ustensils.forEach(ustensil => {
			ustensils.push(ustensil);
		});

		times.push(recipe.time);

	});

	return {
		"ingredients": new Set(ingredients.sort(compareStringsFrench)),
		"appliances": new Set(appliences.sort(compareStringsFrench)),
		"ustensils": new Set(ustensils.sort(compareStringsFrench)),
		"times": new Set(times.sort((a, b) => a - b).map(int => `${int.toString()} min`))
	};
}


// création d'un dropdown
export function renderDropdown(id, tagList) {

	const specificsWrapper = document.querySelector(".specifics-wrapper");
	
	// createDropdown(specificName, id, backgroundColor, placeholder, size, tagList, uniqueTagChoice)
	//                  "string"  "string"   "string"      "string"  "string" array    boolean

	switch(id) {
		case "ingredients":
			specificsWrapper.innerHTML += createDropdown("Ingrédients", id, "#3282F7", "ingredient", "5", tagList);
			break;
		case "appliances":
			specificsWrapper.innerHTML += createDropdown("Appareils", id, "#5dc292", "appareil", "5", tagList, true);
			break;
		case "ustensils":
			specificsWrapper.innerHTML += createDropdown("Ustensiles", id, "#ED6454", "ustensile", "5", tagList);
			break;
		case "times":
			specificsWrapper.innerHTML += createDropdown("Temps", id, "#b075bd", "temps", "5", tagList, true);
			break;
	}
}

// update de tous les dropdowns
export function renderAlldropdowns(recipes) {

	const specificsWrapper = document.querySelector(".specifics-wrapper");
	// vider le container à dropdown avant leur update par la fonction renderAll
	specificsWrapper.innerHTML = "";

	renderDropdown("ingredients", tagLists(recipes).ingredients);
	renderDropdown("appliances", tagLists(recipes).appliances);
	renderDropdown("ustensils", tagLists(recipes).ustensils);
	renderDropdown("times", tagLists(recipes).times);
}

// affichage des recettes
export function renderAllRecipes(recipes) {
		recipes.forEach(function(recipe) {
		main.innerHTML += renderRecipeCard(recipe);
	})
}


// init() s'execute au chargement de la page :

async function init() {
	
	// 1. récupération data API
	const recipes = await getAPI(api_url);
	
	// 2. création des array ingredients + appliances + ustensils + times	
	// 3. création des dropdowns	
	renderAlldropdowns(recipes);	

	// 4. affichage recettes 
	renderAllRecipes(recipes);

	// 5. ouverture/fermeture/affichage dropdowns (inclus la recherche et selection des tags)
	dropdownBehaviour();
	
	// 6. fonction recherche - filtrage des recettes
	filterRecipes(recipes);
    
}

init();
