import {
  Alignment,
  Button,
  Classes,
  InputGroup,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import { useNavigate } from "react-router-dom";

type HeaderProps = {
  message?: string;
};

export const Header = ({ message = "BlueprintJS" }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <nav>
      <Navbar>
        <NavbarGroup align={Alignment.RIGHT}>
          <NavbarHeading>{message}</NavbarHeading>
          <NavbarDivider />
          <Button
            className={Classes.LARGE}
            icon="home"
            text="Home"
            onClick={(evt) => {
              navigate("/");
            }}
          />
          <NavbarDivider />
        </NavbarGroup>
      </Navbar>
    </nav>
  );
};
