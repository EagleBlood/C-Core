
import { PhAvatar } from "../../assets/PhAvatar";
import { UsersProps } from "./users.props";
import { Wrapper } from './users.style';
import { FunctionComponent } from "react";

const Users: FunctionComponent<UsersProps> = ({}) => {

  return (
    <Wrapper>
      <div className="scrollContainer">
        <div className="userContainer">

          <div className="userBox">
            <PhAvatar/>
            <div className="col">
              <h1>Title</h1>
              <p>Role: <span className="specialText">Admin</span></p>
            </div>
          </div>
            
        </div>
      </div>
    </Wrapper>
  );
}

export default Users;
