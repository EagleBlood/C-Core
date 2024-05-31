import { useEffect, useState } from 'react';
import { PhAvatar } from "../../assets/PhAvatar";
import { UsersProps } from "./users.props";
import { Wrapper } from './users.style';
import { FunctionComponent } from "react";
import { User } from '../../interfaces/UserContext';
import ManageUser from '../popups/manageUser/ManageUser';

const Users: FunctionComponent<UsersProps> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetch('http://localhost:3100/api/user/all')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    //console.log(user);
    //console.log(user._id);
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

  return (
    <Wrapper>
      <div className="scrollContainer">
        <div className="userContainer">
          {users.map(user => (
            <div key={user._id} className="userBox" onClick={() => handleUserClick(user)}>
              <PhAvatar/>
              <div className="col">
                <h1>{user.name}</h1>
                <p>Role: <span className="specialText">{user.role}</span></p>
              </div>
            </div>
          ))}

          {selectedUser && <ManageUser user={selectedUser} onUpdate={handleUserUpdate} onCancel={handlePopupCancel} editUserData={updateUser} deleteUser={removeUser} />}
        </div>
      </div>
    </Wrapper>
  );
}

export default Users;