import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Login extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: "",

            status: "",
            login: false,

        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/users/login",{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(this.state)
        })
        .then(async (response) => {
            response.json()
            .then((result) => {
                this.setState({
                    status: result.userMessage
                });
                if(result.token){
                    this.setState({
                        login: true
                    });
                    localStorage.setItem("login", JSON.stringify({
                        token: result.token,
                        login: true,
                        currentUser: result.userData
                    }));
                    window.location.reload();
                }else{
                    alert(this.state.status);
                }
                
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log("Something went wrong when you fetched data LOGIN")
        });
    }

    storeCollector = () => {
        const store = JSON.parse(localStorage.getItem("login"));

        if(store && store.login){
            this.setState({
                login: true
            })
        }
    }

    componentDidMount(){
        this.storeCollector();
    }

    render() {
        return (
            
            !this.state.login?
            <div className="login-block">
                <div className="container login-block-background">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form onSubmit={this.submitHandler} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Username</label>
                                    <input onChange={this.changeHandler} name="username" type="text" className="form-control" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Password</label>
                                    <input onChange={this.changeHandler} name="password" type="password" className="form-control" placeholder="Password" />
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="checkbox" className="form-check-input" />
                                        <small>Remember Me</small>
                                    </label>
                                    <button type="submit" className="btn btn-login float-right">Login</button>
                                </div>
                            </form>
                            <div className="copy-text">Created with <i className="fa fa-heart" /> by Grafreez</div>
                            </div>
                            <div className="col-md-8 banner-sec">
                                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                                    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                                    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                                    </ol>
                                    <div className="carousel-inner" role="listbox">
                                    <div className="carousel-item active">
                                        <img className="d-block img-fluid" src="https://static.pexels.com/photos/33972/pexels-photo.jpg" alt="First slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block img-fluid" src="https://images.pexels.com/photos/7097/people-coffee-tea-meeting.jpg" alt="First slide" />
                                    </div>
                                    <div className="carousel-item">
                                        <img className="d-block img-fluid" src="https://images.pexels.com/photos/872957/pexels-photo-872957.jpeg" alt="First slide" />
                                    </div>
                                </div>	   
                            </div>
                            
                        </div>
                        <div>STATUS: {this.state.status}</div>
                    </div>
                </div>
            </div>:
            <Redirect to="/home"/>
        )
    }
}
