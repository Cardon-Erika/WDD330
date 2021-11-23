export function getJSON(url) {
    return fetch(url)
    .then(resp => resp.json())
    .then(data => {
        return (data);
    })
    .catch(err => {
        console.error(err);
    });
}

export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    }).then(position => {
        return {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }
    });
};
