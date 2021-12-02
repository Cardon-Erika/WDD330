// class FavoriteModel {
//     constructor() {
//         this.container = document.getElementById('displayFavorite');

//     }
//     getFavoriteTeam() {
//         return JSON.parse(localStorage.getItem(this.type)) || [];
//     }

//     renderFavoriteTeam(){
//         // this.container.innerHTML = '';
//         // const saveFavoriteTeam = this.getFavoriteTeam();
//         // const favorite = document.createElement('div');
//         // favorite.innerHTML = saveFavoriteTeam;
//         // this.container.appendChild(favorite);
//         this.container.innerHTML = '';
//         const favorite = this.getFavoriteTeam();
//         this.container.appendChild(favorite);
//     }

//     addFavoriteTeam(text, key) {
//         const favoriteTeam = this.getFavoriteTeam();
//         favoriteTeam.push({
//             name: key,
//             date: new Date(),
//             content: text
//         })
//         localStorage.setItem(this.type, JSON.stringify(favoriteTeam));
//     }
// }

// export default FavoriteModel;

// const displayFavoriteTeam = document.getElementById('displayFavorite');
// displayFavoriteTeam.innerHTML = '';

export function getFavoriteTeam() {
    return JSON.parse(localStorage.getItem('favoriteTeam')) || [];
}

export function renderFavoriteTeam() {
    // this.container.innerHTML = '';
    // const saveFavoriteTeam = this.getFavoriteTeam();
    // const favorite = document.createElement('div');
    // favorite.innerHTML = saveFavoriteTeam;
    // this.container.appendChild(favorite);
    
    
    // const displayFavoriteTeam = document.getElementById('displayFavorite');
    // displayFavoriteTeam.innerHTML = '';
    // const saveFavoriteTeam = getFavoriteTeam();
    // const favorite = document.createElement('div');
    // favorite.innerHTML = saveFavoriteTeam;
    // displayFavoriteTeam.appendChild(favorite);

    const displayFavoriteTeam = document.getElementById('displayFavorite');
    displayFavoriteTeam.innerHTML = '';
    // const favorite = getFavoriteTeam();
    displayFavoriteTeam.innerHTML = getFavoriteTeam();
    // displayFavoriteTeam.appendChild(favorite);
}

export function addFavoriteTeam(text) {
    // const favoriteTeam = getFavoriteTeam();
    // favoriteTeam.push({
    //     name: 'favoriteTeam',
    //     date: new Date(),
    //     content: text
    // })
    // const favoriteTeam = {
    //     date: new Date(),
    //     content: text,
    // }
    const favoriteTeam = text;
    
    localStorage.setItem('favoriteTeam', JSON.stringify(favoriteTeam));
}