import React from 'react';
import { connect } from 'react-redux';

class UserList extends React.Component {

    render() {
        return (
            <div>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Avatar</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Id</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.props.users
                            && this.props.users.map((user, index) => {
                                return (
                                    <tr key={user.id} style={{ textAlign: 'center' }}>
                                        <td>{index}</td>
                                        <td><img style={{ width: '30px', height: '30px', borderRadius: '50%' }} alt="img" src={user.avatar} /></td>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>)
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        users: state.users.users
    }
}

export default connect(mapStateToProps)(UserList); 