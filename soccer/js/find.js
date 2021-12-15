const baseURL = "https://api-football-v1.p.rapidapi.com/v3/"

export async function findNextGame(id) {
    const url = `${baseURL}fixtures?season=2021&team=${id}`;
    return fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "7b8d108b58msh68fc75178b98daap14d877jsn2de0168a9f7b"
            }
        })
        .then(
            async function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                return response.json().then(function (data) {
                    // return data.response;
                    const today = new Date();

                    const games = data.response
                    for (let game of games) {
                        const gameDate = game.fixture.date
                        const gameDateFormatted = new Date(gameDate);
                        // const gameDateStr = gameDateFormatted.toString();
                        if (gameDateFormatted >= today) {
                            return gameDateFormatted;
                        }
                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export async function findHomeFlag(id) {
    const url = `${baseURL}fixtures?season=2021&team=${id}`;
    return fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "7b8d108b58msh68fc75178b98daap14d877jsn2de0168a9f7b"
            }
        })
        .then(
            async function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                return response.json().then(function (data) {
                    const games = data.response[0].teams;

                    if (games.away.id == id) {
                        return games.away.logo;
                    } else if (games.home.id == id) {
                        return games.home.logo;
                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export async function findOppFlag(id, findGame) {
    if (findGame == undefined) {
        return null;
    } else {
        const url = `${baseURL}fixtures?season=2021&team=${id}`;
        return fetch(url, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                    "x-rapidapi-key": "7b8d108b58msh68fc75178b98daap14d877jsn2de0168a9f7b"
                }
            })
            .then(
                async function (response) {
                    if (response.status !== 200) {
                        console.warn('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    return response.json().then(function (data) {
                        // return data.response;
                        const gameToFind = JSON.stringify(findGame);

                        const games = data.response

                        for (let game of games) {
                            const gameDate = game.fixture.date
                            const gameDateFormatted = JSON.stringify(new Date(gameDate));
                            // const gameDateStr = gameDateFormatted.toString();
                            if (gameDateFormatted == gameToFind) {
                                const oppTeam = game.teams;
                                if (oppTeam.away.id != id) {
                                    return oppTeam.away.logo;
                                } else if (oppTeam.home.id != id) {
                                    return oppTeam.home.logo;
                                }
                            }
                        }
                    })
                })
            .catch(err => {
                console.error('Fetch Error - ', err);
            });
    }
}

export async function findGameLocation(id, findGame) {
    const url = `${baseURL}fixtures?season=2021&team=${id}`;
    return fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "7b8d108b58msh68fc75178b98daap14d877jsn2de0168a9f7b"
            }
        })
        .then(
            async function (response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                return response.json().then(function (data) {
                    // return data.response;
                    const gameToFind = JSON.stringify(findGame);

                    const games = data.response

                    for (let game of games) {
                        const gameDate = game.fixture.date
                        const gameDateFormatted = JSON.stringify(new Date(gameDate));
                        // const gameDateStr = gameDateFormatted.toString();
                        if (gameDateFormatted == gameToFind) {
                            return game.fixture.venue.name;
                        }
                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}