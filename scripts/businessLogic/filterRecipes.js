// imports
import { allRecipes, renderAll } from "../index.js";


// variables
const mainSearch = document.querySelector(".global-search");
const minCharacters = 3;


// collection de listes filtrées qui s'actualise /!\ variable globale
let recipesLists = [];


// HELPERS functions :

// retourne la liste des recettes en fonction de la valeur de l'input :

function filterBySearch(recipes, value) {

    const filteredRecipes = recipes.filter(recipe => {

        const nameIncludesValue = recipe.name.toLowerCase().includes(value);
        const applianceIncludesValue = recipe.appliance.toLowerCase().includes(value);
        const descriptionIncludesValue = recipe.description.toLowerCase().includes(value);
        const ingredientsIncludesValue = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(value)); // some()

        return nameIncludesValue || applianceIncludesValue || descriptionIncludesValue || ingredientsIncludesValue;
    })
    
    return filteredRecipes;
}


// retourne la liste des recettes en fonction du tag choisi :

function filterByTag(recipes, tagFamily, tagName) {
    
    const filteredRecipes = recipes.filter(recipe => {
        switch (tagFamily) {
            case 'ingredients':
                return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === tagName);
            case 'appliances':
                return recipe.appliance.toLowerCase() === tagName;
            case 'ustensils':
                return recipe.ustensils.some(ustensil => ustensil.toLowerCase() === tagName);
            case 'times':
                return recipe.time === parseInt(tagName.slice(0,-4));
        }
    })

    return filteredRecipes;
}



// calcul de l'intersection des listes filtrées (croisement)

function intersection(recipesLists) {

    if (recipesLists.length === 0) {
        return [];
    }
    
    let commonRecipes = recipesLists[0];

    for (let i = 1; i < recipesLists.length; i++) {
        commonRecipes = commonRecipes.filter(recipe => recipesLists[i].includes(recipe));
    }

    return commonRecipes; 

};



// CALCUL ET AFFICHAGE LISTE RECETTES CROISEES :


// EVENT SEARCH

// fonction qui permet le filtrage des recettes :

export function searchEvent(recipes) {

    recipesLists[0] = recipes;
    // EVENT MAIN SEARCH :    

    // eventListener 'input' éxécute son callback à chaque changement de value de l'input
    mainSearch.addEventListener('input', function() {
        // récupération de la chaine de 3 caractères ou +
        const searchValue = mainSearch.value.toLowerCase();
        // action de filtre au delà de 3 caractères
        if (searchValue.length >= minCharacters) {            

            // mise à jour de l'index zéro (réservé au filtre 'search') la collection de listes
            recipesLists[0] = (filterBySearch(recipes, searchValue));
        }
        else { // en dessous de 3 caractères
            recipesLists[0] = recipes;        }

        // mise à jour de l'affichage des recettes à chaque changement de valeur        
        renderAll(intersection(recipesLists));
    });
    
}



// EVENT TAG SELECTION/SUPPRESSION :

// action à la sélection d'un tag :

export function addTagEvent(tagFamily, tagName) {        

    // update liste de recettes
    recipesLists.push(filterByTag(allRecipes, tagFamily, tagName)); // allRecipes variable globale totalité des recettes
    // affichage :
    renderAll(intersection(recipesLists));

}


// action à la désélection d'un tag :

export function removeTagEvent(tagFamily, tagName) {      
        
    // update liste de recettes
    const tagCorrespondingList = filterByTag(allRecipes, tagFamily, tagName); // allRecipes variable globale

    // recipesLists = recipesLists.filter(recipeList => recipeList !== tagCorrespondingList); // ne fonctionne pas, d'où JSON.stringify :
    // évite de supprimer la liste 'search' si elle est identique à celle du tag
    const tagFiltersLists = recipesLists.slice(1);
    // évite de supprimer 2 listes ou + en cas de listes de tagFilter identiques
    // Recherche de l'index de la première liste qui correspond. findIndex(condition = true) s'arrête au premier index répondant à la condition
    const index = tagFiltersLists.findIndex(list => JSON.stringify(list) === JSON.stringify(tagCorrespondingList));
    // suppression de la liste correspondante
    tagFiltersLists.splice(index, 1);

    recipesLists = [recipesLists[0], ...tagFiltersLists];
    // affichage :
    renderAll(intersection(recipesLists));

}









