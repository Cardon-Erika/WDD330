import {
    getJSON,
} from './utilities.js';

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02'

export default class Quake {
    getEarthQuakesByRadius(position, radius) {
        const latitude = position.lat;
        const longitude = position.lon;

        const positionUrl = `${baseUrl}&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${radius}`;

        return getJSON(positionUrl);
    }
}