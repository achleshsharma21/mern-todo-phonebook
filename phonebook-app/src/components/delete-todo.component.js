import React, {Component} from 'react'; 
import axios from 'axios';
export default class DeleteTodo extends Component{
    constructor(props) {
        super(props);
        this.onDelete=this.onDelete.bind(this);
        this.notDelete=this.notDelete.bind(this);
    }
    
    // componentDidMount(){
    //      this.onDelete();
    // }
    onDelete(){
        axios.delete('http://localhost:4000/todos/delete/' + this.props.match.params.id)
            .then((res) => {
                console.log('Student successfully deleted!');
                this.props.history.push('/');
            }).catch((error) => {
                // console.log(this.props.match.params.id);
                console.log(error)
            })        
        
    }
    notDelete(e){
        e.preventDefault();
        this.props.history.push('/');
    }
    render(){
        return(
            <div>
            <h3>Are you Sure you want to delete</h3>
            <div className="form-group">
            <input type="submit" value="Yes" className="btn btn-primary" onClick={this.onDelete}/>
            </div>
            <div className="form-group">
            <input type="submit" value="No" className="btn btn-primary" onClick={this.notDelete}/>
            </div>
            </div>
        )
    }
}