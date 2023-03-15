import React from "react";
import { InputGroup, Button, Intent } from "@blueprintjs/core";
import { useNavigate } from "react-router-dom";
import "../App.css";

export const Home = () => {
  const input = React.useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const navigateToWorkspace = () => {
    if (input.current?.value.trim().length) {
      navigate(`workspace?workspaceId=${input.current?.value}`);
    }
  };

  return (
    <div className="homeInputGroup">
      Welcome
      <InputGroup
        inputRef={input}
        placeholder="Enter worskpace ID"
        onKeyDown={(e) => {
          e.key === "Enter" && navigateToWorkspace();
        }}
        rightElement={
          <Button
            icon={"arrow-right"}
            intent={Intent.SUCCESS}
            minimal={true}
            onClick={(evt) => {
              navigateToWorkspace();
            }}
          />
        }
        large={true}
        type="text"
      />
    </div>
  );
};
