import axios from 'axios';
import { constants } from '../constants/constants';

export const usersActions = {
    getUsers,
    addUpdateUser
};
function getUsers() {
    return dispatch => {
        const url = "https://reqres.in/api/users?page=4";
        axios.get(url)
            .then(response => {
                dispatch(success(constants.GET_USERS_SUCCESS, response.data));
            })
            .catch(error => {
                dispatch(failure(constants.GET_USERS_FAILURE, error));
            });
    };
}

function addUpdateUser(payload) {
    return dispatch => {
        const url = "https://reqres.in/api/users";
        axios.post(url, payload)
            .then(response => {
                dispatch(success(constants.USER_REGISTRATION_SUCCESS, response.data));
            })
            .catch(error => {
                dispatch(failure(constants.USER_REGISTRATION_FAILURE, error));
            });
    };
}

function success(type, payload) {
    return { type, payload };
}

function failure(type, error) {
    return { type, error };
}