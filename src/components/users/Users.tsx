import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { PhAvatar } from "../../assets/PhAvatar";
import { UsersProps } from "./users.props";
import { Wrapper } from './users.style';
import { FunctionComponent } from "react";
import { User } from '../../interfaces/UserContext';

interface DecodedToken extends JwtPayload {
  userId: string;
}

const Users: FunctionComponent<UsersProps> = ({}) => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken | null = jwtDecode<DecodedToken>(token);
      setCurrentUserId(decoded?.userId ?? null);
      console.log('decoded', decoded);
    }
  }, []);

  useEffect(() => {
    fetch('http://localhost:3100/api/user/all')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);


  const handleUserClick = (user: User) => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken | null = jwtDecode<DecodedToken>(token);
      if (decoded && decoded.userId === user._id) {
        console.log('This is the currently logged-in user');
      } else {
        console.log('This is a different user');
      }
    }
    navigate(`/profile/${user._id}`);
  };

  return (
    <Wrapper>
      <div className="scrollContainer">
        <div className="userContainer">
          {users.map(user => (
            <div key={user._id.toString()} className={`userBox ${currentUserId === user._id.toString() ? 'itemSelected' : ''}`} onClick={() => handleUserClick(user)}>
              <PhAvatar/>
              <div className="col">
                <h1>{user.name}</h1>
                <p>Role: <span className="specialText">{user.role}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Users;