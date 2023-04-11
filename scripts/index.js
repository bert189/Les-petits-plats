// imports
import { getAPI } from "./api/api.js";
import { renderRecipeCard } from "./components/renderRecipeCard.js";
import { createDropdown } from "./components/createDropdown.js";
import { compareStringsFrench } from "./utils/frenchSort.js";
import { dropdownBehaviour } from "./behaviours/dropdownBehaviour.js";
import { searchEvent, addTagEvent } from "./businessLogic/filterRecipes.js";


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

	return { // Set()
		"ingredients": new Set(ingredients.sort(compareStringsFrench)),
		"appliances": new Set(appliences.sort(compareStringsFrench)),
		"ustensils": new Set(ustensils.sort(compareStringsFrench)),
		"times": new Set(times.sort((a, b) => a - b).map(int => `${int.toString()} min`))
	};
}


// création d'un dropdown
export function renderDropdown(id, tagList) {

	const specificsWrapper = document.querySelector(".specifics-wrapper");
	
	// createDropdown(specificName, id, backgroundColor, placeholder, size, tagList)
	//                  "string"  "string"   "string"     "string"  "string" array

	switch(id) {
		case "ingredients":
			specificsWrapper.innerHTML += createDropdown("Ingrédients", id, "#3282F7", "ingredient", "6", tagList);
			break;
		case "appliances":
			specificsWrapper.innerHTML += createDropdown("Appareils", id, "#5dc292", "appareil", "5", tagList);
			break;
		case "ustensils":
			specificsWrapper.innerHTML += createDropdown("Ustensiles", id, "#ED6454", "ustensile", "5", tagList);
			break;
		case "times":
			specificsWrapper.innerHTML += createDropdown("Temps", id, "#b075bd", "temps", "5", tagList);
			break;
	}
}

// update de tous les dropdowns
function renderAllDropdowns(recipes) {

	const specificsWrapper = document.querySelector(".specifics-wrapper");
	// vider le container à dropdown avant leur update par la fonction renderAll
	specificsWrapper.innerHTML = "";

	renderDropdown("ingredients", tagLists(recipes).ingredients);
	renderDropdown("appliances", tagLists(recipes).appliances);
	renderDropdown("ustensils", tagLists(recipes).ustensils);
	renderDropdown("times", tagLists(recipes).times);
	
	// ouverture/fermeture/affichage dropdowns (inclus la recherche et selection des tags)
	dropdownBehaviour();
}

// affichage des recettes
function renderAllRecipes(recipes) {
	// vider le container à recettes avant mise à jour
	main.innerHTML = "";
	if (recipes.length > 0) {
		recipes.forEach(function(recipe) {
		main.innerHTML += renderRecipeCard(recipe);
		})
	}
	else {
		main.innerHTML = '<div class="no-result">aucun résultat ne correspond à votre recherche</div>';
	}

}

export function renderAll(recipes) {
	renderAllDropdowns(recipes);
	renderAllRecipes(recipes);
}


// init() s'execute au chargement de la page :

async function init(allRecipes) {
	
	// création des array ingredients + appliances + ustensils + times	
	// affichage recettes + création des dropdowns
	renderAll(allRecipes);

	// fonctions recherche
	searchEvent(allRecipes);
    
}

// récupération data API
export const allRecipes = await getAPI(api_url);

init(allRecipes);
