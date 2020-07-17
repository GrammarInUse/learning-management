import React, { Component } from 'react'

export default class NavMenu extends Component {
    constructor(props){
      super(props);


    }

    logoutHandler = (e) => {
      e.preventDefault();

      localStorage.removeItem("login");

      window.location.reload();
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
              <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="/">S-Knowledge-Management</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon" /></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto my-2 my-lg-0">
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#about">About</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/topics">Topics</a></li>
                    <li className="nav-item"><a className="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                    { 
                      !this.props.login?
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/login">Login</a></li>
                      :<li className="nav-item"><a className="nav-link js-scroll-trigger" href="/profile">Hello {this.props.fullName}</a></li>
                    }
                    
                    {
                      !this.props.login?
                      <li className="nav-item"><a className="nav-link js-scroll-trigger" href="/signup">Signup</a></li>
                      :<li className="nav-item"><a className="nav-link js-scroll-trigger" onClick={this.logoutHandler} href="#">Log out</a></li>
                    }
                    
                  </ul>
                </div>
              </div>
            </nav>
        )
    }
}
