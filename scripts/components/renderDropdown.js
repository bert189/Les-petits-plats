// 

export function renderDropdown(specificName, id, backgroundColor, placeholder, size, tagList, uniqueTagChoice) {

    const singularSpecific = id.slice(0, -1);
    let HTMLtagList = '';
    let index = 1;

    tagList.forEach(tag => {
        HTMLtagList += `<li class="tag" id="${singularSpecific}-${index++}">${tag}</li>`;  
    });

    let classUnique = "";
    if (uniqueTagChoice) {
        classUnique = "unique-tag-choice";
    }

    return `
    <div class="specific-dropdown ${classUnique}" id="${id}" style="background-color: ${backgroundColor}">
        <div class="specific">${specificName}</div>
        <div class="search-tags-wrapper display-none">
            <i class="fas fa-search"></i>
            <input type="text" size="${size}" class="specific-search" placeholder="${placeholder}">
            <ul class="tags">${HTMLtagList}</ul>
        </div>
        
        <i class="fas fa-chevron-down"></i>
        <i class="fas fa-chevron-up display-none"></i>
    </div>
    
    `;
} 