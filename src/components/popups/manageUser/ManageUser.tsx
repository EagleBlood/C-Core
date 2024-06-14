import { FunctionComponent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ManageUserProps } from "./manageUser.props";
import { Wrapper } from './manageUser.style';
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode"; // Corrected import statement
import { JwtPayload } from "../../../interfaces/JwtPayloadContext";

const ManageUser: FunctionComponent<ManageUserProps> = () => {
  const { userId } = useParams<{ userId: string }>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [active, setActive] = useState<boolean | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<JwtPayload | null>(null); // Added state for decoded token

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:3100/api/user/${userId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text(); // First, get the response as text
        })
        .then(text => {
          if (!text) {
            throw new Error('Response body is empty');
          }
          console.log('Response body:', text); // Log the raw response body for debugging
          return JSON.parse(text); // Manually parse the text as JSON
        })
        .then(data => {
          setUsername(data.name);
          setEmail(data.email);
          setRole(data.role);
          setActive(data.active);
          // Set other user details as needed
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    }
  }, [userId]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token); // Use try-catch to safely decode
        setCurrentUserId(decoded.userId); // Assuming the token has a userId field
        setDecodedToken(decoded); // Update the state with the decoded token
        console.log('decoded', decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        // Handle the error (e.g., navigate to a login page, show an error message)
      }
    }
  }, []);
  
  // Handlers for form inputs and buttons
  const handleEditUserData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formValues: Record<string, FormDataEntryValue> = {};
    for (let [key, value] of formData.entries()) {
      formValues[key] = value;
    }
  
    // Assuming `currentUserId` holds the _id of the user being edited
    if (currentUserId) {
      console.log('Updating user with ID:', currentUserId);
      formValues['_id'] = currentUserId;
      console.log('Updated values:', formValues);
    }
  
    fetch('http://localhost:3100/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
  
    console.log(formValues);
    navigate('/profile');
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleActiveStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActive(e.target.value === 'true');
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3100/api/user/delete/${userId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Refresh the user list or redirect as needed
        navigate('/profile');
      } else {
        // Handle server errors or unsuccessful deletion
        const error = await response.json();
      }
    } catch (error) {
      // Handle network errors
      console.error('Failed to delete user:', error);
    }
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <Wrapper>
        <motion.div 
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0, 0.71, 0.2, 1.01] }}
        />

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
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} name="name"/>
                </div>
              </div>

              <div className="inputItemContainer">
                <p>Email</p>
                <div className="inputField">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email"/>
                </div>
              </div>

              <div className="inputItemContainer">
                <p>Password</p>
                <div className="inputField">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} name="password"/>
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
                  <p>Account availability</p>
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

                {userId.toString() === decodedToken?.userId && (
                  <div className="inputItemContainer">
                    <p>Token Expiration Date</p>
                    <h2>{decodedToken && decodedToken.exp ? new Date(decodedToken.exp * 1000).toLocaleString() : 'N/A'}</h2>
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

    </Wrapper>
  );
};

export default ManageUser;