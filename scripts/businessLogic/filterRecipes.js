// imports
import { renderAlldropdowns, renderAllRecipes } from "../index.js";


// variables
const mainSearch = document.querySelector(".global-search");
const minCharacters = 3;
let searchPastMin = false;




// collection de listes filtrées qui s'actualise    
let recipesListsCollection = {
    mainSearch: [],
    ingredients: [],
    appliances: [],
    ustensils: [],
    times: []
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
    return recipes.filter(recipe => {
        const nameIncludes = recipe.name.toLowerCase().includes(value);
        const applianceIncludes = recipe.appliance.toLowerCase().includes(value);
        const descriptionIcludes = recipe.description.toLowerCase().includes(value);
        const ingredientsIncludes = recipe.ingredients.some(ing => ing.ingredient.toLowerCase().includes(value)); // some()

        return nameIncludes || applianceIncludes || descriptionIcludes || ingredientsIncludes;
    })       
}

function filterByTag ( recipes, tagFamily, tagName) {
    return recipes.filter(recipe => {
        switch (tagFamily) {
            case 'ingredients-selected' :
                return recipe.ingredients.some(ing => ing.ingredient.toLowerCase() === tagName);
            case 'appliances-selected' :
                return recipe.appliance.toLowerCase() === tagName;
            case 'ustensils-selected' :
                return recipe.ustensils.some(u => u.toLowerCase() === tagName);


        }

    })
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
        console.log(mainSearchValue)

        // action de filtre au delà de 3 caractères
        if (mainSearchValue.length >= minCharacters) {            
            searchPastMin = true;

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
        else if (mainSearchValue.length <= (minCharacters - 1) && searchPastMin && recipesListsCollection.mainSearch.length === 0) { // retour en dessou de 3 caractères
            searchPastMin = false;
            recipesListsCollection.mainSearch = recipes;
            console.log(recipesListsCollection)
            // en cas de search vide (ou moins de 3 caractères), remettre tous les tags
            renderAllRecipes(recipes);
            renderAlldropdowns(recipes);
        }        

    });


    // EVENT TAG SELECTION/SUPPRESSION :    

    // détecteur d'action sur la selection de tags (selection ou suppression)

    

    // observer sur tagsFamily
    const tagsFamilies = Array.from(document.querySelectorAll(".selected-tags-family"));

    tagsFamilies.forEach(tagsFamily => {
        
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                // effectuer une action en fonction de la mutation détectée
                const selectedTags = Array.from(tagsFamily.querySelectorAll(".selected-tag"));
                const tagsInfo = selectedTags.map(tag => ({text: tag.innerText }));
                console.log(tagsInfo)
                
                console.log(tagsFamily.id)
                
                // isolation de la famille et du nom du tag (ajouté ou supprimé)

                // création ou suppresion de liste filtrée correspondant au tag

                const result = filterByTag(recipes, tagsFamily.id, tagsInfo.toLowerCase());

                recipesListsCollection.push(result)

                // renderAllRecipes(result); // intersection
                // renderAlldropdowns(result);
            });
        });
    
        observer.observe(tagsFamily, { childList: true });
    });




}


