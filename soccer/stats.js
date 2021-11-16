function getStats() {
    fetch("https://soccer-football-info.p.rapidapi.com/championships/list/?p=1&c=all&l=en_US", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "soccer-football-info.p.rapidapi.com",
            "x-rapidapi-key": "7b8d108b58msh68fc75178b98daap14d877jsn2de0168a9f7b"
        }
    })

    .then(resp => resp.json())
    .then(stats => {
        console.table(stats);
    })
    .catch(err => {
        console.error(err);
    });
};

window.addEventListener('load', getStats);