import {
    addToList,
    buildItems,
    removeFromList,
} from "./todos.js";

import {
    calcAllTasks,
    calcTasksActive,
    calcCompletedTasks,
    taskControls,
} from "./utilities.js";

import {
    saveList,
    updateList,
    removeItem,
    findList,
} from "./ls.js"

window.addEventListener('load', findList);

document.querySelector('#submit').addEventListener('click', addToList);

document.body.addEventListener('click', taskControls);

// export function buildItems(listArray) {
//     listArray.forEach(
//         arrayItem => {
//             let div = document.createElement('div');
//             div.setAttribute('class', "todo_row");

//             let checkBox = document.createElement('input');
//             checkBox.setAttribute('class', "checkbox");
//             checkBox.setAttribute('name', "checkbox");
//             checkBox.setAttribute('type', "checkbox");
//             checkBox.setAttribute('id', arrayItem.id)
//             if (arrayItem.completed == false) {
//                 checkBox.checked = false;
//             } else if (arrayItem.completed == true) {
//                 checkBox.checked = true;
//             }

//             let listItem = document.createElement('p');
//             listItem.textContent = arrayItem.content;

//             let itemButton = document.createElement('a');
//             itemButton.textContent = "X";
//             itemButton.setAttribute('id', arrayItem.id);

//             div.appendChild(checkBox);
//             div.appendChild(listItem);
//             div.appendChild(itemButton);

//             /*add to HTML*/
//             document.querySelector('#task_list').appendChild(div);

//             /*add to array*/
//             todoList.push([arrayItem.id, checkBox, listItem])
//         }
//     );
// }

// export function addToList() {
//     let id = Date.now()

//     let div = document.createElement('div');
//     div.setAttribute('class', "todo_row");

//     let checkBox = document.createElement('input');
//     checkBox.setAttribute('class', "checkbox");
//     checkBox.setAttribute('name', "checkbox");
//     checkBox.setAttribute('type', "checkbox");
//     checkBox.setAttribute('id', id)

//     let listItem = document.createElement('p');
//     listItem.textContent = document.getElementById('add_task').value;

//     let itemButton = document.createElement('a');
//     itemButton.textContent = "X";
//     itemButton.setAttribute('id', id)

//     div.appendChild(checkBox);
//     div.appendChild(listItem);
//     div.appendChild(itemButton);

//     /*add to HTML*/
//     document.querySelector('#task_list').appendChild(div);

//     /*add to array*/
//     todoList.push([id, checkBox, listItem])

//     calcTasksActive();
//     reset();
//     saveList(id, checkBox, listItem);
// }

// export function calcAllTasks() {
//     const allTasks = document.getElementById("all_tasks");
//     const activeTasks = document.getElementById("uncompleted_tasks");
//     const completeTasks = document.getElementById("completed_tasks");

//     let stillOnList = document.querySelectorAll(".todo_row");

//     document.getElementById('tasks').innerHTML = `${stillOnList.length} Total Tasks`;

//     allTasks.setAttribute("class", "active");
//     activeTasks.setAttribute("class", "");
//     completeTasks.setAttribute("class", "");
// }

// export function calcTasksActive() {
//     let count = 0;

//     const allTasks = document.getElementById("all_tasks");
//     const activeTasks = document.getElementById("uncompleted_tasks");
//     const completeTasks = document.getElementById("completed_tasks");

//     let stillOnList = document.querySelectorAll(".todo_row");
//     stillOnList.forEach(
//         listItem => {
//             if (listItem.children[0].checked != true) {
//                 count = count + 1;
//                 listItem.children[1].removeAttribute("class", "strike");
//             } else {
//                 count = count;
//                 listItem.children[1].setAttribute("class", "strike");
//             }
//         }
//     )
//     document.getElementById('tasks').innerHTML = count + " Tasks Left";

//     allTasks.setAttribute("class", "");
//     if (activeTasks) {
//         activeTasks.setAttribute("class", "active");
//     }
//     completeTasks.setAttribute("class", "");
// }

// export function calcCompletedTasks() {
//     let count = 0;

//     const allTasks = document.getElementById("all_tasks");
//     const activeTasks = document.getElementById("uncompleted_tasks");
//     const completeTasks = document.getElementById("completed_tasks");

//     // let stillOnList = document.querySelectorAll("#task_list > .todo_row")
//     let stillOnList = document.querySelectorAll(".todo_row");
//     stillOnList.forEach(
//         listItem => {
//             if (listItem.children[0].checked == true) {
//                 count = count + 1;
//             } else {
//                 count = count;
//             }
//         }
//     )
//     document.getElementById('tasks').innerHTML = count + " Tasks Completed";

//     allTasks.setAttribute("class", "a");
//     activeTasks.setAttribute("class", "");
//     completeTasks.setAttribute("class", "active");
// }

// export function removeFromList(e) {
//     removeItem(e, todoList);

//     e.target.parentNode.remove();

//     const index = e.target.id
//     todoList.forEach((item, i) => {
//         if (index == item[0]) {
//             return todoList.splice(i, 1);
//         }
//     })

//     calcTasksActive();
// }

// export function taskControls(e) {
//     if (e.target && e.target.matches('a')) {
//         removeFromList(e);
//     } else if (e.target && e.target.matches("input.checkbox")) {
//         updateList(e, todoList);
//         calcTasksActive();
//     } else if (e.target && e.target.matches("p#all_tasks")) {
//         calcAllTasks();
//     } else if (e.target && e.target.matches("p#completed_tasks")) {
//         calcCompletedTasks();
//     } else {
//         calcTasksActive();
//     }
// }

// export function reset() {
//     document.getElementById('add_task').value = "";
// }

// export function saveList(id, checkBox, listItem) {
//     let lsList = JSON.parse(window.localStorage.getItem("listArray") || "[]");

//     let listAddition = {
//         id: id,
//         content: listItem.textContent,
//         completed: checkBox.checked,
//     }

//     lsList.push(listAddition);
//     window.localStorage.setItem('listArray', JSON.stringify(lsList));
// }

// export function updateList(e, todoList) {
//     todoList.forEach((updateItem, i) => {
//         if (e.target.id == updateItem[0]) {
//             let lsList = JSON.parse(window.localStorage.getItem("listArray") || "[]");

//             lsList[i]['completed'] = updateItem[1].checked;

//             window.localStorage.setItem('listArray', JSON.stringify(lsList));
//         }
//     })
// }

// export function removeItem(e, todoList) {
//     todoList.forEach((updateItem, i) => {
//         if (e.target.id == updateItem[0]) {
//             let lsList = JSON.parse(window.localStorage.getItem("listArray") || "[]");

//             lsList.splice([i], 1);

//             window.localStorage.setItem('listArray', JSON.stringify(lsList));
//         }
//     })
// }

// export function findList() {
//     if (window.localStorage.getItem('listArray') != null && window.localStorage.getItem('listArray') != []) {
//         let listArray = JSON.parse(window.localStorage.getItem('listArray'));
//         buildItems(listArray);
//         calcTasksActive();

//         /*clean up from testing*/
//         // window.localStorage.removeItem('listArray')
//     } else {
//         calcTasksActive();
//     }
// }
