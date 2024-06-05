import { FunctionComponent, useState } from "react";
import { ManageUserProps } from "./manageUser.props";
import { Wrapper } from './manageUser.style';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useJwtPayload } from "../../../interfaces/JwtPayloadContext";

const ManageUser: FunctionComponent<ManageUserProps & { shouldShowPopup: boolean }> = ({ user, onCancel, editUserData, deleteUser, onUserDataChange, shouldShowPopup }) => {
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(user.role);
  const [active, setActive] = useState(user.active);
  const [isAdmin, setIsAdmin] = useState(true);

  const [isVisible, setIsVisible] = useState(shouldShowPopup);
  const jwtPayloadContext = useJwtPayload();

  if (jwtPayloadContext && jwtPayloadContext.decoded) {
    const userId = jwtPayloadContext.decoded.userId;
    const exp = jwtPayloadContext.decoded.exp;
    
    // use userId and exp here
  }


  useEffect(() => {
    setIsVisible(shouldShowPopup);
  }, [shouldShowPopup]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value;
    setRole(newRole);
    setIsAdmin(newRole === 'admin');
  };
  
  const handleActiveStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setActive(event.target.value === 'true');
  };

  useEffect(() => {
    setUserId(user._id);
    setUsername(user.name);
    setEmail(user.email);
    setRole(user.role);
    setActive(user.active);
    setIsAdmin(user.isAdmin);
  }, [user]);

  
  const handleCancel = () => {
    setIsVisible(false);
    setTimeout(onCancel, 400);
  };

  const handleEditUserData = (event: React.FormEvent) => {
    setIsVisible(false);
    event.preventDefault(); // Prevent the form from submitting normally
    setTimeout(() => {
    if (editUserData) {
      editUserData(userId, username, email, role, active, isAdmin);
      const updatedUser = { _id: userId, name: username, email: email, role: role, active: active, isAdmin: isAdmin };
      onUserDataChange(updatedUser); // Ensure onUserDataChange is defined and passed as a prop
      console.log(isVisible);
    }
  }, 400);
  }

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => {
      deleteUser(userId);
      if (userId) {
        localStorage.removeItem('token'); // Remove the token from local storage
      }
    }, 400);
  }

  const handleRefreshToken = async () => {

  };

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

              {/*<div className="inputItemContainer">
                <p>Password</p>
                <div className="inputField">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
          </div>*/}

              <div className="row">
                
                <div className="inputItemContainer">
                  <p>Role</p>
                  <div className="col">
                    <div className="row">
                      <input 
                        type="radio" 
                        id="admin" 
                        name="role" 
                        value="admin" 
                        onChange={handleRoleChange}
                        checked={role === 'admin'}
                      />
                      <label htmlFor="admin">Admin</label>
                    </div>
                    <div className="row">
                      <input 
                        type="radio" 
                        id="user" 
                        name="role" 
                        value="user" 
                        onChange={handleRoleChange}
                        checked={role === 'user'}
                      />
                      <label htmlFor="user">User</label>
                    </div>
                  </div>
                </div>

                <div className="inputItemContainer">
                  <p>Account availibity</p>
                  <div className="col">
                    <div className="row">
                      <input 
                        type="radio" 
                        id="active" 
                        name="activeStatus" 
                        value="true"
                        onChange={handleActiveStatusChange}
                        checked={active === true}
                      />
                      <label htmlFor="active">Active</label>
                    </div>
                    <div className="row">
                      <input 
                        type="radio" 
                        id="inactive" 
                        name="activeStatus" 
                        value="false" 
                        onChange={handleActiveStatusChange}
                        checked={active === false}
                      />
                      <label htmlFor="inactive">Inactive</label>
                    </div>
                  </div>
                </div>

                {userId.toString() === jwtPayloadContext?.decoded?.userId && (
                  <div className="inputItemContainerToken">
                    <div className="row">
                      <div className="col">
                        <p>Token Expiration  Date</p>
                        <h2>{jwtPayloadContext?.decoded?.exp ? new Date(jwtPayloadContext.decoded.exp * 1000).toLocaleString() : 'N/A'}</h2>
                      </div>
                      <button type="button" onClick={handleRefreshToken}>Refresh Token</button>
                    </div>
                  </div>
                )}

              </div>


            </form>
            
            <div className="row">
              <button type="submit" form="editUserForm">Confirm</button>
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
