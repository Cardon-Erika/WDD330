const quiz = [
    ["What is Superman's real name?","Clark Kent"],
    ["What is Wonder Woman's real name?","Diana Prince"],
    ["What is Batman's real name?","Bruce Wayne"]
];

alert('Welcome to Quiz Ninja!');

// const question = "What is Superman's real name?"
// const answer = prompt(question);
// alert(`You answered ${answer}`);

let score = 0 // initialize score

for (const [question, answer] of quiz) {
    const response = prompt(question);
    if(response === answer) {
        score++
    } else {
        alert(`Wrong! The correct answer was ${answer}`);
    }
}

// At the end of the game, report the player's score
alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);