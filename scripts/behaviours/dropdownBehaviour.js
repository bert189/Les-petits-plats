// imports
import { tagCountObserver } from "../utils/tagCountObserver.js";
import { renderTagSelected } from "../components/renderTagSelected.js";
import { createElement } from "../utils/createElement.js";
import { addTagEvent, removeTagEvent } from "../businessLogic/filterRecipes.js";


// cette fonction gère l'affichage + les events des dropdowns aux clics

export function dropdownBehaviour() {

	const dropdowns = document.querySelectorAll(".specific-dropdown");
    const selectedTags = document.querySelector(".selected-tags");

    dropdowns.forEach(dropdown => {

        const chevronDown = dropdown.querySelector(".fa-chevron-down");
        const chevronUp = dropdown.querySelector(".fa-chevron-up");
        const specific = dropdown.querySelector(".specific");
        const specificChevronDown = dropdown.querySelector(".specific-chevron-down-wrapper");
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
            specificChevronDown.classList.add("specific-inactive");
            specific.classList.add("specific-inactive");
            chevronDown.classList.add("specific-inactive");
        }
        else {
            specificChevronDown.addEventListener("click", function() {
                    
                specific.classList.add("display-none");
                searchTags.classList.remove("display-none");
                swapChevron();             
                tagCountObserver(dropdown, 15); // présentation 1 ou 2 colonnes au delà du nombre indiqué
                inputTagSearch.focus(); // optionnel, permet d'encourager la recherche

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
        let selectedTagsFamily;

        if (selectedTags.childElementCount < 4) { // afin de ne pas générer des nouveaux contereurs Family à chaque rendu
            selectedTagsFamily = createElement("div", {class: "selected-tags-family", id: `${dropdown.id}-selected`});
            selectedTags.appendChild(selectedTagsFamily);
        } else {
            selectedTagsFamily = selectedTags.querySelector(`#${dropdown.id}-selected`);
        }

        // mise à jour de le liste des tags selectionnés
        function updatedTagSelection() {
            const currentTagSelection = Array.from(selectedTagsFamily.querySelectorAll(".selected-tag"));
            return currentTagSelection;
        }
        
        // au render des dropdown : griser les tags déjà selectionnés
        updatedTagSelection().forEach(selectedTag => {
            tagArray.forEach(tag => {
                if (tag.textContent === selectedTag.textContent) {
                    tag.classList.add("already-selected"); 
                }
            })
        });       

        
        // HELPERS
        // affichage du tag selectionné
        function selectTag(tag) {            
            // tag.classList.add("already-selected"); // inutile car dropdownBehaviour() est relancée à chaque renderAll()
             
            const selectedTag = {
                "name": `${tag.innerText}`,
                "color": `${dropdown.style.backgroundColor}`                
            }
            selectedTagsFamily.innerHTML += renderTagSelected(selectedTag);
        }
        
        // suppression d'un tag selectionné
        function unselectTag(selectedTag) {
            const correspondingTag = tagArray.find(correspondingTag => correspondingTag.textContent === selectedTag.textContent);
            correspondingTag.classList.remove("already-selected");
            selectedTagsFamily.removeChild(selectedTag); // tag.parentNode.removeChild(tag);
        }

        // EVENTS
        // au clic sur un tag dans le dropdown
        tagArray.forEach(tag => {
            tag.addEventListener("click", function() {
                const tagFamily = tag.parentElement.parentElement.parentElement.id;
                const tagName = tag.textContent.toLowerCase();
                selectTag(tag);
                addTagEvent(tagFamily, tagName);
            })
        });
        
        // au clic sur la croix de suppression du tag selectionné :        
        updatedTagSelection().forEach(selectedTag => {
            const closeCross = selectedTag.querySelector(".fa-times-circle");
            closeCross.addEventListener("click", function() {
                if (selectedTagsFamily.contains(selectedTag) && selectedTag.parentNode !== null) {
                    const tagName = selectedTag.textContent.toLocaleLowerCase();
                    const tagFamily = selectedTag.parentElement.id.slice(0, -9);                         
                    unselectTag(selectedTag);
                    removeTagEvent(tagFamily, tagName);
                }
            });
        });


    })


} 