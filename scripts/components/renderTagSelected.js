// 

export function renderTagSelected(tag) {


    return `
        <div class="selected-tag" id="${tag.id}" style="background-color: ${tag.color}">${tag.name}<i class="far fa-times-circle"></i></div>   
        `;
}