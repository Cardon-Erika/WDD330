import {
    buildItems,
} from "./todos.js";

import {
    calcTasksActive,
} from "./utilities.js";

export function saveList(id, checkBox, listItem) {
    let lsList = JSON.parse(window.localStorage.getItem("listArray") || "[]");

    let listAddition = {
        id: id,
        content: listItem.textContent,
        completed: checkBox.checked,
    }

    lsList.push(listAddition);
    window.localStorage.setItem('listArray', JSON.stringify(lsList));
}

export function updateList(e, todoList) {
    todoList.forEach((updateItem, i) => {
        if (e.target.id == updateItem[0]) {
            let lsList = JSON.parse(window.localStorage.getItem("listArray") || "[]");

            lsList[i]['completed'] = updateItem[1].checked;

            window.localStorage.setItem('listArray', JSON.stringify(lsList));
        }
    })
}

export function removeItem(e, todoList) {
    todoList.forEach((updateItem, i) => {
        if (e.target.id == updateItem[0]) {
            let lsList = JSON.parse(window.localStorage.getItem("listArray") || "[]");

            lsList.splice([i], 1);

            window.localStorage.setItem('listArray', JSON.stringify(lsList));
        }
    })
}

export function findList() {
    if (window.localStorage.getItem('listArray') != null && window.localStorage.getItem('listArray') != []) {
        let listArray = JSON.parse(window.localStorage.getItem('listArray'));
        buildItems(listArray);
        calcTasksActive();

        /*clean up from testing*/
        // window.localStorage.removeItem('listArray')
    } else {
        calcTasksActive();
    }
}