import { Button, Classes, Icon, InputGroup } from "@blueprintjs/core";
import { useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import "../App.css";
import { DocumentType } from "../store/models/Document";

type SideBarProps = {
  addDocument: (name: string) => void;
  removeDocument: (name: string) => void;
  setCurrDocument: (name: string) => void;
  documents: DocumentType[]; //typeof Document[]; does not work
};

export const SideBar = ({
  documents,
  addDocument,
  removeDocument,
  setCurrDocument,
}: SideBarProps) => {
  let [searchParams] = useSearchParams();
  const newDocInput = useRef<HTMLInputElement>(null);

  return (
    <aside className="sidebarContainer">
      <InputGroup
        large={true}
        placeholder="Document name..."
        inputRef={newDocInput}
        rightElement={
          <Button
            className={Classes.LARGE}
            icon="document"
            text="New"
            onClick={() => {
              if (newDocInput.current && newDocInput.current.value) {
                addDocument(newDocInput.current.value);
                newDocInput.current.value = "";
              }
            }}
          />
        }
      />
      {documents.map((doc) => (
        <NavLink
          key={doc.id}
          to={`/workspace/document/${doc.id}?workspaceId=${searchParams.get(
            "workspaceId"
          )}`}
          className={({ isActive }) =>
            isActive ? "activeLink" : "inactiveLink"
          }
          onClick={() => setCurrDocument(doc.id)}
        >
          <Button
            className={Classes.MINIMAL}
            style={{ width: "100%" }}
            icon="document-open"
            rightIcon={
              <Icon icon="delete" onClick={() => removeDocument(doc.id)} />
            }
            text={doc.id}
            alignText="left"
          />
        </NavLink>
      ))}
    </aside>
  );
};
