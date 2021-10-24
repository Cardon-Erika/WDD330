import {
    calcTasksActive,
    reset,
} from "./utilities.js";

import {
    saveList,
    removeItem,
} from "./ls.js"

export let todoList = [];

export function addToList() {
    let id = Date.now()

    let div = document.createElement('div');
    div.setAttribute('class', "todo_row");

    let checkBox = document.createElement('input');
    checkBox.setAttribute('class', "checkbox");
    checkBox.setAttribute('name', "checkbox");
    checkBox.setAttribute('type', "checkbox");
    checkBox.setAttribute('id', id)

    let listItem = document.createElement('p');
    listItem.textContent = document.getElementById('add_task').value;

    let itemButton = document.createElement('a');
    itemButton.textContent = "X";
    itemButton.setAttribute('id', id)

    div.appendChild(checkBox);
    div.appendChild(listItem);
    div.appendChild(itemButton);

    /*add to HTML*/
    document.querySelector('#task_list').appendChild(div);

    /*add to array*/
    todoList.push([id, checkBox, listItem])

    calcTasksActive();
    reset();
    saveList(id, checkBox, listItem);
}

export function buildItems(listArray) {
    listArray.forEach(
        arrayItem => {
            let div = document.createElement('div');
            div.setAttribute('class', "todo_row");

            let checkBox = document.createElement('input');
            checkBox.setAttribute('class', "checkbox");
            checkBox.setAttribute('name', "checkbox");
            checkBox.setAttribute('type', "checkbox");
            checkBox.setAttribute('id', arrayItem.id)
            if (arrayItem.completed == false) {
                checkBox.checked = false;
            } else if (arrayItem.completed == true) {
                checkBox.checked = true;
            }

            let listItem = document.createElement('p');
            listItem.textContent = arrayItem.content;

            let itemButton = document.createElement('a');
            itemButton.textContent = "X";
            itemButton.setAttribute('id', arrayItem.id);

            div.appendChild(checkBox);
            div.appendChild(listItem);
            div.appendChild(itemButton);

            /*add to HTML*/
            document.querySelector('#task_list').appendChild(div);

            /*add to array*/
            todoList.push([arrayItem.id, checkBox, listItem])
        }
    );
}

export function removeFromList(e) {
    removeItem(e, todoList);

    e.target.parentNode.remove();

    const index = e.target.id
    todoList.forEach((item, i) => {
        if (index == item[0]) {
            return todoList.splice(i, 1);
        }
    })

    calcTasksActive();
}