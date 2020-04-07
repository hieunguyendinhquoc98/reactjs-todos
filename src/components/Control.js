import React from 'react';
import Search from './Search'
import Sort from './Sort'
class Control extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            task: []
        }
    }
    render(){
        return (           
            <div>
                        {/*Search Sort*/}
                    <div className="row mt-3">
                        {/*Search */}
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <Search onSearch={this.props.onSearch}></Search>
                        </div>                        
                        {/*Sort*/}
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <Sort onSort={this.props.onSort}></Sort>
                        </div>
                    </div>
            </div>
        );
    }
}
export default Control;
