// tronque un texte en ajoutant ... après le dernier mot

export function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      text = text.substr(0, maxLength);
      text = text.substr(0, text.lastIndexOf(' ')) + '...';

      // évite de finir par une sur une virgule ,...
      if (text.charAt(text.length - 3 - 1) === ",") {
        text = text.substr(0, text.lastIndexOf(",")) + '...'; 
      }
    }
    return text;
  }
