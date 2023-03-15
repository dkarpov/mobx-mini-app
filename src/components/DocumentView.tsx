import { Button } from "@blueprintjs/core";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { v4 as uuid } from "uuid";
import "../styles/App.css";
import DocumentValuePair from "./DocumentValue";
import { DocumentValueType } from "../store/models/Document";

type Props = {
  //   document?: DocumentType;
  document?: any; //typeof Doc;
};

export const DocumentView = ({ document }: Props) => {
  let newValue: DocumentValueType = {
    id: uuid(),
    key: "",
    value: "",
  };

  console.log("@@@ file DocumentView.tsx line 19", toJS(document.values));

  return (
    <div className="documnetContainer">
      <Button
        style={{ minWidth: 400 }}
        large={true}
        icon="add"
        text="Add new key value pair"
        onClick={(e) => {
          document.addValue(newValue);
        }}
      />

      {document.values.map((docValue: DocumentValueType) => (
        <DocumentValuePair
          key={docValue.id}
          doc={document}
          docValue={docValue}
        />
      ))}
    </div>
  );
};

export default observer(DocumentView);
