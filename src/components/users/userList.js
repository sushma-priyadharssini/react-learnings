import classes from './userList.module.css';
import Card from '../ui/card';

const UserList = (props) => {
    return (
        <Card className={classes.users}>
            <ul className={classes.userList}>
                {props.users.map(user => (
                    <li key={user.id}>{`${user.name} | ${user.age} years old`}</li>
                ))}
            </ul>
        </Card>
    )
}

export default UserList;