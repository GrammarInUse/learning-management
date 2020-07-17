import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import ImageSize from 'image-size';

ImageSize.setConcurrency(80000);

export default class Clients extends Component {
    constructor(props){
        super(props);

        this.state = {
            login: false,

            fullName: "",
            phone: "",
            message: "",
            password: "",
            comfirmPassword: "",

            newFullName: "",
            newPhone: "",
            avatar: null,

            newPassword: "",
            newComfirmPassword: ""
        }
    }

    displayEditFormHandler =  (e) => {
        e.preventDefault();
        document.getElementById("formEditCurrentUser").style.display = "block";
    }

    displayEditPasswordHandler = (e) => {
        e.preventDefault();

        document.getElementById('formEditPassword').style.display = 'block';
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    submitHandler = (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("login")).token;
        const url = "http://localhost:8080/users/profile/" + this.props.id;
        const tempObj = {
            fullName: this.state.newFullName,
            phone: this.state.newPhone
        }
        console.log(tempObj);
        fetch(url, {
            method: "PATCH",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : token
            },
            body: JSON.stringify(tempObj)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                this.setState({
                    message: result.userMessage
                });
                alert(result.userMessage);
                document.getElementById("formEditCurrentUser").style.display = "none";
            })
            .catch((err) => {
                console.log("ERROR RESPONSE PATCH CLIENT: " + err);
            });
        })
        .catch((err) => {
            console.log("ERROR FETCHING CLIENT: " + err);
        });  
        window.location.reload();
        
    }

    submitChangePasswordHandler = (e) => {
        e.preventDefault();
        const token = JSON.parse(localStorage.getItem("login")).token;
        const url = "http://localhost:8080/users/password/" + this.props.id;
        const tempObj = {
            newPassword: this.state.newPassword,
        }
        fetch(url, {
            method: "PATCH",
            headers: {
                "Accept" : "application/json",
                "Content-Type" : "application/json",
                "Authorization" : token
            },
            body: JSON.stringify(tempObj)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                this.setState({
                    message: result.userMessage
                });
                alert(result.userMessage);
                document.getElementById("formEditPassword").style.display = "none";
            })
            .catch((err) => {
                console.log("ERROR RESPONSE PATCH CLIENT: " + err);
            });
        })
        .catch((err) => {
            console.log("ERROR FETCHING CLIENT: " + err);
        });
    }

    getBase64Img = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            return resolve(reader.result);
        }

        reader.onerror = (err) => {
            return reject(err);
        }
    }); 

    changeImage = async (e) => {
        
        const file = e.target.files;

        const userId = JSON.parse(localStorage.getItem("login"));
        const temp = await this.getBase64Img(file[0])
        .catch((err) => {
            console.log(err);
        });

        const data = {
            img: temp,
            userId: userId.currentUser.id
        }

        const response = await fetch("http://localhost:8080/users/upload", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)     
        })
        .then()
        .catch((err) => {
            console.log(err);
        });
        if(!response){
            alert("FILE Hình quá lớn, hoặc sai định dạng, thử hình khác đi...");
        }else{
            const result = await response.json()
            .then()
            .catch((err) => {
                console.log(err);
            });
    
            alert(result.userMessage);
    
            window.location.reload();
        }
    }

    render() {
        return (
            !this.props.login?
            <Redirect to="/login" />:
            <div className="container emp-profile">
                <form encType="multipart/form-data" onSubmit={this.avatarChangingSubmitHandler}>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={this.props.avatar} alt="Avatar" />
                                <div className="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input onChange={this.changeImage} style={{cursor: "pointer"}} id="avatar" type="file" name="file" accept="image/*" />
                                </div>
                                <input type="submit" value="Upload" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="profile-head">
                                <h5>
                                {this.props.fullName}
                                </h5>
                                <h6>
                                Web Developer and Designer
                                </h6>
                                <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <input onClick={this.displayEditFormHandler} type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                            <input onClick={this.displayEditPasswordHandler} type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Password" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>WORK LINK</p>
                                <a href="#">Website Link</a><br />
                                <a href="#">Bootsnipp Profile</a><br />
                                <a href="#">Bootply Profile</a>
                                <p>SKILLS</p>
                                <a href="#">Web Designer</a><br />
                                <a href="#">Web Developer</a><br />
                                <a href="#">WordPress</a><br />
                                <a href="#">WooCommerce</a><br />
                                <a href="#">Nodejs, React</a><br />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>User Id</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.id}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.fullName}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>{this.props.phone}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Profession</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Web Developer and Designer</p>
                                    </div>
                                </div>
                                </div>
                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Experience</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Hourly Rate</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>10$/hr</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Total Projects</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>230</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>English Level</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                    <label>Availability</label>
                                    </div>
                                    <div className="col-md-6">
                                    <p>6 months</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                    <label>Your Bio</label><br />
                                    <p>Your detail description</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form> 
                <div className="wrapper fadeInDown" id="formEditCurrentUser">
                    <div id="formContent">
                        {/* Tabs Titles */}
                        {/* Icon */}
                        <div className="fadeIn first">
                            <img src="https://www.b-cube.in/wp-content/uploads/2014/05/aditya-300x177.jpg" id="icon" alt="User Icon" />
                            <h1>Aditya News</h1>
                        </div>
                        {/* Login Form */}
                        <form onSubmit={this.submitHandler}>
                            <input type="text" id="newFullName" onChange={this.changeHandler} className="fadeIn second" name="newFullName" placeholder="fullname" />
                            <input type="text" id="newPhone" onChange={this.changeHandler} className="fadeIn third" name="newPhone" placeholder="phone" />
                            <input type="submit" className="fadeIn fourth" value="Update" />
                        </form>
                        {/* Remind Passowrd */}
                        <div id="formFooter">
                            <a className="underlineHover" onClick={() => {document.getElementById("formEditCurrentUser").style.display = "none"}} href="#">Cancel</a>
                        </div>
                    </div>
                </div> 
                <div className="wrapper fadeInDown" id="formEditPassword">
                    <div id="formContent">
                        {/* Tabs Titles */}
                        {/* Icon */}
                        <div className="fadeIn first">
                            <img src="https://www.b-cube.in/wp-content/uploads/2014/05/aditya-300x177.jpg" id="icon" alt="User Icon" />
                            <h1>Aditya News</h1>
                        </div>
                        {/* Login Form */}
                        <form onSubmit={this.submitChangePasswordHandler}>
                            <input type="password" id="password" onChange={this.changeHandler} className="fadeIn second" name="newPassword" placeholder="password" />
                            <input type="password" id="comfirmPassword" onChange={this.changeHandler} className="fadeIn third" name="newComfirmPassword" placeholder="comfirm password" />
                            <input type="submit" className="fadeIn fourth" value="Update" />
                        </form>
                        {/* Remind Passowrd */}
                        <div id="formFooter">
                            <a className="underlineHover" onClick={() => {document.getElementById("formEditPassword").style.display = "none"}} href="#">Cancel</a>
                        </div>
                    </div>
                </div>   
            </div>
        )
    }
}
