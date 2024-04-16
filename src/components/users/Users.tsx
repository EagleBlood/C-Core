
import { UsersProps } from "./users.props";
import { Wrapper } from './users.style';
import { FunctionComponent } from "react";

const Users: FunctionComponent<UsersProps> = ({}) => {

  return (
    <Wrapper>
        <div className="errorContainer">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
        </div>
    </Wrapper>
  );
}

export default Users;
