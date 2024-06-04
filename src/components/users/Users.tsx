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
  const [shouldShowPopup, setShouldShowPopup] = useState(false);

  useEffect(() => {
    fetch('http://localhost:3100/api/user/all')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShouldShowPopup(true);
    console.log(shouldShowPopup);
  };

  const handlePopupCancel = () => {
    setSelectedUser(null);
  };

  const handleUserDataChange = (updatedUser: User) => {
    setUsers(users.map(user => user._id === updatedUser._id ? updatedUser : user));
    setSelectedUser(null);
  }

  const updateUser = (userId: number, userName: string, userEmail: string, userRole: string, isActive: boolean, isAdmin: boolean) => {
    fetch(`http://localhost:3100/api/user/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: userId,
            name: userName,
            email: userEmail,
            role: userRole,
            active: isActive,
            isAdmin: isAdmin,
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data here
        console.log(data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  const removeUser = (userId: number) => {
    fetch(`http://localhost:3100/api/user/delete/${userId}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response data here
        console.log(data);
        setUsers(users.filter(user => user._id !== userId)); // Update the users state
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    setSelectedUser(null);
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
  
          {selectedUser && <ManageUser shouldShowPopup={shouldShowPopup} user={selectedUser} onUserDataChange={handleUserDataChange} onCancel={handlePopupCancel} editUserData={updateUser} deleteUser={removeUser} />}
        </div>
      </div>
    </Wrapper>
  );
}

export default Users;