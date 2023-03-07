// 

export function renderDropdown(specificName, id, placeholder, backgroundColor, tagList) {

    let HTMLtagList = '';

    tagList.forEach(tag => {
        HTMLtagList += `<li class="tag">${tag}</li>`;
    });

    return `
    <div class="specific-dropdown" id="${id}" style="background-color: ${backgroundColor}">
        <div class="specific">${specificName}</div>
        <div class="search-tags-wrapper display-none">
            <input type="text" name="" class="specific-search" placeholder="${placeholder}">
            <ul class="tags">${HTMLtagList}</ul>
        </div>
        <i class="fas fa-chevron-down"></i>
        <i class="fas fa-chevron-up display-none"></i>
    </div>
    
    `;
} 