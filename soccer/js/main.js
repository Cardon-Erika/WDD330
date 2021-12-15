import {
    createListByCountry,
    showLeaguesByCountry,
    showTeamsInLeague,
    showTeamInfo,
    setAsFavorite} from './stats.js';

// import FavoriteModel from './favorites.js';
import {
    getFavoriteTeam,
    renderFavoriteTeam,
    addFavoriteTeam } from './favorites.js';

window.addEventListener('load', () => {
    createListByCountry();
    renderFavoriteTeam();
});

document.getElementById('createListByCountry').addEventListener('click', showLeaguesByCountry);