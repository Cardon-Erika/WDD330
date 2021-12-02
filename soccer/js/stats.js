import {
    addFavoriteTeam
} from "./favorites.js";

const baseURL = "https://api-football-v1.p.rapidapi.com/v3/"

export function createListByCountry() {
    const countryDropdown = document.getElementById('countries');
    countryDropdown.selectedIndex = 0;

    const url = baseURL + "countries";
    fetch(url, {
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

                // Examine the text in the response
                response.json().then(function (data) {
                    const countries = data.response;

                    for (let i = 0; i < countries.length; i++) {
                        let option = document.createElement('option');
                        option.text = countries[i].name;
                        option.value = countries[i].name;
                        option.id = countries[i].code;
                        countryDropdown.add(option);
                    }
                });
            }
        )
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function showLeaguesByCountry() {
    const selectedCountry = document.getElementById('countries').value;

    const url = baseURL + "leagues";
    fetch(url, {
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

                // Examine the text in the response
                response.json().then(function (data) {
                    const displayLeagues = document.getElementById('showLeagues');
                    displayLeagues.innerHTML = '';
                    const displayTeamsById = document.getElementById('showTeams');
                    displayTeamsById.innerHTML = '';
                    const displayPlayers = document.getElementById('showPlayers');
                    displayPlayers.innerHTML = '';

                    const country = document.createElement('h1');
                    country.textContent = document.getElementById('countries').value;
                    country.setAttribute('class', 'center_text');
                    displayLeagues.appendChild(country);

                    const displayLeaguesOnly = document.createElement('div');
                    displayLeaguesOnly.setAttribute('class', 'leagues');

                    const displayCups = document.createElement('div');
                    displayCups.setAttribute('class', 'leagues');

                    const leagueTitle = document.createElement('h2');
                    leagueTitle.textContent = "Leagues";
                    leagueTitle.setAttribute('class', 'center_text');

                    const cupTitle = document.createElement('h2');
                    cupTitle.textContent = "Cups";
                    cupTitle.setAttribute('class', 'center_text');

                    const leagues = data.response;

                    for (let i = 0; i < leagues.length; i++) {
                        if (selectedCountry == leagues[i].country.name) {
                            let div = document.createElement('div');

                            let leagueId = leagues[i].league.id;

                            let a = document.createElement('a');
                            a.id = leagues[i].league.id;
                            // **********COME BACK AND MAKE DATE DYNAMIC*************
                            a.href = `${baseURL}standings?season=${2021}&league=${a.id}`
                            // a.setAttribute('onclick', `showTeamsInLeague(event, id, href, ${leagueId})`)
                            // lets module run
                            a.addEventListener('click', (event) => showTeamsInLeague(event, a.id, a.href, leagueId));

                            let logo = document.createElement('img');
                            logo.setAttribute('width', '200px');
                            // *****Set a default image if none availble******
                            logo.src = leagues[i].league.logo;


                            let leagueName = document.createElement('h4');
                            leagueName.setAttribute('class', 'center_text');
                            // leagueName.style.fontWeight = "bold";
                            leagueName.textContent = leagues[i].league.name;

                            a.appendChild(logo);
                            a.appendChild(leagueName);
                            // div.appendChild(logo);
                            // div.appendChild(leagueName);
                            div.appendChild(a);

                            //testing if statements
                            if (leagues[i].league.type == "Cup") {
                                displayCups.appendChild(div);
                            }
                            if (leagues[i].league.type == "League") {
                                displayLeaguesOnly.appendChild(div)
                            }

                            if (displayLeaguesOnly.innerHTML) {
                                displayLeagues.appendChild(leagueTitle);
                            }
                            displayLeagues.appendChild(displayLeaguesOnly);

                            if (displayCups.innerHTML) {
                                displayLeagues.appendChild(cupTitle);
                            }
                            displayLeagues.appendChild(displayCups);
                        }
                    }
                });
            }
        )
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function showTeamsInLeague(event, id, href, leagueId) {
    event.preventDefault();

    // let leagueId = leagueId

    const url = href;
    fetch(url, {
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

                // Examine the text in the response
                response.json().then(function (data) {
                    const displayLeagues = document.getElementById('showLeagues');
                    displayLeagues.innerHTML = '';
                    const displayTeamsById = document.getElementById('showTeams');
                    displayTeamsById.innerHTML = '';
                    const displayPlayers = document.getElementById('showPlayers');
                    displayPlayers.innerHTML = '';

                    const league = document.createElement('h1');
                    // league.textContent = document.getElementById(id).h4.value;
                    const countryName = data.response[0].league.country;
                    const leagueName = data.response[0].league.name;
                    league.textContent = `${countryName} - ${leagueName}`
                    league.setAttribute('class', 'center_text');
                    displayTeamsById.appendChild(league);

                    const standingsTable = document.createElement('div');
                    standingsTable.id = "standingsTable";
                    const displayTeams = document.createElement('div');
                    displayTeams.id = "displayTeams";

                    const table = document.createElement('table');
                    const thead = document.createElement('thead');
                    const tr = document.createElement('tr');
                    const th1 = document.createElement('th'); //team name
                    th1.textContent = 'Team';
                    const th2 = document.createElement('th'); //wins
                    th2.textContent = 'Win';
                    const th3 = document.createElement('th'); //losses
                    th3.textContent = 'Lose';
                    const th4 = document.createElement('th'); //draws
                    th4.textContent = 'Draw'
                    const th5 = document.createElement('th'); //draws
                    th5.textContent = 'GP'
                    const th6 = document.createElement('th'); //points
                    th6.textContent = 'Points';
                    tr.appendChild(th1);
                    tr.appendChild(th2);
                    tr.appendChild(th3);
                    tr.appendChild(th4);
                    tr.appendChild(th5);
                    tr.appendChild(th6);
                    thead.appendChild(tr);
                    table.appendChild(thead);

                    // const leagueId = data.response[0].league.id;

                    const teams = data.response[0].league.standings[0];

                    for (let i = 0; i < teams.length; i++) {
                        const tri = document.createElement('tr')
                        // innerHTML += buildRow(i);
                        tri.id = teams[i].team.id;
                        const td1 = document.createElement('td');
                        td1.textContent = teams[i].team.name; // team name
                        const td2 = document.createElement('td');
                        td2.textContent = teams[i].all.win; // wins
                        const td3 = document.createElement('td');
                        td3.textContent = teams[i].all.lose; // losses
                        const td4 = document.createElement('td');
                        td4.textContent = teams[i].all.draw; // draws
                        const td5 = document.createElement('td');
                        td5.textContent = teams[i].all.played // points
                        const td6 = document.createElement('td');
                        td6.textContent = teams[i].points // points
                        tri.appendChild(td1);
                        tri.appendChild(td2);
                        tri.appendChild(td3);
                        tri.appendChild(td4);
                        tri.appendChild(td5);
                        tri.appendChild(td6);
                        table.appendChild(tri);
                        // end of standings table code...

                        let div = document.createElement('div');

                        let logo = document.createElement('img');
                        logo.setAttribute('width', '100px');
                        logo.src = teams[i].team.logo;

                        let teamName = document.createElement('h4');
                        teamName.setAttribute('class', 'center_text');
                        teamName.textContent = teams[i].team.name;
                        // value of team name to pass on ***NOT WORKING****
                        // let team = teams[i].team.name;
                        let team = teamName.textContent;

                        let teamId = teams[i].team.id;

                        let a = document.createElement('a');
                        a.id = teams[i].team.id;
                        // **********COME BACK AND MAKE DATE DYNAMIC*************
                        a.href = `${baseURL}players?team=${a.id}&season=${2021}`
                        // a.value = teamName.textContent;
                        a.value = `${countryName} - ${leagueName} - ${team}`
                        // a.setAttribute('onclick', `showTeamInfo(event, id, href, ${team})`)
                        // a.setAttribute('onclick', `showTeamInfo(event, ${teamId}, href, value, ${leagueId})`)
                        a.addEventListener('click', (event) => showTeamInfo(event, teamId, a.href, a.value, leagueId))

                        // let favoriteBtn = document.createElement('button');
                        // favoriteBtn.innerText = 'Set As Favorite';
                        // favoriteBtn.setAttribute('class', 'favoriteBtn');
                        // favoriteBtn.id = teams[i].team.id;
                        // favoriteBtn.href = `${baseURL}teams/statistics?league=${leagueId}&season=2021&team=${id}`
                        // favoriteBtn.setAttribute('onclick', 'setAsFavorite(event, id, href)');

                        a.appendChild(logo);
                        a.appendChild(teamName);
                        div.appendChild(a);
                        // div.appendChild(favoriteBtn);

                        displayTeams.appendChild(div);
                        standingsTable.appendChild(table);
                        displayTeamsById.appendChild(standingsTable);
                        displayTeamsById.appendChild(displayTeams);
                    }
                });
            }
        )
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function showTeamInfo(event, teamId, href, team, leagueId) {
    // add in team information (teams informations)
    event.preventDefault();

    // let leagueId = leagueId;

    const listTeamName = team;

    const url = href;
    fetch(url, {
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

                response.json().then(function (data) {
                    // not pulling in team name ****FIX***

                    if (data.response == '') {
                        const displayLeagues = document.getElementById('showLeagues');
                        displayLeagues.innerHTML = '';
                        const displayTeamsById = document.getElementById('showTeams');
                        displayTeamsById.innerHTML = '';
                        const displayPlayers = document.getElementById('showPlayers');
                        displayPlayers.innerHTML = '';

                        const teamName = document.createElement('h1');
                        teamName.textContent = listTeamName;
                        teamName.setAttribute('class', 'center_text');

                        let statement = document.createElement('h3');
                        statement.setAttribute('class', 'center_text');
                        statement.textContent = `We're sorry. There is no information for ${listTeamName} currently.`

                        displayPlayers.appendChild(teamName);
                        displayPlayers.appendChild(statement);
                    } else {
                        const team = data.response;

                        const displayLeagues = document.getElementById('showLeagues');
                        displayLeagues.innerHTML = '';
                        const displayTeamsById = document.getElementById('showTeams');
                        displayTeamsById.innerHTML = '';
                        const displayPlayers = document.getElementById('showPlayers');
                        displayPlayers.innerHTML = '';

                        const teamName = document.createElement('h1');
                        teamName.textContent = listTeamName;
                        teamName.setAttribute('class', 'center_text');

                        let favoriteBtn = document.createElement('button');
                        favoriteBtn.innerText = 'Set As Favorite';
                        favoriteBtn.setAttribute('class', 'favoriteBtn');
                        favoriteBtn.id = teamId;
                        favoriteBtn.href = `${baseURL}teams/statistics?league=${leagueId}&season=2021&team=${teamId}`
                        // favoriteBtn.setAttribute('onclick', `setAsFavorite(event, ${teamId}, href)`);
                        const displayFavoriteTeam = document.getElementById('displayFavorite');
                        favoriteBtn.addEventListener('click', (event) => {
                            setAsFavorite(event, teamId, favoriteBtn.href);
                            // addFavoriteTeam(displayFavoriteTeam.innerHTML);
                        });

                        let outerDiv = document.createElement('div');
                        outerDiv.setAttribute('class', 'team');

                        displayPlayers.appendChild(teamName);
                        displayPlayers.appendChild(favoriteBtn);

                        for (let i = 0; i < team.length; i++) {
                            let innerDiv = document.createElement('div');
                            innerDiv.setAttribute('class', 'teamPlayers')

                            let photo = document.createElement('img');
                            photo.setAttribute('width', "150px");
                            photo.src = team[i].player.photo;

                            let playerName = document.createElement('h4');
                            playerName.setAttribute('class', 'center_text');
                            const firstName = team[i].player.firstname;
                            const lastName = team[i].player.lastname;
                            playerName.textContent = `${firstName} ${lastName}`;

                            let details = document.createElement('div');
                            details.setAttribute('class', 'details');

                            let playerAge = document.createElement('h4');
                            //playerAge.setAttribute('class')
                            playerAge.textContent = `Age: ${team[i].player.age}`;

                            let playerPosition = document.createElement('h4');
                            playerPosition.textContent = team[i].statistics[0].games.position;

                            // need to look for sidelined (sidelined by player id)
                            let injured = document.createElement('h4');
                            injured.textContent = 'INJURED'
                            injured.value = team[i].player.injured;
                            injured.setAttribute('class', 'injured');
                            if (injured.value == false) {
                                injured.setAttribute('class', 'hidden');
                            }


                            let a = document.createElement('a');
                            a.id = team[i].player.id;
                            a.href = '#'; //come back and set
                            //a.setAttribute()

                            a.appendChild(photo);
                            a.appendChild(playerName);
                            details.appendChild(playerAge);
                            details.appendChild(playerPosition);
                            details.appendChild(injured);
                            a.appendChild(details);
                            innerDiv.appendChild(a);
                            outerDiv.appendChild(innerDiv);
                            displayPlayers.appendChild(outerDiv);

                        }
                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function setAsFavorite(event, id, href) {
    event.preventDefault();

    const url = href;
    // const url = `${baseURL}teams/statistics?league=${a}$season=2021&team=${id}`;
    fetch(url, {
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

                response.json().then(async function (data) {
                    // not pulling in team name ****FIX***
                    const displayFavoriteTeam = document.getElementById('displayFavorite');
                    displayFavoriteTeam.innerHTML = '';

                    const div = document.createElement('div');

                    const leagueName = document.createElement('h2');
                    leagueName.textContent = data.response.team.name;

                    displayFavoriteTeam.appendChild(leagueName);

                    const info = data.response;

                    const left = document.createElement('div');
                    left.id = 'left';

                    const right = document.createElement('div');
                    right.id = 'right';

                    const fixtures = document.createElement('div');
                    fixtures.id = 'fixtures';

                    const cards = document.createElement('div');
                    cards.id = 'cards';

                    const upcoming = document.createElement('div');
                    upcoming.id = 'upcoming';

                    const match = document.createElement('div');
                    match.id = 'match';

                    // Pull in current season year and display??
                    const season = document.createElement('h3');
                    season.textContent = 'Current Season Stats';

                    const wins = document.createElement('h4');
                    // wins.textContent = `Wins: ${info.fixtures.wins.total}`;
                    wins.textContent = `Won: ${info.fixtures.wins.total}`;

                    const losses = document.createElement('h4');
                    // losses.textContent = `Losses: ${info.fixtures.loses.total}`;
                    losses.textContent = `Lost: ${info.fixtures.loses.total}`;

                    const draws = document.createElement('h4');
                    // draws.textContent = `Draws: ${info.fixtures.draws.total}`;
                    draws.textContent = `Draw: ${info.fixtures.draws.total}`;

                    const redCards = document.createElement('h4');
                    const red = info.cards.red;
                    const redArray = Object.entries(red);
                    let redCardTotal = 0;
                    for (let i = 0; i < redArray.length; i++) {
                        let total = redArray[i][1].total;
                        if (total == null) {
                            redCardTotal += parseInt(0);
                        } else {
                            redCardTotal += parseInt(total);
                        }
                    }
                    redCards.textContent = `Red Cards: ${redCardTotal}`;

                    const yellowCards = document.createElement('h4');
                    const yellow = info.cards.yellow;
                    const yellowArray = Object.entries(yellow);
                    let yellowCardTotal = 0;
                    for (let i = 0; i < yellowArray.length; i++) {
                        let total = yellowArray[i][1].total;
                        if (total == null) {
                            yellowCardTotal += parseInt(0);
                        } else {
                            yellowCardTotal += parseInt(total);
                        }
                    }
                    yellowCards.textContent = `Yellow Cards: ${yellowCardTotal}`;

                    const homeFlag = document.createElement('img');
                    homeFlag.src = info.team.logo;
                    homeFlag.setAttribute('width', '75px');


                    fixtures.appendChild(wins);
                    fixtures.appendChild(losses);
                    fixtures.appendChild(draws);
                    cards.appendChild(redCards);
                    cards.appendChild(yellowCards);
                    match.appendChild(homeFlag);

                    const nextGame = document.createElement('h4');
                    const findGame = await findNextGame(id);
                    if (findGame != undefined) {
                        const prettyGame = prettyDate(findGame);
                        nextGame.textContent = prettyGame;

                        const vs = document.createElement('h4');
                        vs.textContent = ' VS ';

                        const oppFlag = document.createElement('img');
                        oppFlag.src = await findOppFlag(id, findGame);
                        oppFlag.setAttribute('width', '75px');

                        const location = document.createElement('h4');
                        const findLocation = await findGameLocation(id, findGame);
                        location.textContent = findLocation;

                        match.appendChild(vs);
                        match.appendChild(oppFlag);
                        upcoming.appendChild(match);
                        upcoming.appendChild(nextGame);
                        upcoming.appendChild(location);
                    } else {
                        nextGame.textContent = 'Current Season has Ended';

                        upcoming.appendChild(match);
                        upcoming.appendChild(nextGame);
                    }

                    // fixtures.appendChild(wins);
                    // fixtures.appendChild(losses);
                    // fixtures.appendChild(draws);
                    // cards.appendChild(redCards);
                    // cards.appendChild(yellowCards);
                    // match.appendChild(homeFlag);
                    // match.appendChild(vs);
                    // match.appendChild(oppFlag);
                    // upcoming.appendChild(match);
                    // upcoming.appendChild(nextGame);
                    // upcoming.appendChild(location);

                    // addFavoriteTeam(displayFavoriteTeam.innerHTML);

                    left.appendChild(season);
                    left.appendChild(fixtures);
                    left.appendChild(cards);
                    right.appendChild(upcoming);

                    div.appendChild(left);
                    div.appendChild(right);
                    displayFavoriteTeam.appendChild(div);

                    addFavoriteTeam(displayFavoriteTeam.innerHTML);
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

async function findNextGame(id) {
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

function prettyDate(findGame) {
    if (findGame == undefined) {
        return null;
    } else {
        // const date = findGame;

        const dayOfWeek = findGame.toLocaleString('default', {
            weekday: 'short'
        });
        const month = findGame.toLocaleString('default', {
            month: 'short'
        });
        const day = findGame.getDate();
        let hours = findGame.getHours();
        let minutes = findGame.getMinutes().toString();
        let meridiem = " AM";
        const timeZone = findGame.toLocaleDateString(undefined, {
            day: '2-digit',
            timeZoneName: 'short'
        }).substring(4);

        if (hours > 12) {
            hours = hours - 12;
            meridiem = " PM";
        } else if (hours === 0) {
            hours = 12;
        }

        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return `${dayOfWeek} ${month} ${day} - ${hours}:${minutes} ${meridiem} ${timeZone}`;
    }
}

async function findOppFlag(id, findGame) {
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

async function findGameLocation(id, findGame) {
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