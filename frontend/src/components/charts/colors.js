function getRandomColors(numColors) {
    const colors = [
      '#457FEB', '#094896', '#44688B', '#C06E32', 
      '#EFBE12', '#D00000', '#492E6F', '#8257CA'
    ];
  
    if (numColors > colors.length) {
      throw new Error("Le nombre de couleurs demandé dépasse la taille de la liste disponible.");
    }
  
    // Mélanger la liste des couleurs
    const shuffledColors = colors.sort(() => Math.random() - 0.5);
  
    // Retourner les `numColors` premières couleurs
    return shuffledColors.slice(0, numColors);
  }

export default getRandomColors