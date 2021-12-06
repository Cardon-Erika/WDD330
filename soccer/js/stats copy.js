
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
                        // let team = teams[i].team.name;
                        let team = teamName.textContent;

                        let teamId = teams[i].team.id;

                        let a = document.createElement('a');
                        a.id = teams[i].team.id;
                        // **********COME BACK AND MAKE DATE DYNAMIC*************
                        a.href = `${baseURL}players?team=${a.id}&season=${2021}`
                        a.value = `${countryName} - ${leagueName} - ${team}`
                        a.addEventListener('click', (event) => showTeamInfo(event, teamId, a.href, a.value, leagueId))

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
