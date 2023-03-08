// imports
import { renderTagSelected } from "../components/renderTagSelected.js";


// affichage du tag selectionné
const selectedTags = document.querySelector(".selected-tags");

export function selectTag(tag) {
    selectedTags.innerHTML += renderTagSelected(tag);

}


// suppression du tag selectionné

function deleteTagSelected(tag) {
    tag.classList.add("display-none");
}

// au clic sur la croix d'un tag selectionné

selectedTags.forEach(tag => {
    const closeCross = tag.querySelector(".fa-times-circle");
    closeCross.addEventListener("click", deleteTagSelected(tag));
})