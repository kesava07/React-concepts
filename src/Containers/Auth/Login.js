import React, { Component } from 'react'
import Header from '../../Components/Header';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        rememberMe: false
    }

    componentDidMount() {
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        const email = rememberMe ? localStorage.getItem('email') : '';
        const password = rememberMe ? localStorage.getItem('password') : '';
        this.setState({ email, rememberMe, password });
    }

    handleOnSubmit = event => {
        event.preventDefault();
        const { email, password, rememberMe } = this.state;
        localStorage.setItem("rememberMe", rememberMe);
        localStorage.setItem("email", rememberMe ? email : '');
        localStorage.setItem("password", rememberMe ? password : '');

        this.props.history.push("/")
    }

    handleOnChange = e => {
        const input = e.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        this.setState({ [input.name]: value });
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4"> </div>
                        <div className="col-md-4 mt-5">
                            <form onSubmit={this.handleOnSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email address:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="pwd"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleOnChange}
                                    />
                                </div>
                                <div className="custom-control custom-checkbox mb-2">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck"
                                        name="rememberMe"
                                        checked={this.state.rememberMe}
                                        onChange={this.handleOnChange}
                                    />
                                    <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
