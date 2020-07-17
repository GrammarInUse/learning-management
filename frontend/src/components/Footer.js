import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 footer-info">
                                <h3>SKM</h3>
                                <p>That's some details about my website.</p>
                            </div>
                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="ion-ios-arrow-right" /> <a href="/">Home</a></li>
                                    <li><i className="ion-ios-arrow-right" /> <a href="#">About us</a></li>
                                    <li><i className="ion-ios-arrow-right" /> <a href="#">Services</a></li>
                                    <li><i className="ion-ios-arrow-right" /> <a href="#">Terms of service</a></li>
                                    <li><i className="ion-ios-arrow-right" /> <a href="#">Privacy policy</a></li>
                                </ul>
                            </div>
                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>Contact Us</h4>
                                <p>
                                Lê Văn Thọ Street <br />
                                TP.HCM, Gò Vấp district<br />
                                Viet Nam <br />
                                <strong>Phone:</strong> 0393166366<br />
                                <strong>Email:</strong> 1760403@student.hcmus.edu.vn<br />
                                </p>
                                <div className="social-links">
                                    <a href="#" className="twitter"><i className="fa fa-twitter" /></a>
                                    <a href="#" className="facebook"><i className="fa fa-facebook" /></a>
                                    <a href="#" className="instagram"><i className="fa fa-instagram" /></a>
                                    <a href="#" className="google-plus"><i className="fa fa-google-plus" /></a>
                                    <a href="#" className="linkedin"><i className="fa fa-linkedin" /></a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 footer-newsletter">
                                <h4>Our Newsletter</h4>
                                <p>We will show you all newest things we have. Subscribe us now.</p>
                                <form>
                                    <input type="email" name="email" />
                                    <input type="submit" value="Subscribe" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        © Copyright <strong>SKM</strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        {/*
                    All the links in the footer should remain intact.
                    You can delete the links only if you purchased the pro version.
                    Licensing information: https://bootstrapmade.com/license/
                    Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/buy/?theme=E-Banking
                    */}
                        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
                    </div>
                </div>
            </footer>
        )
    }
}
