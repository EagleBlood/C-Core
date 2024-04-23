import { FunctionComponent, useState } from "react";
import { ManageUserProps } from "./manageUser.props";
import { Wrapper } from './manageUser.style';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ManageUser: FunctionComponent<ManageUserProps> = ({ editUserData }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleEditUserData = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (editUserData) {
      editUserData(username, password, email, role);
    }
    navigate('/home');
  }

  return (
    <Wrapper>
      <motion.div 
        className="popupContainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{
          duration: 0.8,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 5,
            stiffness: 100,
            restDelta: 0.001,
            from: 0.5,
            to: 1,
          },
        }}
      >
        <h1>Edit User</h1>

        <form id="editUserForm" className="formContainer" onSubmit={handleEditUserData}>
          <div className="inputItemContainer">
            <p>Username</p>
            <div className="inputField">
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
          </div>

          <div className="inputItemContainer">
            <p>Email</p>
            <div className="inputField">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
          </div>

          <div className="inputItemContainer">
            <p>Password</p>
            <div className="inputField">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
          </div>

          <div className="inputItemContainer">
            <p>Role</p>
            <div className="inputField">
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select a role</option>
                <option value="role1">Role 1</option>
                <option value="role2">Role 2</option>
                <option value="role3">Role 3</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>
        </form>

        <button type="submit" form="editUserForm">Confirm</button>
      </motion.div>
    </Wrapper>
  );
};

export default ManageUser;