
// MAIN SEARCH OBSERVER :

// détection de changement dans le champ de recherche principal


// récupération de la chaine de 3 caractères ou +


// généréer la liste filtrée relative à cette string
const filteredListSearch = [
    // id, id, id
]



// insérer la liste filtrée ou remplacer la liste filtrée 'mainSearch' éxistante 
function updateMainSearchList(list) {
    console.log(list);
    return list;
    //
};

updateMainSearchList(filteredListSearch);


// /!\ A INCLURE DANS LE COMPORTEMENT DES DROPDOWNS : /!\

// chercher dans la liste filtrée quels tags de chaque famille specifique éxistent
// afficher seulement ces tags dans chaques dropdowns en fonction de la valeur de l'input mainSearch
// en cas de search vide (ou moins de 3 caractères), remettre tous les tags  








// TAG SELECTION OBSERVER :

// détecteur d'action sur la selection de tags (selection ou suppression)


// isolation de la famille et du nom du tag (ajouté ou supprimé)


// création ou suppresion de liste filtrée correspondant au tag









// CALCUL ET AFFICHAGE LISTE RECETTES CROISEES :

// fonction qui permet le filtrage des recettes :
export function filterRecipes() {

    // collection de listes filtrées qui s'actualise
    
    let listsCollection = {
        mainSearch: [],
        // tagID1: [id, id, id, id, id],
        // tagID2: [id, id],
        // tagID3: [id, id, id]
    };
    
    // calcul de l'intersection des listes filtrée (croisement)
    
    function intersection(lists) {
        console.log(lists);
        return lists
    };

    function updateRecipesDisplay(list) {
        console.log(list);
        return list
    };

    // observer sur la collection de listes
    // à chaque changement dans la collection : executer intersection() + updateRecipesDisplay()

    updateRecipesDisplay(intersection(listsCollection));


}