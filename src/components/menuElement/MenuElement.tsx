import { FunctionComponent } from "react";
import { MenuElementProps } from "./menuElement.props";
import { Wrapper } from './menuElement.style';

const MenuElement: FunctionComponent<MenuElementProps> = ({ name }) => {
  return (
    <Wrapper>
      <p>{name}</p>
    </Wrapper>
  );
};

export default MenuElement;