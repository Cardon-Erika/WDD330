
export function prettyDate(findGame) {
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