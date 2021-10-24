import {
    removeFromList,
    todoList,
} from "./todos.js";

import {
    updateList,
} from "./ls.js"

export function calcAllTasks() {
    const allTasks = document.getElementById("all_tasks");
    const activeTasks = document.getElementById("uncompleted_tasks");
    const completeTasks = document.getElementById("completed_tasks");

    let stillOnList = document.querySelectorAll(".todo_row");

    document.getElementById('tasks').innerHTML = `${stillOnList.length} Total Tasks`;

    allTasks.setAttribute("class", "active");
    activeTasks.setAttribute("class", "");
    completeTasks.setAttribute("class", "");
}

export function calcTasksActive() {
    let count = 0;

    const allTasks = document.getElementById("all_tasks");
    const activeTasks = document.getElementById("uncompleted_tasks");
    const completeTasks = document.getElementById("completed_tasks");

    let stillOnList = document.querySelectorAll(".todo_row");
    stillOnList.forEach(
        listItem => {
            if (listItem.children[0].checked != true) {
                count = count + 1;
                listItem.children[1].removeAttribute("class", "strike");
            } else {
                count = count;
                listItem.children[1].setAttribute("class", "strike");
            }
        }
    )
    document.getElementById('tasks').innerHTML = count + " Tasks Left";

    allTasks.setAttribute("class", "");
    if (activeTasks) {
        activeTasks.setAttribute("class", "active");
    }
    completeTasks.setAttribute("class", "");
}

export function calcCompletedTasks() {
    let count = 0;

    const allTasks = document.getElementById("all_tasks");
    const activeTasks = document.getElementById("uncompleted_tasks");
    const completeTasks = document.getElementById("completed_tasks");

    // let stillOnList = document.querySelectorAll("#task_list > .todo_row")
    let stillOnList = document.querySelectorAll(".todo_row");
    stillOnList.forEach(
        listItem => {
            if (listItem.children[0].checked == true) {
                count = count + 1;
            } else {
                count = count;
            }
        }
    )
    document.getElementById('tasks').innerHTML = count + " Tasks Completed";

    allTasks.setAttribute("class", "a");
    activeTasks.setAttribute("class", "");
    completeTasks.setAttribute("class", "active");
}

export function taskControls(e) {
    if (e.target && e.target.matches('a')) {
        removeFromList(e);
    } else if (e.target && e.target.matches("input.checkbox")) {
        updateList(e, todoList);
        calcTasksActive();
    } else if (e.target && e.target.matches("p#all_tasks")) {
        calcAllTasks();
    } else if (e.target && e.target.matches("p#completed_tasks")) {
        calcCompletedTasks();
    } else {
        calcTasksActive();
    }
}

export function reset() {
    document.getElementById('add_task').value = "";
}
