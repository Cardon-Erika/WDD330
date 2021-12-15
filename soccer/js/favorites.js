export function getFavoriteTeam() {
    return JSON.parse(localStorage.getItem('favoriteTeam')) || [];
}

export function renderFavoriteTeam() {
    const displayFavoriteTeam = document.getElementById('displayFavorite');
    displayFavoriteTeam.innerHTML = '';

    displayFavoriteTeam.innerHTML = getFavoriteTeam();

}

export function addFavoriteTeam(text) {
    const favoriteTeam = text;
    
    localStorage.setItem('favoriteTeam', JSON.stringify(favoriteTeam));
}