import { useState } from 'react';
import { PhAvatar } from "../../assets/PhAvatar";
import { UsersProps } from "./users.props";
import { Wrapper } from './users.style';
import { FunctionComponent } from "react";
import { User } from '../../interfaces/UserContext';
import ManageUser from '../popups/manageUser/ManageUser';

const Users: FunctionComponent<UsersProps> = ({}) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleUserUpdate = (user: User) => {
    // Update the user data here
    // Then close the popup
    setSelectedUser(null);
  };

  const handlePopupCancel = () => {
    setSelectedUser(null);
  };

  const updateUser = (userId: number, userName: string, userEmail: string, userPassword: string, userRole: string) => {
    // Implement the logic to edit user data here
  };
  
  const removeUser = (userId: number) => {
    // Implement the logic to delete user here
  };

  const user: User = {
    id: 1,
    username: 'User1',
    email: 'user1@wp.pl',
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

          {selectedUser && <ManageUser user={selectedUser} onUpdate={handleUserUpdate} onCancel={handlePopupCancel} editUserData={updateUser} deleteUser={removeUser} />}
            
        </div>
      </div>
    </Wrapper>
  );
}

export default Users;