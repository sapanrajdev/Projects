/* eslint-disable no-unused-expressions */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { usersActions } from '../../actions/users.action';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                phone: '',
                address: '',
                pincode: '',
                avatar: ''
            },
            error: {}
        }
    }

    initialState = () => {
        this.setState({
            user: {
                first_name: '',
                last_name: '',
                email: '',
                username: '',
                phone: '',
                address: '',
                pincode: '',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/mrmoiree/128.jpg'
            },
            error: {}
        });
    }

    handleChange = async (e) => {

        const user = { ...this.state.user };
        const key = e.target.id;
        let value = e.target.value;
        user[key] = value;
        this.setState({
            user
        }, () => this.validate(key, value));
    }

    validate = (key, value) => {
        let { error } = this.state;
        switch (key) {
            case 'first_name':
                if (value.length <= 0)
                    error[key] = "First Name can not be empty";
                else if (value.length > 20)
                    error[key] = "First Name can not be more than 20 characters";
                else
                    delete error[key];
                break;
            case 'last_name':
                if (value.length <= 0)
                    error[key] = "Last Name can not be empty";
                else if (value.length > 20)
                    error[key] = "Last Name can not be more than 20 characters";
                else
                    delete error[key];
                break;
            case 'email':
                if (value.length <= 0)
                    error[key] = "Email can not be empty";
                else if (!value.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/))
                    error[key] = "Email is not valid";
                else if (value.length > 50)
                    error[key] = "Email can not be more than 50 characters";
                else
                    delete error[key];
                break;
            case 'username':
                if (value.length <= 0)
                    error[key] = "User Name can not be empty";
                else if (value.match(/\s/))
                    error[key] = "Space is not allowed in usename";
                else if (value.length > 10)
                    error[key] = "Username can not be more than 10 digits";
                else
                    delete error[key];
                break;
            case 'phone':
                if (value.length <= 0)
                    error[key] = "Phone Number can not be empty";
                if (!value.match(/^[0-9]*$/))
                    error[key] = "Phone number should be number only";
                else if (value.length > 10)
                    error[key] = "Phone Number can not be more than 10 digits";
                else
                    delete error[key];
                break;
            case 'address':
                if (value.length <= 0)
                    error[key] = "Address is required";
                else if (value.length > 100)
                    error[key] = "Address can not be more than 100 Characters";
                else
                    delete error[key];
                break;
            case 'pincode':
                if (!value.match(/^[0-9]*$/))
                    error[key] = "Pin Code should be number only";
                else if (value.length <= 0)
                    error[key] = "Pin Code can not be empty";
                else if (value.length > 10)
                    error[key] = "Pin Code can not be more than 10 digits";
                else
                    delete error[key];
                break;
            default:
                error = {}
        }

        this.setState({ error });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let self = this;
        Object.keys(self.state.user).map(field => {
            return self.validate(field, self.state.user[field])
        });
        if (Object.keys(self.state.error).length === 0 && self.state.error.constructor === Object)
            this.props.addUpdateUser(self.state.user);
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h3>Registration</h3>
                <form onSubmit={this.handleSubmit}>
                    {Object.keys(this.state.user).map(field => {
                        return (<div key={field}>
                            {field}: <input
                                id={field}
                                type="text"
                                value={this.state.user[field]}
                                onChange={this.handleChange}
                            />
                            <br />
                            <small>{this.state.error && this.state.error[field]}</small>
                        </div>
                        )
                    })}
                    <input type="button" onClick={this.initialState} value="Reset" />
                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.users.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            addUpdateUser: usersActions.addUpdateUser
        },
        dispatch,
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration); 