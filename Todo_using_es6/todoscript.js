class ToDoItem {
    constructor(todo, category) {
        this.todo = todo;
        this.category = category;
    }
    setCategory(category) {
        this.category = category;
    }
    getToDO() {
        return todo;
    }
}


let arrItems = [];

function saveData() {
    let name = document.getElementById("name");
    let todoItem = new ToDoItem(name.value, "todo")

    if (localStorage.getItem("names")) {
        arrNames = JSON.parse(localStorage.getItem("names"));
    }
    arrItems.push(todoItem);
    localStorage.setItem("names", JSON.stringify(arrItems));

    let ul = document.getElementById("storage");
    let li = document.createElement('tr');
    li.innerHTML = `<td>${todoItem.todo}</td><td><button onclick="DoneMethod(event)">done</button></td>
    <td><button onclick="removeElement(event)">delete</button></td>`
    ul.appendChild(li);
    name.value = "";
}

function removeElement(event) {
    if (confirm("Are you sure you want to delete this item?")) {
        removeElementfromLocalStorage(event);
    } else {}

}

function removeElementfromLocalStorage(event) {
    let todoText = event.target.parentNode.parentNode.childNodes[0].innerText;
    // console.log({ todoText, arrItems });

    let i = arrItems.findIndex(x => x.todo === todoText);

    console.log(i);
    if (i !== -1) {
        arrItems.splice(i, 1);
        localStorage.setItem("names", JSON.stringify(arrItems));
    }
    event.target.parentNode.parentNode.remove();
}

function DoneMethod(event) {
    if (confirm("Are you sure that you are done?")) {
        console.log(event.target.parentNode.parentNode.childNodes[0].innerText);
        let done = event.target.parentNode.parentNode.childNodes[0].innerText;
        removeElementfromLocalStorage(event);
        let doneItem = new ToDoItem(done, "done");
        if (localStorage.getItem("names")) {
            arrNames = JSON.parse(localStorage.getItem("names"));
        }
        arrItems.push(doneItem);
        localStorage.setItem("names", JSON.stringify(arrItems));
        let ul = document.getElementById("done");
        let li = document.createElement('tr');
        li.innerHTML = `<td>${doneItem.todo}</td><td><button onclick="returnToDo(event)">Return Back</button></td><td><button onclick="removeElement(event)">delete</button></td>`
        ul.appendChild(li);
    } else {}

}

function returnToDo(event) {
    if (confirm("Are you sure that you want to return?")) {
        console.log(event.target.parentNode.parentNode.childNodes[0].innerText);
        let done = event.target.parentNode.parentNode.childNodes[0].innerText;
        removeElementfromLocalStorage(event);
        let todoItem = new ToDoItem(done, "todo");
        if (localStorage.getItem("names")) {
            arrNames = JSON.parse(localStorage.getItem("names"));
        }
        arrItems.push(todoItem);
        localStorage.setItem("names", JSON.stringify(arrItems));
        let ul = document.getElementById("storage");
        let li = document.createElement('tr');
        li.innerHTML = `<td>${todoItem.todo}</td><td><button onclick="DoneMethod(event)">done</button></td><td><button onclick="removeElement(event)">delete</button></td>`
        ul.appendChild(li);
    } else {}

}


function onStart() {

    let stNames = localStorage.getItem("names");

    if (stNames) {
        arrItems = JSON.parse(stNames);
        let ul = document.getElementById("storage");
        let ul2 = document.getElementById("done");
        if (arrItems) {

            for (let i = 0; i < arrItems.length; i++) {
                let li = document.createElement('tr');
                if (arrItems[i].category == "todo") {
                    li.innerHTML = `<td>${arrItems[i].todo}</td><td><button onclick="DoneMethod(event)">done</button></td><td><button onclick="removeElement(event)">delete</button></td>`

                    ul.appendChild(li);
                }

                if (arrItems[i].category == "done") {
                    li.innerHTML = `<td>${arrItems[i].todo}</td><td><button onclick="returnToDo(event)">Return Back</button></td><td><button onclick="removeElement(event)">delete</button></td>`


                    ul2.appendChild(li);
                }
            }
        }

    }
}

function clearAll() {
    localStorage.clear();

}

onStart();