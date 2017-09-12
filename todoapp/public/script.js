var RESPONSE_DONE = 4;
var STATUS_OK = 200;
const todo_list_id = "todos_list_div";                              // div id for storing active TODO element
const deleted_list_id = "deleted_list_div";                         // div id for storing deleted TODO element
const completed_list_id = "completed_list_div";                     // div id for storing completed TODO element
const NEW_TODO_INPUT_ID = "new_todo_input";


window.onload = getTodosAJAX();

function addTodoElements(id, todo_data_json) {

    var todos = JSON.parse(todo_data_json);
    var parent = document.getElementById(id);
    parent.innerHTML = "";
    if(parent){
        Object.keys(todos).forEach(
            function(key) {
                var todo_element = createTodoElement(key, todos[key], id);
                parent.appendChild(todo_element);
            }
        )
    }
}
function createTodoElement(id, todo_object, realid) {

    var todo_element = document.createElement("div");

    if(todo_object.status == "ACTIVE" && realid == todo_list_id ){                          // checks if the stauts is ACTIVE and we have create this todo_element in the Active TODOS Div

        var checkbox = document.createElement("input");                                     // creates a checkbox infront of active TODO element
        checkbox.type = "checkbox";
        checkbox.name = todo_object.title;
        checkbox.setAttribute("onclick", "completeTodoAJAX("+id+")");
        var label = document.createElement('label');                                        // creates a label which has text as tiile of TODO element
        label.appendChild(document.createTextNode(todo_object.title));
        todo_element.appendChild(checkbox);
        todo_element.appendChild(label);
        todo_element.setAttribute("data-id", id);
        todo_element.setAttribute(
            "class", "todoStatus" + todo_object.status + " " + "breathVertical"
        );

        var complete_button = document.createElement("button");                             // creates a X button in at the end of the TODO element
        complete_button.innerText = "X";
        complete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    if(todo_object.status == "COMPLETE" && realid == completed_list_id){                // checks if the status is Complete we have to create element in Completed TODOS Div

        var checkbox = document.createElement("input");                                 // create a checked Checkbox in front of our TODO element
        checkbox.type = "checkbox";
        checkbox.name = todo_object.title;
        checkbox.checked = true;
        var label = document.createElement('label');                                    // label to hold the title of the TODO element
        label.appendChild(document.createTextNode(todo_object.title));
        todo_element.appendChild(checkbox);
        todo_element.appendChild(label);
        todo_element.setAttribute("data-id", id);
        todo_element.setAttribute(
            "class", "todoStatus" + todo_object.status + " " + "breathVertical"
        );

        var complete_button = document.createElement("button");                         // creates a X button at the end of the TODO element
        complete_button.innerText = "X";
        complete_button.setAttribute("onclick", "deleteTodoAJAX("+id+")");
        complete_button.setAttribute("class", "breathHorizontal");
        todo_element.appendChild(complete_button);
    }
    if(todo_object.status == "DELETED" && realid == deleted_list_id){
        todo_element.innerHTML = todo_object.title;                                    // simply Writes the title
        todo_element.setAttribute(
            "class", "todoStatus" + todo_object.status + " " + "breathVertical"
        );

    }
    return todo_element;
}
function getTodosAJAX() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/todos', true);

    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            //status code = 200
            if(xhr.status == STATUS_OK){
                // Call three simulatneous function to add TODOs elements to their respective div based on their respective status
                addTodoElements(todo_list_id, xhr.responseText);
                addTodoElements(completed_list_id, xhr.responseText);
                addTodoElements(deleted_list_id, xhr.responseText);

            }
        }
    }
    xhr.send(data = null);
}
function addTodoAJAX() {
    var title = document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var data = "todo_title=" + encodeURI(title);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                addTodoElements(todo_list_id, xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }

        }
    }
    xhr.send(data);
}
function completeTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";

    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(completed_list_id, xhr.responseText);
                getTodosAJAX();
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data);
}
function deleteTodoAJAX(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/" + id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){

        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {
                addTodoElements(deleted_list_id, xhr.responseText);
                getTodosAJAX();
            }
            else {
                console.log(xhr.responseText);
            }
        }
    }

    xhr.send(data = null);
}

function hideCompleted() {                                          // function to hide completed items
    var id = document.getElementById(completed_list_id);
    var button = document.getElementById("compButton");
    if(id.style.display === 'none'){
        id.style.display = 'block';
        button.value = "Hide Completed Items"

    }
    else{
        id.style.display = 'none';
        button.value = "Show Completed Items";

    }
}
function hideDeleted() {                                            // function to hide deleted items
    var id = document.getElementById(deleted_list_id);
    var button = document.getElementById("delButton");
    if(id.style.display === 'none'){
        id.style.display = 'block';
        button.value = "Hide Completed Items";
    }
    else{
        id.style.display = 'none';
        button.value = "Show Completed Items";
    }
}