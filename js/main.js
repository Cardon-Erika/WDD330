function showAllWeeks() {

    const links = [
        {
            label: "Week One",
            url: "Week1/index.html"
        }
    ];

    if (links != null) {
        const weeksDisplayer = document.getElementById("all_weeks_display")
        weeksDisplayer.innerHTML = null
        const numberOfWeeks = links.length
        for (let i = 0; i < numberOfWeeks; i++) {
            let aWeek = links[i]
            // weeksDisplayer.innerHTML += "<div><a href=" + aWeek["url"] + ">" + "<h1>" + aWeek["label"] + "</h1><p>" + aWeek["description"] + "</p>" + "</a></div>"
            weeksDisplayer.innerHTML += "<li><a href=" + aWeek["url"] + ">" + aWeek["label"] + "</a></li>"
        }
    }

}