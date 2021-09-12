import React, { useState } from 'react';
import AddUser from './components/users/addUser';
import UserList from './components/users/userList';

function App() {
  const [users, setUsers] = useState([]);

  const onAddUserHandler = (user) => {
    setUsers(prevValue => {
      return [user, ...prevValue];
    })
  }

  return (
    <div>
      <AddUser onAddUser={onAddUserHandler} />
      <UserList users={users} />
    </div>
  );
}

export default App;
