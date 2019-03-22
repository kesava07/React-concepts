import React, { Component } from 'react';
import Header from '../Components/Header';
import PageOne from '../Components/WizardPages/PageOne';
import PageTwo from '../Components/WizardPages/PageTwo';
import PageThree from '../Components/WizardPages/PageThree';
import Axios from 'axios';

export default class Wizard extends Component {
    state = {
        page: 1,
        firstName: "",
        lastName: "",
        email: '',
        gender: 'male',
        likedColor: '',
        about: '',
        employed: false,
        userData: [],
        update: false,
        updateId: null
    };

    componentDidMount() {
        this.toUpdateUsersData()
    }
    toUpdateUsersData = () => {
        if (this.props.location.state) {
            const user = this.props.location.state;
            this.setState({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender: user.gender,
                likedColor: user.likedColor,
                about: user.about,
                employed: user.employed,
                update: true,
                updateId: user.id
            })
        }
    }

    handleNext = () => {
        this.setState({ page: this.state.page + 1 })
    }
    handleBack = () => {
        this.setState({ page: this.state.page - 1 })
    }
    handleSubmit = () => {
        const { firstName, lastName, email, gender, likedColor, about, employed } = this.state;
        const userData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            likedColor: likedColor,
            about: about,
            employed: employed
        }
        Axios.post('/user.json', userData)
            .then(res => {
                console.log("posted successfully");
                this.setState({ page: 1, firstName: '', lastName: '', email: '', likedColor: '', about: '' });
                this.props.history.push('/users')
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleUpdate = id => {
        const { firstName, lastName, email, gender, likedColor, about, employed } = this.state;
        const updatedData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            gender: gender,
            likedColor: likedColor,
            about: about,
            employed: employed
        }
        Axios.put(`/user/${id}.json`, updatedData)
            .then(res => {
                console.log("updated")
                this.props.history.push("/users")
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleOnchange = (event) => {
        const input = event.target;
        const value = input.type === 'checkbox' ? input.checked : input.value;
        this.setState({ [input.name]: value })
    }
    render() {

        const { page, firstName, lastName, email, gender, likedColor, about, employed, update, updateId } = this.state;

        let Wizard = null;
        let emoji = null

        if (page && page === 1) {
            emoji = 'very-sad';
            Wizard = <PageOne
                next={this.handleNext}
                handleOnchange={this.handleOnchange}
                firstName={firstName}
                lastName={lastName}
            />
        }
        if (page && page === 2) {
            emoji = 'sad';
            Wizard = <PageTwo
                next={this.handleNext}
                back={this.handleBack}
                handleOnchange={this.handleOnchange}
                email={email}
                gender={gender}
            />
        }
        if (page && page === 3) {
            emoji = 'happy';
            Wizard = <PageThree
                submit={this.handleSubmit}
                back={this.handleBack}
                likedColor={likedColor}
                about={about}
                handleOnchange={this.handleOnchange}
                employed={employed}
                update={update}
                handleUpdate={this.handleUpdate}
                updateId={updateId}
            />
        }
        return (
            <React.Fragment>
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <img src={require(`../Emoji/${emoji}.svg`)} alt="emoji" width="50" height="" />
                        </div>
                        <div className="col-md-6 mt-5">
                            <div className="card card-header text-center">
                                <div>
                                    <div className="wizard_line"></div>
                                    <i className={`fa fa-user Icons__Styles ${page === 1 || page === 2 || page === 3 ? "active" : ''}`}></i>
                                    <i className={`fa fa-envelope-o Icons__Styles ${page === 2 || page === 3 ? "active" : ''}`}></i>
                                    <i className={`fa fa-heart Icons__Styles ${page === 3 ? "active" : ''}`}></i>
                                </div>
                            </div>
                            <div className="card card-body">
                                {Wizard}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
