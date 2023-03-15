import { observer } from "mobx-react-lite";
import { useParams, useSearchParams } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { store } from "../store/store";
import DocumentView from "../views/DocumentView";

import { Button, NonIdealState } from "@blueprintjs/core";
import { useEffect } from "react";
import { subToWorkspace, unsubFromWorkspace } from "../transport/webSocket";

import { NonIdealStateIconSize } from "@blueprintjs/core";

type Props = {
  store: typeof store;
};

let docCounter: number = 1;
const Worksapce = ({ store }: Props) => {
  let { docId } = useParams();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const workspaceId = searchParams.get("workspaceId");

    if (workspaceId) {
      subToWorkspace(workspaceId);
      store.setCurrWorksapce(workspaceId);
    }

    return () => {
      workspaceId && unsubFromWorkspace(workspaceId);
    };
  }, []);

  const docs = store.docs.map((doc) => doc);
  const currentDoc = docId && docs.find((doc) => doc.id === docId);

  const icon = "search",
    iconSize = NonIdealStateIconSize.STANDARD,
    layout = "vertical",
    showTitle = true;

  return (
    <div style={{ display: "flex" }}>
      <SideBar
        documents={docs}
        addDocument={(docName) => store.addDocument(docName)}
        removeDocument={(docName) => store.removeDocument(docName)}
        setCurrDocument={(docName) => store.setCurrentDocID(docName)}
      />
      {currentDoc ? (
        <DocumentView document={currentDoc} />
      ) : (
        <div style={{ flexGrow: 2, flexShrink: 0, padding: 8 }}>
          <NonIdealState
            icon={icon}
            iconSize={iconSize}
            title={"No docuents found"}
            description={
              <div>
                Your view didn't match any files.
                <br />
                Try to select exisiting document or create a new document.
              </div>
            }
            action={
              <Button
                outlined={true}
                text="New Document"
                icon="plus"
                intent="primary"
                onClick={() =>
                  store.addDocument("New Document " + docCounter++)
                }
              />
            }
            layout={layout}
          />
        </div>
      )}
    </div>
  );
};

export default observer(Worksapce);
