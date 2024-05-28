import { FunctionComponent, useState } from "react";
import { ManageUserProps } from "./manageUser.props";
import { Wrapper } from './manageUser.style';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../../interfaces/JwtPayloadContext";

const ManageUser: FunctionComponent<ManageUserProps> = ({ editUserData, user, onUpdate, onCancel, deleteUser }) => {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const token = localStorage.getItem('token');

  let decoded: JwtPayload | null = null;
  if (token) {
    decoded = jwtDecode(token);
    //console.log('decoded', userId, user._id, decoded);
  }

  useEffect(() => {
    setUserId(user._id);
    setUsername(user.name);
    setPassword(user.password);
    setEmail(user.email);
    setRole(user.role);
  }, [user]);

  
  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 400); // Delay onCancel to allow animation to finish
  };

  const handleEditUserData = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (editUserData) {
      editUserData(userId, username, password, email, role);
    }
  }
  
  const handleUpdate = () => {
    const updatedUser = { ...user, username, password, email, role };
    setIsVisible(false); // Make the popup start disappearing
    setTimeout(() => onUpdate(updatedUser), 400); // Delay onUpdate to allow animation to finish
  };

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => deleteUser(userId), 400);
  }

  return (
    <Wrapper>
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div 
            className="popupContainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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

              <div className="row">
                
                <div className="inputItemContainer">
                  <p>Role</p>
                  <div className="col">
                    <div className="row">
                      <input 
                        type="radio" 
                        id="admin" 
                        name="role" 
                        value="true" 
                        checked={user.role === "admin"} 
                        onChange={() => setRole("admin")}
                      />
                      <label htmlFor="admin">Admin</label>
                    </div>
                    <div className="row">
                      <input 
                        type="radio" 
                        id="user" 
                        name="role" 
                        value="false" 
                        checked={user.role === "user"} 
                        onChange={() => setRole("user")}
                      />
                      <label htmlFor="user">User</label>
                    </div>
                  </div>
                </div>

                {userId.toString() === decoded?.userId && (
                  <div className="inputItemContainer">
                    <p>Token Expiration  Date</p>
                    <h2>{decoded && decoded.exp ? new Date(decoded.exp * 1000).toLocaleString() : 'N/A'}</h2>
                  </div>
                )}

              </div>


            </form>
            
            <div className="row">
              <button type="submit" form="editUserForm" onClick={handleUpdate}>Confirm</button>
              <button type="button" onClick={handleDelete}>Delete</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default ManageUser;
