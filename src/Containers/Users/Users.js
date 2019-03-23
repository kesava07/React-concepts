import React, { Component } from 'react'
import Header from '../../Components/Header';
import Axios from 'axios';

export default class Users extends Component {
    state = {
        userData: []
    }
    componentDidMount() {
        this.getUserData()
    }
    // componentDidUpdate() {
    //     this.getUserData()
    // }
    getUserData = () => {
        Axios.get("/user.json")
            .then(res => {
                const userData = [];
                for (let key in res.data) {
                    const changedData = {
                        id: key,
                        firstName: res.data[key].firstName,
                        lastName: res.data[key].lastName,
                        email: res.data[key].email,
                        gender: res.data[key].gender,
                        likedColor: res.data[key].likedColor,
                        about: res.data[key].about,
                        employed: res.data[key].employed
                    }
                    userData.push(changedData);

                }
                this.setState({ userData })
            })
            .catch(err => {
                console.log(err)
            })
    }


    handleDeleteUser = id => {
        // this.props.history.push('/user/' + id)
        Axios.delete(`/user/${id}.json`)
            .then(res => {
                console.log("deleted")
                let userDataCopy = this.state.userData // grab a copy of the todo list
                for (let i = 0; i < userDataCopy.length; i++) {
                    let user = userDataCopy[i]
                    if (user.id === id) {        // if it’s the correct ID...
                        userDataCopy.splice(i, 1)  // delete the item
                        break                      // we’re done! break the loop
                    }
                }
                this.setState({ userData: userDataCopy })
            })
            .catch(err => {
                console.log(err)
            })
    };

    handleUpdate = data => {
        console.log(data);
        this.props.history.push('/user', data)
    }
    displayUserData = data => data && (
        data.map(val => <tr key={val.id}>
            <td>{val.firstName}</td>
            <td>{val.lastName}</td>
            <td>{val.email}</td>
            <td>{val.gender}</td>
            <td>{val.likedColor}</td>
            <td>{val.about}</td>
            <td>{val.employed ? "Yes" : "No"}</td>
            <td>
                <button className="btn btn-sm btn-danger" onClick={() => this.handleDeleteUser(val.id)}>
                    <i className="fa fa-trash-o"></i>
                </button>
                <button className="btn btn-sm btn-primary ml-2" onClick={() => this.handleUpdate(val)}>
                    <i className="fa fa-pencil"></i>
                </button>
            </td>
        </tr >)
    )
    render() {
        const { userData } = this.state;
        return (
            <React.Fragment>
                <Header />
                <h1 className="text-center mt-4"> Implementation of Axios</h1>
                <div className="container-fluid">
                    <table className="table table-bordered table-sm mt-5">
                        <thead>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Email</th>
                                <th>gender</th>
                                <th>Color</th>
                                <th>About</th>
                                <th>Employee</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.displayUserData(userData)}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
