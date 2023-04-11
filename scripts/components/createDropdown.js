// rendu des menus déroulants

export function createDropdown(specificName, id, backgroundColor, placeholder, size, tagList) {

    const singularSpecific = id.slice(0, -1);
    let HTMLtagList = '';

    tagList.forEach(tag => {
        HTMLtagList += `<li class="tag ${singularSpecific}-tag">${tag}</li>`;  
    });

    return `<div class="specific-dropdown" id="${id}" style="background-color: ${backgroundColor}">
                <div class="specific-chevron-down-wrapper">
                    <div class="specific">${specificName}</div>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <i class="fas fa-chevron-up display-none"></i>
                <div class="search-tags-wrapper display-none">
                    <i class="fas fa-search"></i>
                    <input type="text" size="${size}" class="specific-search" placeholder="${placeholder}">
                    <ul class="tags">${HTMLtagList}</ul>
                </div>                
            </div>`;
} 