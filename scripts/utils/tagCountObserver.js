// gestion de l'affichage longue liste sur 1 ou 2 colonnes

export function tagCountObserver(dropdown) {

    // sélectionnez l'élément à observer
    const tagList = dropdown.querySelector(".tags");

    function setColumnTags() {
        const tagCount = tagList.childElementCount;
    
        if (tagCount > 15) { 
        
            tagList.style.width = "450px"; // 450px  = 2 * 225px (largeur d'un tag)
            // permet 2 dropdown à 2 colonnes + 1 à 1 colonne (sur container de 1240px)
        
            if (tagCount % 2 === 1) {
                const tagListMAxHeight = ((tagCount + 1) / 2 ) * 32 + 18;
                tagList.style.maxHeight = `${tagListMAxHeight.toString()}px`;
            }
            else {
                const tagListMAxHeight = ((tagCount) / 2 ) * 32 + 18;
                tagList.style.maxHeight = `${tagListMAxHeight.toString()}px`;
            }
        }

        else {
            tagList.style.width = "unset";
            tagList.style.maxHeight = "unset";
        }
    }

    // à l'ouverture du dropdown
    setColumnTags();

    // OBSERVER (merci CHATGPT) réagit à chaque modification de tagList :
    // options de configuration de l'observer
    const config = { childList: true };

    // fonction de rappel appelée à chaque changement
    const callback = function(mutationsList) {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList') {               
                setColumnTags();
            }            
        }
    };

    // création de l'observer avec la fonction de rappel et les options de configuration
    const observer = new MutationObserver(callback);
    observer.observe(tagList, config);

}