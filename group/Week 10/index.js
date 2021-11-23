import QuakesController from './quakesController.js';
import {getLocation} from './utilities.js';

async function init() {
    const location = await getLocation();
    const quakesControl = new QuakesController('#quakeList', location);
    quakesControl.init();
};

window.addEventListener('load', init)