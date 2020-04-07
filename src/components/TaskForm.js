import React from 'react';

class TaskForm extends React.Component {
    onCloseForm = () => {
        this.props.onCloseForm();
    }
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }
    onChange =  (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') {
            value = target.value === 'true' ? true: false;
        }
        this.setState({
            [name] : value
        })
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit (this.state);
        this.onClear();
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false
        })
    }
    componentWillMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    } 
    render(){
        return (           
            <div className="card">
                <div className="card-header">
                    <h3 className="panel-title">
                        Thêm Công Việc
                        <button className="fa fa-times-circle text-center ml-5" onClick={ this.onCloseForm }>
                        </button>
                    </h3>
                </div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value = {this.state.name}
                                onChange = {this.onChange}
                            ></input>
                        </div>
                            <label>Trạng Thái :</label>
                            <select
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}>
                                <option value={true}>Kích Hoạt</option>
                                <option value={false}>Ẩn</option>
                            </select><br></br>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-2"></span>Lưu Lại
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick ={ this.onClear }>
                                <span className="fa fa-close mr-2" ></span>Hủy Bỏ
                            </button>
                        </div>               
                    </form>
                </div>
            </div>           
        );
    }
}
export default TaskForm;
