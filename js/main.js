function showAllWeeks() {

    const links = [
        {
            label: "Week One",
            url: "week1/index.html"
        },
        {
            label: "Week Two",
            url: "week2/index.html"
        },
        {
            label: "Week Three",
            url: "week3/index.html"
        },
        {
            label: "Week Four",
            url: "week4/index.html"
        },
        {
            label: "Week Five",
            url: "week5/index.html"
        },
        {
            label: "ToDo List",
            url: "toDo/index.html"
        },
        {
            label: "Week Seven",
            url: "week7/index.html"
        },
        {
            label: "Week Eight",
            url: "week8/index.html"
        }
    ];

    if (links != null) {
        const weeksDisplayer = document.getElementById("all_weeks_display")
        weeksDisplayer.innerHTML = null
        const numberOfWeeks = links.length
        for (let i = 0; i < numberOfWeeks; i++) {
            let aWeek = links[i]
            // weeksDisplayer.innerHTML += "<div><a href=" + aWeek["url"] + ">" + "<h1>" + aWeek["label"] + "</h1><p>" + aWeek["description"] + "</p>" + "</a></div>"
            weeksDisplayer.innerHTML += `<li class="heavy grow"><a href=` + aWeek["url"] + `>` + aWeek["label"] + `</a></li>`
        }
    }

}