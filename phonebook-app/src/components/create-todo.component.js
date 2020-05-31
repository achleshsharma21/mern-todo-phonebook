import React, {Component} from 'react';
import axios from 'axios';
export default class TodosList extends Component{
    constructor(props)
    {
        super(props);
        this.onChangeTodoDescription=this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible=this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoNumber=this.onChangeTodoNumber.bind(this);
        this.onChangeTodoPriority=this.onChangeTodoPriority.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            todo_description: '',
            todo_responsible: '',
            todo_number: '',
            todo_priority:'',
            todo_completed: false
        }
    }
    onChangeTodoDescription(e){
        this.setState({
            todo_description: e.target.value
        });
    }
    onChangeTodoNumber(e){
        this.setState({
            todo_number: e.target.value
        });
    }
    onChangeTodoResponsible(e){
        this.setState({
            todo_responsible: e.target.value
        });
    }
    onChangeTodoPriority(e){
        this.setState({
            todo_priority: e.target.value
        });
    }
    onSubmit(e){
        e.preventDefault();
        console.log('Form Submitted');
        this.props.history.push('/');
        // console.log(`Todo Description: ${this.state.todo_description}`);
        // console.log(`Todo Responsible: ${this.state.todo_responsible}`);        
        // console.log(`Todo Nu: ${this.state.todo_responsible}`);        
        // console.log(`Todo Priority: ${this.state.todo_priority}`);
        // console.log(`Todo Completed: ${this.state.todo_completed}`);
        
        const newTodo ={
            todo_description: this.state.todo_description,
            todo_priority: this.state.todo_priority,
            todo_number: this.state.todo_number,
            todo_responsible: this.state.todo_responsible,
            todo_completed: this.state.todo_completed
        }
            axios.post('http://localhost:4000/todos/add',newTodo)
            .then(res=>console.log(res.data));
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_number: '',
            todo_priority:'',
            todo_completed: false
        })
    }
    render(){
        return(
            <div style={{marginTop: 20}}>
                <h3>Create New Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text" className="form-control"
                        value={this.state.todo_description}
                        onChange={this.onChangeTodoDescription} />
                    </div>
                    <div className="form-group">
                        <label>Phone Number: </label>
                        <input type="text" className="form-control"
                        value={this.state.todo_number}
                        onChange={this.onChangeTodoNumber} />
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email" className="form-control"
                        value={this.state.todo_responsible}
                        onChange={this.onChangeTodoResponsible} />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityLow"
                            value="Home"
                            checked={this.state.todo_priority==='Home'}
                            onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Home</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityMedium"
                            value="Work"
                            checked={this.state.todo_priority==='Work'}
                            onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Work</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                            type="radio"
                            name="priorityOptions"
                            id="priorityHigh"
                            value="Personal"
                            checked={this.state.todo_priority==='Personal'}
                            onChange={this.onChangeTodoPriority}
                            />
                            <label className="form-check-label">Personal</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}