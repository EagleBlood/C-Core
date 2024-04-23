import { useState } from 'react';
import { PhAvatar } from "../../assets/PhAvatar";
import { UsersProps } from "./users.props";
import { Wrapper } from './users.style';
import { FunctionComponent } from "react";
import { User } from '../../interfaces/UserContext';
import ManageUsers from '../popups/manageUser/ManageUser';

const Users: FunctionComponent<UsersProps> = ({}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    // Open the ManageUsers popup here
  };

  // This is a placeholder user. In the future, you will fetch users from your database.
  const user: User = {
    id: 1,
    username: 'User1',
    email: 'user1@w.pl',
    password: 'qwerty',
    role: 'Admin',
  };

  return (
    <Wrapper>
      <div className="scrollContainer">
        <div className="userContainer">

          <div className="userBox" onClick={() => handleUserClick(user)}>
            <PhAvatar/>
            <div className="col">
              <h1>{user.username}</h1>
              <p>Role: <span className="specialText">{user.role}</span></p>
            </div>
          </div>

          {selectedUser && <ManageUsers user={selectedUser} />}
            
        </div>
      </div>
    </Wrapper>
  );
}

export default Users;