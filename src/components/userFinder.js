import { Fragment, useState, useEffect, Component } from 'react';
import UserContext from '../store/user-context';
import ErrorBoundary from './ErrorBoundary';
import classes from './userFinder.module.css';

import Users from './Users';

// const DUMMY_USERS = [
//     { id: 'u1', name: 'Max' },
//     { id: 'u2', name: 'Manuel' },
//     { id: 'u3', name: 'Julie' },
//   ];

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//         <div className={classes.finder}>
//             <input type='search' onChange={searchChangeHandler} />
//         </div>
//         <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

class UserFinder extends Component {
    static contextType = UserContext; // Can only set one context to one class
    constructor() {
        super();
        this.state = {
            filteredUsers: [],
            searchTerm: ''
        }
    }

    searchChangeHandler(event) {
        this.setState({
            searchTerm : event.target.value
        })
    }

    render() {
        return (
        <Fragment>
            <div className={classes.finder}>
                <input type='search' onChange={this.searchChangeHandler.bind(this)} />
            </div>
            <ErrorBoundary>
                <Users users={this.state.filteredUsers} />
            </ErrorBoundary>
        </Fragment>
        )
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchTerm !== this.state.searchTerm) { // Without this, It'll will create infinite loop
            this.setState({
                filteredUsers: this.context.users.filter((user) => user.name.includes(this.state.searchTerm))
            });
        }
    }

    componentDidMount() {
        // initial data load with http request
        this.setState({
            filteredUsers: this.context.users
        })
    }
}

export default UserFinder;