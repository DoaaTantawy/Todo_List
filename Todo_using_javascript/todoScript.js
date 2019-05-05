function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {

    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    var listVal = ev.target.id;
    var index = arrNames.findIndex(x => x.val === data);
    arrNames[index]['list'] = listVal;
    localStorage.setItem("names", JSON.stringify(arrNames));

}


var arrNames = [];

function saveData() {
    var name = document.getElementById("name");
    var itemObj = {
        id: name.value,
        val: name.value,
        list: "storage"
    };
    console.log(name.value);
    if (localStorage.getItem("names")) {
        arrNames = JSON.parse(localStorage.getItem("names"));
    }
    arrNames.push(itemObj);
    localStorage.setItem("names", JSON.stringify(arrNames));

    var ul = document.getElementById("storage");
    var li = document.createElement('li');

    li.innerHTML = itemObj.val;
    li.setAttribute("draggable", "true");
    li.setAttribute("ondragstart", "drag(event)");
    li.setAttribute("id", name.value);
    ul.appendChild(li);
    name.value = "";
}

function getData() {
    var getNames = localStorage.getItem("names");
    var parsedArr = JSON.parse(getNames);

    document.getElementById("arrResult").innerHTML = parsedArr;
}

// function removeItem(name) {
//     localStorage.removeItem(name);
//     document.getElementById(name).remove();
// }

function clearAll() {
    localStorage.clear();

}

function onStart() {
    var stNames = localStorage.getItem("names");

    if (stNames) {
        arrNames = JSON.parse(stNames);
        var ul = document.getElementById("storage");
        var ul2 = document.getElementById("progress");
        var ul3 = document.getElementById("done");
        if (arrNames) {

            for (var i = 0; i < arrNames.length; i++) {
                var li = document.createElement('li');
                if (arrNames[i].list == "storage") {
                    li.innerHTML = arrNames[i].val;
                    li.setAttribute("id", arrNames[i].id);
                    li.setAttribute("draggable", "true");
                    li.setAttribute("ondragstart", "drag(event)");

                    ul.appendChild(li);
                }

                if (arrNames[i].list == "progress") {
                    li.innerHTML = arrNames[i].val;
                    li.setAttribute("id", arrNames[i].id);
                    li.setAttribute("draggable", "true");
                    li.setAttribute("ondragstart", "drag(event)");

                    ul2.appendChild(li);
                }

                if (arrNames[i].list == "done") {
                    li.innerHTML = arrNames[i].val;
                    li.setAttribute("id", arrNames[i].id);
                    li.setAttribute("draggable", "true");
                    li.setAttribute("ondragstart", "drag(event)");

                    ul3.appendChild(li);
                }
            }
        }

    }
}

onStart();