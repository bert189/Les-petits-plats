// prend en compte les accents dans l'ordre alphabétique français (merci ChatGPT)

export function compareStringsFrench(a, b) {
    // Convertit les deux chaînes en minuscules pour une comparaison insensible à la casse
    const lowerCaseA = a.toLowerCase();
    const lowerCaseB = b.toLowerCase();
  
    // Utilise la méthode localeCompare() pour comparer les chaînes en fonction de l'ordre alphabétique français
    return lowerCaseA.localeCompare(lowerCaseB, 'fr', { sensitivity: 'base' });
  }