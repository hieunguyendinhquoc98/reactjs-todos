import React from 'react';
class TaskItem extends React.Component {

    onUpdate = () => {
        this.props.onUpdate(this.props.task.id);
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
    }
    render(){
        var task= this.props.task;
        var index= this.props.index;
        return (           
                <tr>
                    <td className="text-center">{ index +1 }</td>
                    <td>{ task.name }</td>
                    <td className="text-center">
                        <span className={ task.status === true ? 'bg-success': 'bg-danger'}
                        >{task.status === true ? 'Kích Hoạt': 'Ẩn'}
                        </span>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-warning"
                        onClick = { this.onUpdate }
                        ><span className="fa fa-pencil mr-2"></span>Sửa
                        </button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick = {this.onDelete}>
                            <span className="fa fa-trash mr-2"></span>Xóa
                        </button>
                    </td>
                </tr>
        );
    }
}
export default TaskItem;
