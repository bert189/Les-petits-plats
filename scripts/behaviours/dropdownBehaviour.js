// imports
import { tagCountObserver } from "../utils/tagCountObserver.js";
import { renderTagSelected } from "../components/renderTagSelected.js";
import { createElement } from "../utils/createElement.js";


// cette fonction gère l'affichage + les events des dropdowns aux clics

export function dropdownBehaviour() {

	const dropdowns = document.querySelectorAll(".specific-dropdown");
    const selectedTags = document.querySelector(".selected-tags");

    dropdowns.forEach(dropdown => {

        const chevronDown = dropdown.querySelector(".fa-chevron-down");
        const chevronUp = dropdown.querySelector(".fa-chevron-up");
        const specific = dropdown.querySelector(".specific");
        const specificChevronDown = [specific, chevronDown];
        const arrayTags = Array.from(dropdown.querySelectorAll(".tags .tag"));
        const searchTags = dropdown.querySelector(".search-tags-wrapper");
        const inputTagSearch = dropdown.querySelector(".specific-search");


        // HELPERS
        
        // change le chevron de sens
        function swapChevron() {
            if (!chevronDown.classList.contains("display-none")) {
                chevronDown.classList.add("display-none");
                chevronUp.classList.remove("display-none");
            }
            else {
                chevronUp.classList.add("display-none");
                chevronDown.classList.remove("display-none");
            }
        }

        // vide le champs texte
        function clearInput() {
            inputTagSearch.value = "";
        }
        

        // EVENTS DROPDOWN :

        // au clic sur la partie visible du dropdown fermé -> ouverture

        if (arrayTags.length === 0) { // cas ou la recherhce ne donne aucun résultat
            dropdown.classList.add("no-tags");
            specific.classList.add("specific-inactive");
            chevronDown.classList.add("specific-inactive");
        }
        else {
            specificChevronDown.forEach(element => {
                element.addEventListener("click", function() {
                    
                    specific.classList.add("display-none");
                    searchTags.classList.remove("display-none");
                    swapChevron();             
                    tagCountObserver(dropdown, 15); // présentation 1 ou 2 colonnes au delà du nombre indiqué
                    inputTagSearch.focus(); // optionnel, permet d'encourager la recherche

                })
            })            
        }
        
        // au clic sur le chevron up -> fermeture
        chevronUp.addEventListener('click', function() {
            searchTags.classList.add("display-none");
            specific.classList.remove("display-none");
            swapChevron();
            clearInput();
            resetTags();
        })

        // au clic en dehors des dropdowns (et des tagSelected) -> fermeture
        // Ajouter un écouteur d'événement de clic au document pour le clic à l'extérieur
        document.addEventListener('click', (event) => {
            // Vérifier si l'élément cliqué n'est pas un élément dropdown, ou un tag selectionné
            if (chevronDown.classList.contains("display-none")
                && !Array.from(dropdowns).some(dropdown => dropdown.contains(event.target)) // some()
                && !event.target.closest('.selected-tag, .fa-times-circle, .dropdown') ) { // closest()
                searchTags.classList.add("display-none");
                specific.classList.remove("display-none");
                swapChevron();
                clearInput();
                resetTags();
            }

        });


        // EVENT DROPDOWN SEARCH :

        // lorsque l'utilisateur entre des caractères dans le champs de recheche -> filtre les tags
        const tagsContainer = dropdown.querySelector(".tags");
        const tagArray = Array.from(dropdown.querySelectorAll(".tag"));

        function resetTags() {
            tagArray.forEach(tag => tagsContainer.appendChild(tag));            
        }

        function filterTags(value) {
            // Filtrer les éléments en fonction de leur innerText
            const filteredTags = tagArray.filter(function(tag) {
                return tag.innerText.toLowerCase().includes(value);
            });
            // mettre à jour l'affichage des tags
            tagsContainer.innerHTML = "";
            filteredTags.forEach(tag => tagsContainer.appendChild(tag));            
        }
        
        // eventListener 'input' éxécute son callback à chaque changement de value de l'input
        inputTagSearch.addEventListener('input', function() {
            const searchValue = inputTagSearch.value.toLowerCase();
            filterTags(searchValue);
        });

        
        // EVENTS TAGS :

        // création des conteneurs de famille de tag selectionnés
        const selectedTagsFamily = createElement("div", {class: "selected-tags-family", id:`${dropdown.id}-selected`});
        selectedTags.appendChild(selectedTagsFamily);      
        
        // affichage du tag selectionné
        function selectTag(tag) {
            if (dropdown.classList.contains("unique-tag-choice") && selectedTagsFamily.childNodes.length > 0) {
                // si le choix de tag est unique, il faut préalablement supprimer le choix déjà éxistant
                const currentTag = selectedTagsFamily.firstElementChild;
                unselectTag(currentTag);
                tag.classList.add("already-selected");
            }
            tag.classList.add("already-selected");
            const selectedTag = {
                "id": `${tag.id}-selected`,
                "name": `${tag.innerText}`,
                "color": `${dropdown.style.backgroundColor}`                
            }
            selectedTagsFamily.innerHTML += renderTagSelected(selectedTag);
        }
        

        // suppression d'un tag selectionné
        function unselectTag(selectedTag) {
            const correspondingTag = tagArray.find(correspondingTag => correspondingTag.id === selectedTag.id.slice(0, -9));
            correspondingTag.classList.remove("already-selected");
            selectedTagsFamily.removeChild(selectedTag); // tag.parentNode.removeChild(tag);
        }

        // au clic sur un tag dans le dropdown
        tagArray.forEach(tag => {
            tag.addEventListener("click", function() {
                selectTag(tag);
            })
        });
    
        // mise à jour de le liste des tags selectionnés (via observer)
        function updatedTagSelection() {
            const currentTagSelection = Array.from(selectedTagsFamily.querySelectorAll(".selected-tag"));
            return currentTagSelection;
        }
        // OBSERVER (merci ChatGPT) réagit à chaque modification de tagList :
        // options de configuration de l'observer
        const config = { childList: true };
        // fonction de rappel appelée à chaque changement dans la liste des tags selectionnés 
        const callback = function(mutationsList) {
            for(const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    updatedTagSelection();                          
                    // au clic sur la croix d'un tag selectionné
                    updatedTagSelection().forEach(tag => {
                        const closeCross = tag.querySelector(".fa-times-circle");
                        closeCross.addEventListener("click", function() {
                            if (selectedTagsFamily.contains(tag) && tag.parentNode !== null) {                                
                                unselectTag(tag);
                            }
                        });
                    });  
                }
            };
        }
        // création de l'observer avec la fonction de rappel et les options de configuration
        const observer = new MutationObserver(callback);
        observer.observe(selectedTagsFamily, config);



    })


} 