function startRace() {
    document.getElementsByClassName('race')[0].classList.add('race_on');
}

function addActive(clicked_id) {
    const item = document.getElementById(clicked_id);
    item.classList.add('active');
}

function returnAnswers() {    
    document.getElementById('returnAnswers').classList.toggle("display");

    document.getElementById('returnAnswers').children[0].textContent = 'Hide The Correct Answers';
}

document.getElementById("start_race").addEventListener('click', startRace);

document.getElementById('returnAnswers').addEventListener('click', returnAnswers)
