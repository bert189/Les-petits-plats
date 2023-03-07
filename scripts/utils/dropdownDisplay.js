// imports
import { tagCountObserver } from "./tagCountObserver.js";

// cette fonction gère l'affichage + les events des dropdowns aux clics

export function dropdownDisplay() {

	const dropdowns = document.querySelectorAll(".specific-dropdown");

    dropdowns.forEach(dropdown => {

        const chevronDown = dropdown.querySelector(".fa-chevron-down");
        const chevronUp = dropdown.querySelector(".fa-chevron-up");
        const specific = dropdown.querySelector(".specific");
        const specificChevronDown = [specific, chevronDown];
        const searchTags = dropdown.querySelector(".search-tags-wrapper");
        const inputSearch = dropdown.querySelector(".specific-search");        

    
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

        function clearInput() {
            inputSearch.value = "";
        }
    
        specificChevronDown.forEach(element => {
            element.addEventListener("click", function() {
                specific.classList.add("display-none");
                searchTags.classList.remove("display-none");
                swapChevron();              
                tagCountObserver(dropdown);
            })
        })
    
        chevronUp.addEventListener('click', function() {
            searchTags.classList.add("display-none");
            specific.classList.remove("display-none");
            swapChevron();
            clearInput();
        })


        // Ajouter un écouteur d'événement de clic au document
        document.addEventListener('click', (event) => {
            // Vérifier si l'élément cliqué n'est pas un élément dropdown
            if (chevronDown.classList.contains("display-none") && !dropdowns[0].contains(event.target) && !dropdowns[1].contains(event.target) && !dropdowns[2].contains(event.target)) {
                searchTags.classList.add("display-none");
                specific.classList.remove("display-none");
                swapChevron();
                clearInput();
            }
        });




    })
    
} 