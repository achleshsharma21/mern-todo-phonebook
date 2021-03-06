const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = process.env.PORT || 4000;
const MongoClient = require('mongodb').MongoClient;
let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());
// mongodb://127.0.0.1:27017/todos (use this for local database)
//mongodb+srv://admin:achlesh123@cluster0-jgmav.mongodb.net/test?retryWrites=true&w=majority
//, useUnifiedTopology: true 
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://achlesh:achlesh@cluster0-jgmav.mongodb.net/details?retryWrites=true&w=majority', { useNewUrlParser: true,useUnifiedTopology: true },(err)=>{
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

todoRoutes.route('/update/:id').put( function(req, res) {
     Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send('data is not found');
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_number = req.body.todo_number;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            // console.log()
            todo.save().then(todo => {
                console.log("in todo.save funtion");
                res.json('Todo updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

todoRoutes.route('/delete/:id').delete(function(req,res){
    Todo.findOneAndDelete(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }
        else{
            res.status(200).json({
                msg:data
            })
        }
    })
        
        });

        if(process.env.NODE_ENV === 'production')
        {
            app.use(express.static('phonebook-app/build'));
        }

app.use('/todos', todoRoutes);

app.listen(process.env.PORT || PORT, function() {
    console.log("Server is running on Port: " + PORT);
});