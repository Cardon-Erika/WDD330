function showAllWeeks() {

    const links = [
        {
            label: "Week One",
            url: "week1/index.html"
        }
    ];

    if (links != null) {
        var weeksDisplayer = document.getElementById("all_weeks_display")
        weeksDisplayer.innerHTML = null
        var numberOfWeeks = links.length
        for (var i = 0; i < numberOfWeeks; i++) {
            var aWeek = links[i]
            // weeksDisplayer.innerHTML += "<div><a href=" + aWeek["url"] + ">" + "<h1>" + aWeek["label"] + "</h1><p>" + aWeek["description"] + "</p>" + "</a></div>"
            weeksDisplayer.innerHTML += "<li><a href=" + aWeek["url"] + ">" + aWeek["label"] + "</a></li>"
        }
    }

}