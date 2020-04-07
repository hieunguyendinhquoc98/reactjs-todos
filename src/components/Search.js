import React from 'react';

class Control extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            keyword:''
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }
    render(){
        return (           
            <div>
                {/*Search */}
                    <div className="input-group">
                        <input
                            name="keyword"
                            type="text"
                            className="form-control"
                            placeholder="Nhập Từ Khóa..."
                            value= {this.state.keyword}
                            onChange= {this.onChange}
                        ></input>
                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                                <span className="fa fa-search mr-2"></span>Tìm
                            </button>
                        </span>
                    </div>
            </div>
        );
    }
}
export default Control;
