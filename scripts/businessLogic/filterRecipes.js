// imports
import { renderAlldropdowns, renderAllRecipes } from "../index.js";


// variables
const mainSearch = document.querySelector(".global-search");
const minCharacters = 3;
let searchPast3 = false;

// collection de listes filtrées qui s'actualise    
let recipesListsCollection = {
    // mainSearch: [],
    // tagID1: [id, id, id, id, id],
    // tagID2: [id, id],
    // tagID3: [id, id, id]
};


// HELPERS functions :

// calcul de l'intersection des listes filtrées (croisement)    
function intersection(lists) {
    const setList = [];

    // ...

    return setList
};

// retourne la liste de recettes en fonction de la valeur de l'input
function filteredRecipesList(recipes, value) {
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(value))        
}


// CALCUL ET AFFICHAGE LISTE RECETTES CROISEES :

// fonction qui permet le filtrage des recettes :
export function filterRecipes(recipes) {

    recipesListsCollection.mainSearch = recipes;
    console.log(recipesListsCollection)

    // EVENT MAIN SEARCH :    

    // eventListener 'input' éxécute son callback à chaque changement de value de l'input
    mainSearch.addEventListener('input', function() {

        // récupération de la chaine de 3 caractères ou +

        const mainSearchValue = mainSearch.value.toLowerCase();

        if (mainSearchValue.length >= minCharacters) {

            console.log(mainSearchValue)
            
            searchPast3 = true;
            console.log(searchPast3)

            // mise à jour de 'mainsearch' dans la collection de listes
            recipesListsCollection.mainSearch = filteredRecipesList(recipes, mainSearchValue);
            console.log(recipesListsCollection);

            // mise à jour de l'affichage des recettes à chaque changement de valeur        
            // renderAllRecipes(intersection(recipesListsCollection));
            renderAllRecipes(recipesListsCollection.mainSearch);

            // afficher seulement ces tags de la dans chaques dropdowns en fonction de la valeur de l'input mainSearch
            // renderAlldropdowns(intersection(recipesListsCollection));
            renderAlldropdowns(recipesListsCollection.mainSearch);
        }
        else if (mainSearchValue.length === (minCharacters - 1) && searchPast3) {
            searchPast3 = false;
            // en cas de search vide (ou moins de 3 caractères), remettre tous les tags
            renderAllRecipes(recipes);
            renderAlldropdowns(recipes);
        }        
        

    });




    // TAG SELECTION OBSERVER :
    // /!\ possible de récupérer la liste des tags selectionnés depuis l'observer de dropdownBehaviour()

    // détecteur d'action sur la selection de tags (selection ou suppression)


    // isolation de la famille et du nom du tag (ajouté ou supprimé)


    // création ou suppresion de liste filtrée correspondant au tag




}


