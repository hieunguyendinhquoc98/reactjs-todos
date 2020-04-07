import React from 'react';

class Control extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          open: false,
          sort: {
              by: '',
              value: 1
          }
        };
      }
    
    toggleDropDown = () => {
    this.setState({ open: !this.state.open });
    };
    onClick = (sortBy, sortValue) => {
        console.log(sortBy,'-',sortValue);
        // this.setState({
        //     sort: {
        //         by: sortBy,
        //         value: sortValue
        //     }
        // })  
        this.props.onSort(sortBy,sortValue);  
    }
    render(){
        return (           
            <div>
                {/*Sort*/}
                    <div 
                        className="dropdown">
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            data-toggle="dropdown"
                            onClick = {this.toggleDropDown}
                        >Sắp Xếp <span className="fa fa-caret-square-o-down ml-2"></span>
                        </button>
                        <div
                            onClick={event => {
                            event.stopPropagation();
                            this.setState({
                                open: !this.state.open 
                            })
                            }}

                        className="dropdown-menu" style={{ display: `${this.state.open ? 'block' : 'none'}`}}> 
                            <a className="dropdown-item" href={this.onClickAsc}
                            onClick = { () => this.onClick('name', 1)}>
                                <span className="fa fa-sort-alpha-asc pr-2">
                                </span>Tên A-Z
                                </a>
                            <a className="dropdown-item" href={this.onClickDesc}
                            onClick = { () => this.onClick('name', -1)}>
                                <span className="fa fa-sort-alpha-desc pr-2">
                                </span>Tên Z-A
                            </a>
                        <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href={this.onClickDesc}
                            onClick = { () => this.onClick('status', 1)}>
                                Kích Hoạt
                            </a>
                            <a className="dropdown-item" href={this.onClickDesc}
                            onClick = { () => this.onClick('status', -1)}>
                                Ẩn
                            </a>                            
                        </div>
                    </div>                    
            </div>
        );
    }
}
export default Control;
