import {
    createListByCountry,
    showLeaguesByCountry} from './stats.js';

window.addEventListener('load', createListByCountry);

document.getElementById('createListByCountry').addEventListener('click', showLeaguesByCountry);