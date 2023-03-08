// imports
import { tagCountObserver } from "../utils/tagCountObserver.js";
import { selectTag } from "./tagBehaviour.js";

// cette fonction gère l'affichage + les events des dropdowns aux clics

export function dropdownBehaviour() {

	const dropdowns = document.querySelectorAll(".specific-dropdown");

    dropdowns.forEach(dropdown => {

        const chevronDown = dropdown.querySelector(".fa-chevron-down");
        const chevronUp = dropdown.querySelector(".fa-chevron-up");
        const specific = dropdown.querySelector(".specific");
        const specificChevronDown = [specific, chevronDown];
        const searchTags = dropdown.querySelector(".search-tags-wrapper");
        const inputTagSearch = dropdown.querySelector(".specific-search");
        

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
        

        // EVENTS :
        // au clic sur la partie visible du dropdown fermé -> ouverture
        specificChevronDown.forEach(element => {
            element.addEventListener("click", function() {
                specific.classList.add("display-none");
                searchTags.classList.remove("display-none");
                swapChevron();              
                tagCountObserver(dropdown);
                // inputTagSearch.focus();
            })
        })
        
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
            // Vérifier si l'élément cliqué n'est pas un élément dropdown
            if (chevronDown.classList.contains("display-none") && !Array.from(dropdowns).some(dropdown => dropdown.contains(event.target))) {  // some()
                searchTags.classList.add("display-none");
                specific.classList.remove("display-none");
                swapChevron();
                clearInput();
                resetTags();
            }
        });

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

        // au clic sur un tag dans le dropdown
        tagArray.forEach(tag => {
            tag.addEventListener("click", function(){
                const selectedTag = {
                    "name": `${tag.innerText}`,
                    "color": `${dropdown.style.backgroundColor}`
                }

                selectTag(selectedTag);
            })


        });





    })
    
} 