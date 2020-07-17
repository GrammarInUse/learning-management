import React, { Component } from 'react'

export default class ComletedThing extends Component {
    constructor(props){
        super(props);

        this.state = {
            id: null
        }
    }
    clickHandler = () => {
        const temp = this.state.id;
        localStorage.setItem("detail", temp);

    }
    componentDidMount(){
        const temp = this.props.id || 0;
        this.setState({
            id: temp
        });
    }
    render() {
        return (
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100">
                    <img className="card-img-top" src="http://placehold.it/500x325" alt="Hinh" />
                    <div className="card-body">
                        <h4 className="card-title">{this.props.name}</h4>
                    </div>
                    <div className="card-footer">
                        <a href="/detail" onClick={this.clickHandler} className="btn btn-primary">Learn more</a>
                    </div>
                </div>
            </div>
        )
    }
}
