const baseURL = "https://api-football-v1.p.rapidapi.com/v3/"

function createListByCountry() {
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

function showLeaguesByCountry() {
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

                            let a = document.createElement('a');
                            a.id = leagues[i].league.id;
                            // **********COME BACK AND MAKE DATE DYNAMIC*************
                            a.href = `${baseURL}standings?season=${2021}&league=${a.id}`
                            a.setAttribute('onclick', 'showTeamsInLeague(event, id, href)')

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

function showTeamsInLeague(event, id, href) {
    event.preventDefault();

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

                    const league = document.createElement('h1');
                    // league.textContent = document.getElementById(id).h4.value;
                    const countryName = data.response[0].league.country;
                    const leagueName = data.response[0].league.name;
                    league.textContent = `${countryName} - ${leagueName}`
                    league.setAttribute('class', 'center_text');
                    displayLeagues.appendChild(league);

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

                        let a = document.createElement('a');
                        a.id = teams[i].team.id;
                        // **********COME BACK AND MAKE DATE DYNAMIC*************
                        a.href = `${baseURL}players?team=${a.id}&season=${2021}`
                        a.value = teamName.textContent;
                        // a.setAttribute('onclick', `showTeamInfo(event, id, href, ${team})`)
                        a.setAttribute('onclick', 'showTeamInfo(event, id, href, value)')

                        a.appendChild(logo);
                        a.appendChild(teamName);
                        div.appendChild(a);

                        displayTeams.appendChild(div);
                        standingsTable.appendChild(table);
                        displayLeagues.appendChild(standingsTable);
                        displayLeagues.appendChild(displayTeams);
                    }
                });
            }
        )
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}

function showTeamInfo(event, id, href, team) {
    event.preventDefault();

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
                    const team = data.response;

                    const displayTeam = document.getElementById('showLeagues');
                    displayTeam.innerHTML = '';

                    const teamName = document.createElement('h1');
                    teamName.textContent = listTeamName;
                    teamName.setAttribute('class', 'center_text');

                    let outerDiv = document.createElement('div');
                    outerDiv.setAttribute('class', 'team');

                    displayTeam.appendChild(teamName);

                    for (let i = 0; i < team.length; i++) {
                        let innerDiv = document.createElement('div');
                        innerDiv.setAttribute('class', 'teamPlayers')

                        let photo = document.createElement('img');
                        photo.setAttribute('width', "150px");
                        photo.src = team[i].player.photo;

                        let playerName = document.createElement('h4');
                        playerName.setAttribute('class', 'center_text');
                        firstName = team[i].player.firstname;
                        lastName = team[i].player.lastname;
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
                        if(injured.value == false) {
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
                        displayTeam.appendChild(outerDiv);

                    }
                })
            })
        .catch(err => {
            console.error('Fetch Error - ', err);
        });
}


window.addEventListener('load', createListByCountry);

document.getElementById('createListByCountry').addEventListener('click', showLeaguesByCountry);