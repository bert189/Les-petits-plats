
import { renderAlldropdowns, renderAllRecipes } from "../index.js";




// CALCUL ET AFFICHAGE LISTE RECETTES CROISEES :

// fonction qui permet le filtrage des recettes :
export function filterRecipes(recipes) {

    // collection de listes filtrées qui s'actualise
    
    let recipesListsCollection = {
        mainSearch: [],
        // tagID1: [id, id, id, id, id],
        // tagID2: [id, id],
        // tagID3: [id, id, id]
    };
    
    // calcul de l'intersection des listes filtrée (croisement)
    
    function intersection(lists) {
        const setList = [];

        // ...

        return setList
    };


    // EVENT MAIN SEARCH :

    const mainSearch = document.querySelector(".global-search");

    // eventListener 'input' éxécute son callback à chaque changement de value de l'input
    mainSearch.addEventListener('input', function() {

        // récupération de la chaine de 3 caractères ou +
        const minCharacters = 3;

        const mainSearchValue = mainSearch.value.toLowerCase();
            if (mainSearchValue.length >= minCharacters) {
                console.log(mainSearchValue)



                // détermner les recettes correspondantes à la valeur de l'input

                // .... fonction qui filtres les recettes correspondantes à la valeur de l'input
                // recipes.foreach() ....
                // généréer la liste filtrée relative à cette string
                const filteredRecipesList = [
                    // id, id, id
                ]

                // mise à jour de 'mainsearch' dans la collection de listes
                recipesListsCollection.mainSearch = filteredRecipesList

                // mise à jour de l'affichage des recettes à chaque changement de valeur        
                renderAllRecipes(intersection(recipesListsCollection));


                // afficher seulement ces tags de la dans chaques dropdowns en fonction de la valeur de l'input mainSearch
                renderAlldropdowns(intersection(recipesListsCollection));
            }
            else {
                // en cas de search vide (ou moins de 3 caractères), remettre tous les tags
            }        
        

    });




    // TAG SELECTION OBSERVER :
    // /!\ possible de récupérer la liste des tags selectionnés depuis l'observer de dropdownBehaviour()

    // détecteur d'action sur la selection de tags (selection ou suppression)


    // isolation de la famille et du nom du tag (ajouté ou supprimé)


    // création ou suppresion de liste filtrée correspondant au tag




}