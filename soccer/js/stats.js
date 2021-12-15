import {
    addFavoriteTeam
} from "./favorites.js";

const baseURL = "https://api-football-v1.p.rapidapi.com/v3/"
const spinner = document.getElementById("spinner");

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
    spinner.removeAttribute('hidden');
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
                    const buildNav = document.getElementById('navBar');
                    buildNav.innerHTML = '';

                    const displayLeagues = document.getElementById('showLeagues');
                    displayLeagues.innerHTML = '';
                    const displayTeamsById = document.getElementById('showTeams');
                    displayTeamsById.innerHTML = '';
                    const displayPlayers = document.getElementById('showPlayers');
                    displayPlayers.innerHTML = '';
                    const displayIndPlayer = document.getElementById('showIndPlayer');
                    displayIndPlayer.innerHTML = '';

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

                            a.addEventListener('click', (event) => showTeamsInLeague(event, a.href, leagueId));
                            // change team pull to teams/team information

                            let logo = document.createElement('img');
                            logo.setAttribute('width', '150px');
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

                            spinner.setAttribute('hidden', '');
                        }
                    }
                });
            }
        )
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function showTeamsInLeague(event, leagueHref, leagueId) {
    event.preventDefault();
    spinner.removeAttribute('hidden');

    // let leagueId = leagueId

    const url = leagueHref;
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
                    const displayIndPlayer = document.getElementById('showIndPlayer');
                    displayIndPlayer.innerHTML = '';

                    const league = document.createElement('h1');
                    // league.textContent = document.getElementById(id).h4.value;
                    const countryName = data.response[0].league.country;
                    const leagueName = data.response[0].league.name;
                    league.textContent = `${countryName} - ${leagueName}`
                    league.setAttribute('class', 'center_text');
                    displayTeamsById.appendChild(league);

                    const buildNav = document.getElementById('navBar');
                    buildNav.innerHTML = '';

                    const ul = document.createElement('ul');
                    const li1 = document.createElement('li');

                    // // country
                    const a1 = document.createElement('a');
                    a1.textContent = countryName;
                    // a.href = oldHref;
                    a1.addEventListener('click', () => showLeaguesByCountry())

                    li1.appendChild(a1);
                    ul.appendChild(li1);
                    buildNav.appendChild(ul);

                    // const leagueId = data.response[0].league.id;

                    const conferences = data.response[0].league.standings;

                    for (let i = 0; i < conferences.length; i++) {
                        const conferenceName = document.createElement('h2');
                        conferenceName.textContent = conferences[i][0].group;

                        const displayConference = document.createElement('div');
                        displayConference.setAttribute('class', "displayConference")
                        const standingsTable = document.createElement('div');
                        standingsTable.id = "standingsTable";
                        const displayTeams = document.createElement('div');
                        displayTeams.id = "displayTeams";

                        displayConference.appendChild(conferenceName);
                        // displayConference.appendChild(displayTeams);

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

                        // bring back??
                        const teams = data.response[0].league.standings[i];

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
                            // let team = teams[i].team.name;
                            let team = teamName.textContent;

                            let teamId = teams[i].team.id;

                            let a = document.createElement('a');
                            a.id = teams[i].team.id;
                            // **********COME BACK AND MAKE DATE DYNAMIC*************
                            // a.href = `${baseURL}players?team=${a.id}&season=${2021}`

                            // try pull with players squad
                            a.href = `${baseURL}players/squads?team=${a.id}`
                            a.value = `${countryName} - ${leagueName} - ${team}`
                            a.addEventListener('click', (event) => showTeamInfo(event, teamId, a.href, a.value, leagueId, leagueHref))

                            a.appendChild(logo);
                            a.appendChild(teamName);
                            div.appendChild(a);

                            displayTeams.appendChild(div);
                            standingsTable.appendChild(table);

                        }
                        displayConference.appendChild(standingsTable);
                        displayConference.appendChild(displayTeams);
                        displayTeamsById.appendChild(displayConference);

                        spinner.setAttribute('hidden', '');
                    }
                });
            }
        )
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function showTeamInfo(event, teamId, href, team, leagueId, leagueHref) {
    // add in team information (teams informations)
    event.preventDefault();
    spinner.removeAttribute('hidden');

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

                response.json().then(async function (data) {
                    const buildNav = document.getElementById('navBar');
                    buildNav.innerHTML = '';

                    const countryNameForNav = team.substring(0, team.indexOf('-'));
                    const leagueNameForNav = team.substring(team.indexOf('-') + 1, team.lastIndexOf('-'));

                    const ul = document.createElement('ul');
                    const li1 = document.createElement('li');
                    const li2 = document.createElement('li');


                    // // country
                    const a1 = document.createElement('a');
                    a1.textContent = countryNameForNav;
                    // a.href = oldHref;
                    a1.addEventListener('click', (event) => showLeaguesByCountry(event))

                    // league
                    const a2 = document.createElement('a');
                    a2.textContent = leagueNameForNav;
                    // a.href = oldHref;
                    a2.addEventListener('click', (event) => showTeamsInLeague(event, leagueHref, leagueId))

                    li1.appendChild(a1);
                    li2.appendChild(a2);
                    ul.appendChild(li1);
                    ul.appendChild(li2);
                    buildNav.appendChild(ul);
                    // not pulling in team name ****FIX***

                    if (data.response == '') {
                        const displayLeagues = document.getElementById('showLeagues');
                        displayLeagues.innerHTML = '';
                        const displayTeamsById = document.getElementById('showTeams');
                        displayTeamsById.innerHTML = '';
                        const displayPlayers = document.getElementById('showPlayers');
                        displayPlayers.innerHTML = '';
                        const displayIndPlayer = document.getElementById('showIndPlayer');
                        displayIndPlayer.innerHTML = '';

                        const teamName = document.createElement('h1');
                        teamName.textContent = listTeamName;
                        teamName.setAttribute('class', 'center_text');

                        let statement = document.createElement('h3');
                        statement.setAttribute('class', 'center_text');
                        statement.textContent = `We're sorry. There is no information for ${listTeamName} currently.`

                        displayPlayers.appendChild(teamName);
                        displayPlayers.appendChild(statement);

                        spinner.setAttribute('hidden', '');
                    } else {
                        // change info pull to player squads ??
                        // current info pull is fine, need to pull from all info pages...
                        // const team = data.response;
                        const teamInfo = data.response[0].players;

                        const displayLeagues = document.getElementById('showLeagues');
                        displayLeagues.innerHTML = '';
                        const displayTeamsById = document.getElementById('showTeams');
                        displayTeamsById.innerHTML = '';
                        const displayPlayers = document.getElementById('showPlayers');
                        displayPlayers.innerHTML = '';
                        const displayIndPlayer = document.getElementById('showIndPlayer');
                        displayIndPlayer.innerHTML = '';

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
                            setAsFavorite(event, teamId, href, listTeamName, leagueId, leagueHref, favoriteBtn.href);
                            // addFavoriteTeam(displayFavoriteTeam.innerHTML);
                        });

                        let outerDiv = document.createElement('div');
                        outerDiv.setAttribute('class', 'team');

                        displayPlayers.appendChild(teamName);
                        displayPlayers.appendChild(favoriteBtn);

                        // insert next game info
                        let upcomingMatch = document.createElement('div');
                        upcomingMatch.id = "upcoming_match";

                        const matchUp = document.createElement('div');
                        matchUp.id = 'match_up';

                        const nextGameTitle = document.createElement('h4');
                        nextGameTitle.textContent = "NEXT GAME";
                        nextGameTitle.id = "next_game_title";

                        const nextGame = document.createElement('h4');
                        const findGame = await findNextGame(teamId);

                        const homeFlag = document.createElement('img');
                        homeFlag.src = await findHomeFlag(teamId)
                        homeFlag.setAttribute('width', '75px');

                        upcomingMatch.appendChild(nextGameTitle);
                        matchUp.appendChild(homeFlag);
                        if (findGame != undefined) {
                            const prettyGame = prettyDate(findGame);
                            nextGame.textContent = prettyGame;

                            const vs = document.createElement('h4');
                            vs.textContent = ' VS ';

                            const oppFlag = document.createElement('img');
                            oppFlag.src = await findOppFlag(teamId, findGame);
                            oppFlag.setAttribute('width', '75px');

                            const location = document.createElement('h4');
                            const findLocation = await findGameLocation(teamId, findGame);
                            location.textContent = findLocation;

                            matchUp.appendChild(vs);
                            matchUp.appendChild(oppFlag);
                            upcomingMatch.appendChild(matchUp);
                            upcomingMatch.appendChild(nextGame);
                            upcomingMatch.appendChild(location);
                        } else {
                            nextGame.textContent = 'Current Season has Ended';

                            upcomingMatch.appendChild(matchUp);
                            upcomingMatch.appendChild(nextGame);
                        }
                        // end of next game info

                        for (let i = 0; i < team.length; i++) {
                            let innerDiv = document.createElement('div');
                            innerDiv.setAttribute('class', 'teamPlayers')

                            let photo = document.createElement('img');
                            photo.setAttribute('width', "100px");
                            // photo.src = team[i].player.photo;
                            photo.src = teamInfo[i].photo;

                            let playerName = document.createElement('h5');
                            playerName.setAttribute('class', 'center_text');
                            playerName.textContent = teamInfo[i].name;

                            let details = document.createElement('div');
                            details.setAttribute('class', 'details');

                            let playerAge = document.createElement('h5');
                            //playerAge.setAttribute('class')
                            // playerAge.textContent = `Age: ${team[i].player.age}`;
                            playerAge.textContent = `Age: ${teamInfo[i].age}`;

                            let playerPosition = document.createElement('h5');
                            // playerPosition.textContent = team[i].statistics[0].games.position;
                            playerPosition.textContent = teamInfo[i].position;

                            // need to look for sidelined (sidelined by player id)
                            // let injured = document.createElement('h4');
                            // injured.textContent = 'INJURED'
                            // injured.value = team[i].player.injured;
                            // injured.setAttribute('class', 'injured');
                            // if (injured.value == false) {
                            //     injured.setAttribute('class', 'hidden');
                            // }

                            // find captain (statistics/captain)
                            let a = document.createElement('a');
                            a.id = teamInfo[i].id;
                            a.value = teamInfo[i].name; //Come back and change
                            a.href = `${baseURL}players?id=${a.id}&season=2021`;
                            a.addEventListener('click', (event) => showPlayerInfo(event, a.href, a.value, listTeamName, href, teamId, leagueId, leagueHref));

                            a.appendChild(photo);
                            a.appendChild(playerName);
                            details.appendChild(playerAge);
                            details.appendChild(playerPosition);
                            // details.appendChild(injured);
                            a.appendChild(details);
                            innerDiv.appendChild(a);
                            outerDiv.appendChild(innerDiv);
                            displayPlayers.appendChild(upcomingMatch)
                            displayPlayers.appendChild(outerDiv);

                            spinner.setAttribute('hidden', '');
                        }
                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function showPlayerInfo(event, playerHref, value, team, teamHref, teamId, leagueId, leagueHref) {
    event.preventDefault();
    spinner.removeAttribute('hidden');

    const listPlayerName = value;

    const url = playerHref;
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
                    const buildNav = document.getElementById('navBar');
                    buildNav.innerHTML = '';

                    const countryNameForNav = team.substring(0, team.indexOf('-'));
                    const leagueNameForNav = team.substring(team.indexOf('-') + 1, team.lastIndexOf('-'));
                    const teamNameForNav = team.substring(team.lastIndexOf('-') + 2);
                    const ul = document.createElement('ul');
                    const li1 = document.createElement('li');
                    const li2 = document.createElement('li');
                    const li3 = document.createElement('li');

                    // // country
                    const a1 = document.createElement('a');
                    a1.textContent = countryNameForNav;
                    // a.href = oldHref;
                    a1.addEventListener('click', (event) => showLeaguesByCountry(event))

                    // league
                    const a2 = document.createElement('a');
                    a2.textContent = leagueNameForNav;
                    // a.href = oldHref;
                    a2.addEventListener('click', (event) => showTeamsInLeague(event, leagueHref, leagueId))

                    // team
                    const a3 = document.createElement('a');
                    a3.textContent = teamNameForNav;
                    // a.href = oldHref;
                    a3.addEventListener('click', (event) => showTeamInfo(event, teamId, teamHref, team, leagueId))

                    li1.appendChild(a1);
                    li2.appendChild(a2);
                    li3.appendChild(a3);
                    ul.appendChild(li1);
                    ul.appendChild(li2);
                    ul.appendChild(li3)
                    buildNav.appendChild(ul);

                    if (data.response == '') {
                        const displayLeagues = document.getElementById('showLeagues');
                        displayLeagues.innerHTML = '';
                        const displayTeamsById = document.getElementById('showTeams');
                        displayTeamsById.innerHTML = '';
                        const displayPlayers = document.getElementById('showPlayers');
                        displayPlayers.innerHTML = '';
                        const displayIndPlayer = document.getElementById('showIndPlayer');
                        displayIndPlayer.innerHTML = '';

                        const teamName = document.createElement('h1');
                        teamName.textContent = team;
                        teamName.setAttribute('class', 'center_text');

                        let statement = document.createElement('h3');
                        statement.setAttribute('class', 'center_text');
                        statement.textContent = `We're sorry. There is no information for ${listPlayerName} currently.`

                        displayIndPlayer.appendChild(teamName);
                        displayIndPlayer.appendChild(statement);

                        spinner.setAttribute('hidden', '');
                    } else {
                        const playerInfo = data.response[0];

                        const displayLeagues = document.getElementById('showLeagues');
                        displayLeagues.innerHTML = '';
                        const displayTeamsById = document.getElementById('showTeams');
                        displayTeamsById.innerHTML = '';
                        const displayPlayers = document.getElementById('showPlayers');
                        displayPlayers.innerHTML = '';
                        const displayIndPlayer = document.getElementById('showIndPlayer');
                        displayIndPlayer.innerHTML = '';

                        const teamName = document.createElement('h1');
                        teamName.textContent = team;
                        teamName.setAttribute('class', 'center_text');
                        displayIndPlayer.appendChild(teamName);

                        const outerDiv = document.createElement('div');
                        outerDiv.id = 'player_info';

                        const innerDiv1 = document.createElement('div');

                        const playerPhoto = document.createElement('img');
                        playerPhoto.setAttribute('width', '300px');
                        playerPhoto.src = playerInfo.player.photo;

                        innerDiv1.appendChild(playerPhoto);
                        innerDiv1.id = 'image_border';

                        const innerDiv2 = document.createElement('div');
                        innerDiv2.id = 'innerDiv2';

                        //start innerDiv2
                        const playerName = document.createElement('h3');
                        const first = playerInfo.player.firstname;
                        const last = playerInfo.player.lastname;
                        playerName.textContent = `${first} ${last}`;
                        playerName.setAttribute('class', 'strong');

                        const playerDOB = document.createElement('h4');
                        playerDOB.textContent = `Date of Birth: ${playerInfo.player.birth.date}`;

                        const playerNationality = document.createElement('h4');
                        playerNationality.textContent = `Nationality: ${playerInfo.player.nationality}`;

                        const playerPosition = document.createElement('h4');
                        playerPosition.textContent = `Position: ${playerInfo.statistics[0].games.position}`;
                        //end innerDiv2

                        // const innerDiv3 = document.createElement('div');
                        // innerDiv3.id = 'innerDiv3';


                        const playerStats = playerInfo.statistics;

                        for (let i = 0; i < playerStats.length; i++) {
                            //start innerDiv3
                            const innerDiv4 = document.createElement('div');
                            innerDiv4.setAttribute('class', 'innerDiv4');

                            const teamDiv = document.createElement('div');
                            teamDiv.id = 'teamDiv';

                            // chang team name to 'team - league'
                            const teamTitle = document.createElement('h5');
                            teamTitle.textContent = "TEAM";
                            teamTitle.id = "teamTitle";

                            const playerTeamName = playerStats[i].team.name;
                            const playerLeagueName = playerStats[i].league.name;

                            const playerTeam = document.createElement('h4');
                            // playerTeam.textContent = `Team: ${playerStats[i].team.name}`;
                            playerTeam.textContent = `${playerTeamName} - ${playerLeagueName}`;
                            playerTeam.setAttribute('class', 'strong');

                            // const playerLeague = document.createElement('h4');
                            // playerLeague.textContent = `League: ${playerStats[i].league.name}`;

                            // const playerPos = `Position: ${playerStats[i].games.position}`;
                            let playerAppear = '';
                            if (playerStats[i].games.appearences == null) {
                                playerAppear = `Appearances: 0`;
                            } else {
                                playerAppear = `Appearances: ${playerStats[i].games.appearences}`;
                            }

                            let PlayerMinutes = '';
                            if (playerStats[i].games.minutes == null) {
                                PlayerMinutes = `Minutes Played: 0`;
                            } else {
                                PlayerMinutes = `Minutes Played: ${playerStats[i].games.minutes}`;
                            }

                            const playerApp = document.createElement('h4');
                            // playerPosition.textContent = `Position: ${playerStats[i].games.position}`;
                            playerApp.textContent = `${playerAppear} | ${PlayerMinutes}`;

                            // const playerApp = document.createElement('h4');
                            // playerApp.textContent = `Appearances: ${playerStats[i].games.appearences}`;

                            teamDiv.appendChild(teamTitle);
                            teamDiv.appendChild(playerTeam);
                            // teamDiv.appendChild(playerLeague);
                            // teamDiv.appendChild(playerPosition);
                            teamDiv.appendChild(playerApp);
                            innerDiv4.appendChild(teamDiv);

                            if (playerStats[i].games.position == 'Midfielder' || playerStats[i].games.position == 'Defender') {
                                const duelsDiv = document.createElement('div');
                                duelsDiv.id = 'duelsDiv';

                                const duelsTitle = document.createElement('h5');
                                duelsTitle.textContent = "DUELS";
                                duelsTitle.id = "duelsTitle";

                                const totalDuels = document.createElement('h4');
                                if (playerStats[i].duels.total == null) {
                                    totalDuels.textContent = `Total: 0`;
                                } else {
                                    totalDuels.textContent = `Total: ${playerStats[i].duels.total}`;
                                }

                                const wonDuels = document.createElement('h4');
                                if (playerStats[i].duels.won == null) {
                                    wonDuels.textContent = `Won: 0`;
                                } else {
                                    wonDuels.textContent = `Won: ${playerStats[i].duels.won}`;
                                }

                                const passesDiv = document.createElement('div');
                                passesDiv.id = 'passesDiv';

                                const passesTitle = document.createElement('h5');
                                passesTitle.textContent = "PASSES";
                                passesTitle.id = "passesTitle";

                                const keyPass = document.createElement('h4');
                                if (playerStats[i].passes.key == null) {
                                    keyPass.textContent = `Key: 0`;
                                } else {
                                    keyPass.textContent = `Key: ${playerStats[i].passes.key}`;
                                }

                                const totalPass = document.createElement('h4');
                                if (playerStats[i].passes.total == null) {
                                    totalPass.textContent = `Total: 0`;
                                } else {
                                    totalPass.textContent = `Total: ${playerStats[i].passes.total}`;
                                }

                                const foulsDiv = document.createElement('div');
                                foulsDiv.id = 'foulsDiv';

                                const foulsTitle = document.createElement('h5');
                                foulsTitle.textContent = "FOULS";
                                foulsTitle.id = "foulsTitle";

                                const foulsCommitted = document.createElement('h4');
                                if (playerStats[i].fouls.committed == null) {
                                    foulsCommitted.textContent = `Committed: 0`;
                                } else {
                                    foulsCommitted.textContent = `Committed: ${playerStats[i].fouls.committed}`
                                }

                                const foulsDrawn = document.createElement('h4');
                                if (playerStats[i].fouls.drawn == null) {
                                    foulsDrawn.textContent = `Drawn: 0`;
                                } else {
                                    foulsDrawn.textContent = `Drawn: ${playerStats[i].fouls.drawn}`
                                }

                                const tackleDiv = document.createElement('div');
                                tackleDiv.id = 'tackleDiv';

                                const tackleTitle = document.createElement('h5');
                                tackleTitle.textContent = "TACKLES";
                                tackleTitle.id = "tackleTitle";

                                const interception = document.createElement('h4');
                                if (playerStats[i].tackles.interceptions == null) {
                                    interception.textContent = `Interceptions: 0`;
                                } else {
                                    interception.textContent = `Interceptions: ${playerStats[i].tackles.interceptions}`;
                                }

                                const totalInt = document.createElement('h4');
                                if (playerStats[i].tackles.total == null) {
                                    totalInt.textContent = `Total: 0`;
                                } else {
                                    totalInt.textContent = `Total: ${playerStats[i].tackles.total}`;
                                }

                                const cardsDiv = document.createElement('div');
                                cardsDiv.id = 'cardsDiv';

                                const cardsTitle = document.createElement('h5');
                                cardsTitle.textContent = "CARDS";
                                cardsTitle.id = "cardsTitle";

                                const totalYellow = document.createElement('h4');
                                if (playerStats[i].cards.yellow == null) {
                                    totalYellow.textContent = `Yellow: 0`;
                                } else {
                                    totalYellow.textContent = `Yellow: ${playerStats[i].cards.yellow}`;
                                }

                                const totalRed = document.createElement('h4');
                                if (playerStats[i].cards.red == null) {
                                    totalRed.textContent = `Red: 0`;
                                } else {
                                    totalRed.textContent = `Red: ${playerStats[i].cards.red}`;
                                }

                                const penaltyDiv = document.createElement('div');
                                penaltyDiv.id = 'penaltyDiv';

                                const penaltyTitle = document.createElement('h5');
                                penaltyTitle.textContent = "PENALTIES";
                                penaltyTitle.id = 'penaltyTitle';

                                const penaltyCom = document.createElement('h4');
                                if (playerStats[i].penalty.commited == null) {
                                    penaltyCom.textContent = `Committed: 0`;
                                } else {
                                    penaltyCom.textContent = `Committed: ${playerStats[i].penalty.commited}`;
                                }

                                const penaltyWon = document.createElement('h4');
                                if (playerStats[i].penalty.won == null) {
                                    penaltyWon.textContent = `Won: 0`;
                                } else {
                                    penaltyWon.textContent = `Won: ${playerStats[i].penalty.won}`;
                                }

                                const hr = document.createElement('hr');
                                hr.setAttribute('width', '100%');

                                duelsDiv.appendChild(duelsTitle);
                                duelsDiv.appendChild(totalDuels);
                                duelsDiv.appendChild(wonDuels);

                                passesDiv.appendChild(passesTitle);
                                passesDiv.appendChild(keyPass);
                                passesDiv.appendChild(totalPass);

                                foulsDiv.appendChild(foulsTitle);
                                foulsDiv.appendChild(foulsCommitted);
                                foulsDiv.appendChild(foulsDrawn);

                                tackleDiv.appendChild(tackleTitle);
                                tackleDiv.appendChild(interception);
                                tackleDiv.appendChild(totalInt);

                                cardsDiv.appendChild(cardsTitle);
                                cardsDiv.appendChild(totalYellow);
                                cardsDiv.appendChild(totalRed);

                                penaltyDiv.appendChild(penaltyTitle);
                                penaltyDiv.appendChild(penaltyCom);
                                penaltyDiv.appendChild(penaltyWon);

                                innerDiv4.appendChild(duelsDiv);
                                innerDiv4.appendChild(passesDiv);
                                innerDiv4.appendChild(foulsDiv);
                                innerDiv4.appendChild(tackleDiv);
                                innerDiv4.appendChild(cardsDiv);
                                innerDiv4.appendChild(penaltyDiv);
                                innerDiv4.appendChild(hr);
                                outerDiv.appendChild(innerDiv4);
                            } else if (playerStats[i].games.position == 'Goalkeeper') {
                                const goalsDiv = document.createElement('div');
                                goalsDiv.id = 'goalsDiv';

                                const goalsTitle = document.createElement('h5');
                                goalsTitle.textContent = "GOALS";
                                goalsTitle.id = "goalsTitle";

                                const goalsConceded = document.createElement('h4');
                                if (playerStats[i].goals.conceded == null) {
                                    goalsConceded.textContent = `Conceded: 0`;
                                } else {
                                    goalsConceded.textContent = `Conceded: ${playerStats[i].goals.conceded}`;
                                }

                                const goalsSaved = document.createElement('h4');
                                if (playerStats[i].goals.saved == null) {
                                    goalsSaved.textContent = `Saved: 0`;
                                } else {
                                    goalsSaved.textContent = `Saved: ${playerStats[i].goals.saved}`;
                                }

                                const cardsDiv = document.createElement('div');
                                cardsDiv.id = 'cardsDiv';

                                const cardsTitle = document.createElement('h5');
                                cardsTitle.textContent = "CARDS";
                                cardsTitle.id = "cardsTitle";

                                const totalYellow = document.createElement('h4');
                                if (playerStats[i].cards.yellow == null) {
                                    totalYellow.textContent = `Yellow: 0`;
                                } else {
                                    totalYellow.textContent = `Yellow: ${playerStats[i].cards.yellow}`;
                                }

                                const totalRed = document.createElement('h4');
                                if (playerStats[i].cards.red == null) {
                                    totalRed.textContent = `Red: 0`;
                                } else {
                                    totalRed.textContent = `Red: ${playerStats[i].cards.red}`;
                                }
                                const penaltyDiv = document.createElement('div');
                                penaltyDiv.id = 'penaltyDiv';

                                const penaltyTitle = document.createElement('h5');
                                penaltyTitle.textContent = "PENALTYS";
                                penaltyTitle.id = 'penaltyTitle';

                                const penaltyCom = document.createElement('h4');
                                if (playerStats[i].penalty.commited == null) {
                                    penaltyCom.textContent = `Committed: 0`;
                                } else {
                                    penaltyCom.textContent = `Committed: ${playerStats[i].penalty.commited}`;
                                }

                                const penaltySaved = document.createElement('h4');
                                if (playerStats[i].penalty.saved == null) {
                                    penaltySaved.textContent = `Saved: 0`;
                                } else {
                                    penaltySaved.textContent = `Saved: ${playerStats[i].penalty.saved}`;
                                }

                                const hr = document.createElement('hr');
                                hr.setAttribute('width', '100%');

                                goalsDiv.appendChild(goalsTitle);
                                goalsDiv.appendChild(goalsConceded);
                                goalsDiv.appendChild(goalsSaved);

                                cardsDiv.appendChild(cardsTitle);
                                cardsDiv.appendChild(totalYellow);
                                cardsDiv.appendChild(totalRed);

                                penaltyDiv.appendChild(penaltyTitle);
                                penaltyDiv.appendChild(penaltyCom);
                                penaltyDiv.appendChild(penaltySaved);

                                innerDiv4.appendChild(goalsDiv);
                                innerDiv4.appendChild(cardsDiv);
                                innerDiv4.appendChild(penaltyDiv);
                                innerDiv4.appendChild(hr);
                                outerDiv.appendChild(innerDiv4);
                            } else if (playerStats[i].games.position == 'Attacker') {
                                const duelsDiv = document.createElement('div');
                                duelsDiv.id = 'duelsDiv';

                                const duelsTitle = document.createElement('h5');
                                duelsTitle.textContent = "DUELS";
                                duelsTitle.id = "duelsTitle";

                                const totalDuels = document.createElement('h4');
                                if (playerStats[i].duels.total == null) {
                                    totalDuels.textContent = `Total: 0`;
                                } else {
                                    totalDuels.textContent = `Total: ${playerStats[i].duels.total}`;
                                }

                                const wonDuels = document.createElement('h4');
                                if (playerStats[i].duels.won == null) {
                                    wonDuels.textContent = `Won: 0`;
                                } else {
                                    wonDuels.textContent = `Won: ${playerStats[i].duels.won}`;
                                }

                                const shotsDiv = document.createElement('div');
                                shotsDiv.id = 'shotsDiv';

                                const shotsTitle = document.createElement('h5');
                                shotsTitle.textContent = "SHOTS";
                                shotsTitle.id = "shotsTitle";

                                const totalShots = document.createElement('h4');
                                if (playerStats[i].shots.total == null) {
                                    totalShots.textContent = `Total: 0`;
                                } else {
                                    totalShots.textContent = `Total: ${playerStats[i].shots.total}`;
                                }

                                const onShots = document.createElement('h4');
                                if (playerStats[i].shots.on == null) {
                                    onShots.textContent = `On Goal: 0`;
                                } else {
                                    onShots.textContent = `On Goal: ${playerStats[i].shots.on}`;
                                }

                                const foulsDiv = document.createElement('div');
                                foulsDiv.id = 'foulsDiv';

                                const foulsTitle = document.createElement('h5');
                                foulsTitle.textContent = "FOULS";
                                foulsTitle.id = "foulsTitle";

                                const foulsCommitted = document.createElement('h4');
                                if (playerStats[i].fouls.committed == null) {
                                    foulsCommitted.textContent = `Committed: 0`;
                                } else {
                                    foulsCommitted.textContent = `Committed: ${playerStats[i].fouls.committed}`
                                }

                                const foulsDrawn = document.createElement('h4');
                                if (playerStats[i].fouls.drawn == null) {
                                    foulsDrawn.textContent = `Drawn: 0`;
                                } else {
                                    foulsDrawn.textContent = `Drawn: ${playerStats[i].fouls.drawn}`
                                }

                                const goalsDiv = document.createElement('div');
                                goalsDiv.id = 'goalsDiv';

                                const goalsTitle = document.createElement('h5');
                                goalsTitle.textContent = "GOALS";
                                goalsTitle.id = "goalsTitle";

                                const goalAssists = document.createElement('h4');
                                if (playerStats[i].goals.assists == null) {
                                    goalAssists.textContent = `Assists: 0`;
                                } else {
                                    goalAssists.textContent = `Assists: ${playerStats[i].goals.assists}`;
                                }

                                const totalGoals = document.createElement('h4');
                                if (playerStats[i].goals.total == null) {
                                    totalGoals.textContent = `Goals: 0`;
                                } else {
                                    totalGoals.textContent = `Goals: ${playerStats[i].goals.total}`;
                                }

                                const cardsDiv = document.createElement('div');
                                cardsDiv.id = 'cardsDiv';

                                const cardsTitle = document.createElement('h5');
                                cardsTitle.textContent = "CARDS";
                                cardsTitle.id = "cardsTitle";

                                const totalYellow = document.createElement('h4');
                                if (playerStats[i].cards.yellow == null) {
                                    totalYellow.textContent = `Yellow: 0`;
                                } else {
                                    totalYellow.textContent = `Yellow: ${playerStats[i].cards.yellow}`;
                                }

                                const totalRed = document.createElement('h4');
                                if (playerStats[i].cards.red == null) {
                                    totalRed.textContent = `Red: 0`;
                                } else {
                                    totalRed.textContent = `Red: ${playerStats[i].cards.red}`;
                                }

                                const penaltyDiv = document.createElement('div');
                                penaltyDiv.id = 'penaltyDiv';

                                const penaltyTitle = document.createElement('h5');
                                penaltyTitle.textContent = "PENALTIES";
                                penaltyTitle.id = 'penaltyTitle';

                                const penaltyMissed = document.createElement('h4');
                                if (playerStats[i].penalty.missed == null) {
                                    penaltyMissed.textContent = `Missed: 0`;
                                } else {
                                    penaltyMissed.textContent = `Missed: ${playerStats[i].penalty.missed}`;
                                }

                                const penaltyScored = document.createElement('h4');
                                if (playerStats[i].penalty.scored == null) {
                                    penaltyScored.textContent = `Scored: 0`;
                                } else {
                                    penaltyScored.textContent = `Scored: ${playerStats[i].penalty.scored}`;
                                }

                                const hr = document.createElement('hr');
                                hr.setAttribute('width', '100%');

                                duelsDiv.appendChild(duelsTitle);
                                duelsDiv.appendChild(totalDuels);
                                duelsDiv.appendChild(wonDuels);

                                shotsDiv.appendChild(shotsTitle);
                                shotsDiv.appendChild(totalShots);
                                shotsDiv.appendChild(onShots);

                                foulsDiv.appendChild(foulsTitle);
                                foulsDiv.appendChild(foulsCommitted);
                                foulsDiv.appendChild(foulsDrawn);

                                goalsDiv.appendChild(goalsTitle);
                                goalsDiv.appendChild(goalAssists);
                                goalsDiv.appendChild(totalGoals);

                                cardsDiv.appendChild(cardsTitle);
                                cardsDiv.appendChild(totalYellow);
                                cardsDiv.appendChild(totalRed);

                                penaltyDiv.appendChild(penaltyTitle);
                                penaltyDiv.appendChild(penaltyMissed);
                                penaltyDiv.appendChild(penaltyScored);

                                innerDiv4.appendChild(duelsDiv);
                                innerDiv4.appendChild(shotsDiv);
                                innerDiv4.appendChild(foulsDiv);
                                innerDiv4.appendChild(goalsDiv);
                                innerDiv4.appendChild(cardsDiv);
                                innerDiv4.appendChild(penaltyDiv);
                                innerDiv4.appendChild(hr);
                                outerDiv.appendChild(innerDiv4);
                            } else {

                            }
                            //end innerDiv3
                        }
                        // add stats??
                        // GK => clean sheets?
                        // Striker => shots on goal?

                        // add teams and leagues (cups/national) play on in current season

                        innerDiv2.appendChild(playerName);
                        innerDiv2.appendChild(playerDOB);
                        innerDiv2.appendChild(playerNationality);
                        innerDiv2.appendChild(playerPosition)
                        outerDiv.appendChild(innerDiv1);
                        outerDiv.appendChild(innerDiv2);
                        // outerDiv.appendChild(innerDiv4);
                        displayIndPlayer.appendChild(outerDiv);

                        spinner.setAttribute('hidden', '');
                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

export function setAsFavorite(event, teamId, href, listTeamName, leagueId, leagueHref, favoriteBtnHref) {
    event.preventDefault();
    spinner.removeAttribute('hidden');

    const url = favoriteBtnHref;
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

                    const leagueName = document.createElement('h1');
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

                    const nextGameTitle = document.createElement('h4');
                    nextGameTitle.textContent = "NEXT GAME";
                    nextGameTitle.id = "next_game_title";

                    const homeFlagLink = document.createElement('a');
                    homeFlagLink.id = "homeFlagLink";
                    //pull back in later once I can solve saving the variables to local storage
                    // homeFlagLink.href = `${baseURL}players/squads?team=${teamId}`;
                    // homeFlagLink.addEventListener('click', (event) => showTeamInfo(event, teamId, href, listTeamName, leagueId, leagueHref))

                    const homeFlag = document.createElement('img');
                    homeFlag.src = info.team.logo;
                    homeFlag.setAttribute('width', '75px');

                    fixtures.appendChild(wins);
                    fixtures.appendChild(losses);
                    fixtures.appendChild(draws);
                    cards.appendChild(redCards);
                    cards.appendChild(yellowCards);
                    upcoming.appendChild(nextGameTitle);
                    homeFlagLink.appendChild(homeFlag);
                    match.appendChild(homeFlagLink);

                    const nextGame = document.createElement('h4');
                    const findGame = await findNextGame(teamId);
                    if (findGame != undefined) {
                        const prettyGame = prettyDate(findGame);
                        nextGame.textContent = prettyGame;

                        const vs = document.createElement('h4');
                        vs.textContent = ' VS ';

                        const oppFlag = document.createElement('img');
                        oppFlag.src = await findOppFlag(teamId, findGame);
                        oppFlag.setAttribute('width', '75px');

                        const location = document.createElement('h4');
                        const findLocation = await findGameLocation(teamId, findGame);
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

                    left.appendChild(season);
                    left.appendChild(fixtures);
                    left.appendChild(cards);
                    right.appendChild(upcoming);

                    div.appendChild(left);
                    div.appendChild(right);
                    displayFavoriteTeam.appendChild(div);

                    addFavoriteTeam(displayFavoriteTeam.innerHTML);
            
                    spinner.setAttribute('hidden', '');
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

async function findHomeFlag(id) {
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

//search player
//search team