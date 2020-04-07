import React from 'react';
// import PropTypes from 'prop-types';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import _ from 'lodash';
// import {findIdex, filter} from 'lodash';
import './App.css';
class App extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            tasks:[],
            isDisplayForm: false,
            taskEditing: null,
            filter: {
                name: '',
                status: -1,
            },
            keyword:'',
            sort: {
                by: '',
                value: 1
            }
            // id:unique, name, status
        }
    }
    componentDidMount() {
        console.log(localStorage.getItem('tasks'));
        const cachedTasks = localStorage.getItem('tasks');

        if (cachedTasks) {
            this.setState({ tasks: JSON.parse(cachedTasks) });
        }
    }
    s4(){
        return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
    }
    generateID (){
        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
        + this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4();
    }
    findIndex = (id) => {
        var tasks = this.state.tasks;
        var result = -1
        tasks.forEach((task, index) => {
            if(task.id === id)
            result = index;
        });
        return result;
    }
    onShowTaskForm(){
        if(this.state.isDisplayForm === true)
        this.setState({
            isDisplayForm: false
        })
        else
        this.setState({
            isDisplayForm: true
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }
    onSubmit = (data) => {
        var tasks = this.state.tasks || [];
        if(data.id === ''){
            data.id = this.generateID();
            tasks.push(data);
        }else{
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
            this.onCloseForm();
        }

    onUpdate = (id) => {
        var tasks = this.state.tasks;
        // var index = this.findIndex(id);
        var index = _.findIndex(tasks, (task) =>{
            return task.id === id;
        })
            var taskEditing = tasks[index];
            this.setState({
                taskEditing: taskEditing
            });
            this.onShowTaskForm();
        // var tasks = this.state.tasks
        // var index = this.findIndex(id);
        // if(index !== -1){
        //     tasks[index].status = !tasks[index].status;
        //     this.setState({
        //         tasks: tasks
        //     });
        //     localStorage.setItem('tasks',JSON.stringify('tasks'))
        // }
    }

    onDelete = (id) => {
        var tasks = this.state.tasks
        var index = this.findIndex(id);
        if(index !== -1){
            tasks.splice(index, 1);//delete
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks',JSON.stringify(tasks));
        }
    
    }

    onFilter = (filterName, filterStatus) => {
        console.log(filterName, '-', filterStatus);
        console.log(typeof filterStatus);
        filterStatus = parseInt(filterStatus, 10);
        console.log(typeof filterStatus);
        this.setState({
            filter:{
                name: filterName.toLowerCase(),
                status: filterStatus
            }
        })
    }

    onSearch = (keyword) => {
        this.setState({
            keyword: keyword.toLowerCase()
        })
    }

    onSort = (sortBy,sortValue) => {
        this.setState({
            sort:{
                by:sortBy,
                value: sortValue
            }
        })
    }

    render(){
        var tasks = this.state.tasks; // var tasks = this.state.tasks
        var isDisplayForm = this.state.isDisplayForm;
        var taskEditing = this.state.taskEditing;
        var filteredTask = this.state.filter;
        var {keyword} = this.state;
        var {sort} = this.state;
        console.log(sort);
                    if(filteredTask.name){
                            // tasks = tasks.filter((task) => {
                            // return task.name.toLowerCase().indexOf(filteredTask.name) !==-1;
                            // });
                            tasks = _.filter(tasks, (task) => {
                                return task.name.toLowerCase().indexOf(filteredTask.name) !==-1;
                            })
                    }
                    tasks = _.filter(tasks,(task) => {
                        if(filteredTask.status === -1){
                            return task.name.toLowerCase().indexOf(filteredTask.name) !==-1;
                        } else {
                            return task.status === (filteredTask.status === 1 ? true : false);
                        }
                    });
                

        if(keyword){
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1;
            });
        }
        if(sort.by === 'name'){
            tasks.sort((a,b) => {
                if(a.name > b.name) return sort.value;
                else if (a.name < b.name) return -sort.value;
                else return 0;
            })
        }
        if(sort.by === 'status'){
            tasks.sort((a,b) => {
                if(a.status > b.status) return sort.value;
                else if (a.status < b.status) return -sort.value;
                else return 0;
            })
        }
        var elmTaskForm = isDisplayForm ? <TaskForm onSubmit = { this.onSubmit } 
                                                    onCloseForm={ this.onCloseForm }
                                                    task={taskEditing}></TaskForm>: '';
        return (           
            <div className="container">
                <div className = "text-center mb-5">
                    <h1>Quản Lý Công Việc</h1>
                </div>
                <div className="row">
                    <div className={isDisplayForm ? 'col-xs-4 col-xm-4 col-md-4 col-lg-4' : ''}>
                        {/*Form */}
                        {elmTaskForm}
                    </div>
                    <div className={isDisplayForm ? 'col-xs-8 col-xm-8 col-md-8 col-lg-8' : 'col-xs-12 col-xm-12 col-md-12 col-lg-12' }>
                        <button type="button" className="btn btn-primary mb-15" onClick={ () => {this.onShowTaskForm()}}>
                            <span className="fa fa-plus mr-2"></span>Thêm Công Việc
                        </button>
                        {/*Search - Sort */}
                        <Control onSearch={ this.onSearch }
                                onSort={this.onSort}
                        ></Control>
                        <div className="row mt-3">
                        <div className="col-xs-12 col-xm-12 col-md-12 col-lg-12">
                        {/*List Item */}
                            <TaskList tasks = { tasks } 
                            onUpdate = {this.onUpdate}
                            onDelete = {this.onDelete}
                            onFilter = {this.onFilter}></TaskList>
                        </div>
                        </div>
                    </div>
                </div>
            </div>           
        );
    }
}
export default App;
