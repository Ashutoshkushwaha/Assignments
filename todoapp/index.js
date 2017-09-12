var express = require('express');
var todo_db = require('./seed.js');
var bodyparser = require('body-parser');

var app = express();


app.use('/', express.static(__dirname + "/public"));
app.use('/', bodyparser.urlencoded({extended: false}));


app.get('/api/todos', function (req,res) {
    res.json(todo_db.todos);
});

//for deletion
app.delete('/api/todos/:id', function (req,res) {
    var del_id = req.params.id;
    var todo = todo_db.todos[del_id];
    if(!todo){
        res.status(400).json({error : "Todo doesn't exist"});
    }
    else{
        todo.status = todo_db.statusENUMS.DELETED;
        res.json(todo_db.todos);
    }
})

app.post('/api/todos', function (req, res) {
    var todo = req.body.todo_title;
    if(!todo || todo == '' ||  todo.trim() == ''){
        res.status(400).json({error : "Todo item cannot be empty"});
    }
    else{
        var new_todo_object = {
            title : req.body.todo_title,
            status : todo_db.statusENUMS.ACTIVE
        }
        todo_db.todos[todo_db.next_todo_id] = new_todo_object;
        todo_db.next_todo_id = todo_db.next_todo_id + 1;
        res.json(todo_db.todos);
    }
})

app.put('/api/todos/:id', function (req,res) {
    var mod_id = req.params.id;
    var todo = todo_db.todos[mod_id];
    if(!todo){
        res.status(400).json({error : 'cant modify a todo that doesnt exist'});

    }
    else{
        var todo_title = req.body.todo_title;
        if(todo_title && todo_title != '' && todo_title.trim()!= ''){
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if(todo_status && (todo_status == todo_db.statusENUMS.ACTIVE || todo_status == todo_db.statusENUMS.COMPLETE)){
            todo.status = todo_status;
        }
        res.json(todo_db.todos);
    }
})


console.log(todo_db);
app.listen(4000);