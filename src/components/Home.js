import * as React from 'react';
import{
  Link
} from 'react-router-dom';
import '../css/main.css'
import AdSense from 'react-adsense';

export default class Home extends React.Component {
    render() {
        return (
            <div>                    
                <section className="home-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mx-auto text-center">
                                <h3><i className="fas fa-rocket"></i> AcceleratedCrypto</h3>
                                <p>A platform to trade cryptocurrencies with virtual money.</p> 
                                <img src="./images/crypto1.jpg" width="100%" alt="crypto app mobile" />
                                   
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-dark" id="about">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h2 className="section-heading text-white">We've got what you need!</h2>
                        <hr className="light my-4" />
                        <p className="text-faded mb-4">Get your hands on virtual cryptos before going for the real deal</p>
                        <Link className="btn btn--teal btn-xl js-scroll-trigger" to="/coins">Get Started!</Link>
                    </div>
                    </div>
                </div>
                </section>

                <AdSense.Google
                    client='ca-pub-5912085209342908'
                    slot='5341547510'
                    style={{ display: 'block' }}
                    format='auto'
                    responsive="true"
                    />

                <section id="services">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 text-center">
                        <h2 className="section-heading">At Your Service</h2>
                        <hr className="my-4" />
                    </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fa fa-4x fa-chart-line text-primary mb-3 sr-icons"></i>
                        <h3 className="mb-3">Real Time Datas</h3>
                        <p className="text-muted mb-0"></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fa fa-4x fa-coins text-primary mb-3 sr-icons"></i>
                        <h3 className="mb-3">Virtual Cash</h3>
                        <p className="text-muted mb-0"></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fa fa-4x fa-dollar-sign text-primary mb-3 sr-icons"></i>
                        <h3 className="mb-3">Free</h3>
                        <p className="text-muted mb-0"></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="service-box mt-5 mx-auto">
                        <i className="fa fa-4x fa-heart text-primary mb-3 sr-icons"></i>
                        <h3 className="mb-3">Made with Love</h3>
                        <p className="text-muted mb-0"></p>
                        </div>
                    </div>
                    </div>
                </div>
                </section>

                <section className="bg-dark text-white">
                <div className="container text-center">
                    <h2 className="mb-4">Accelerated Cryptos</h2>
                    <img src="./images/crypto2.jpg" width="100%" alt="crypto app dark" />                    
                </div>
                </section>

                <section id="contact">
                <div className="container">
                    <div className="row">
                    <div className="col-lg-8 mx-auto text-center">
                        <h2 className="section-heading">Let's Get In Touch!</h2>
                        <hr className="my-4" />
                        <p className="mb-5">Give us a call or send us an email and we will get back to you as soon as possible!</p>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-lg-4 ml-auto text-center">
                        <i className="fa fa-phone fa-3x mb-3 sr-contact"></i>
                        <p>123-456-6789</p>
                    </div>
                    <div className="col-lg-4 mr-auto text-center">
                        <i className="fa fa-envelope-o fa-3x mb-3 sr-contact"></i>
                        <p>
                        <a href="mailto:lazehang@gmail.com">lazehang@gmail.com</a>
                        </p>
                    </div>
                    </div>
                </div>
            </section>
        </div>
        )
    }
}