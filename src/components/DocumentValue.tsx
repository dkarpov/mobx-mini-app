import { Button, ControlGroup, InputGroup } from "@blueprintjs/core";

import { DocumentValueType } from "../store/models/Document";

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

type Props = {
  doc: any;
  docValue: DocumentValueType;
};
const DocumentValuePair = ({ doc, docValue }: Props) => {
  const [value, setValue] = useState(docValue.value);
  const [key, setKey] = useState(docValue.key);

  useEffect(() => {
    setKey(docValue.key);
    setValue(docValue.value);
  }, [docValue]);

  return (
    <ControlGroup
      fill={true}
      vertical={false}
      style={{ display: "flex", alignItems: "center" }}
      key={docValue.id}
    >
      <InputGroup
        placeholder="Enter key"
        value={key}
        onChange={(evt) => {
          setKey(evt.target.value);
        }}
        onBlur={() => {
          doc.changeValue(docValue.id, value, key);
        }}
      />
      <InputGroup
        placeholder="Enter value"
        value={value}
        onChange={(evt) => setValue(evt.target.value)}
        onBlur={() => {
          doc.changeValue(docValue.id, value, key);
        }}
      />
      <div>
        <Button
          icon="arrow-up"
          small={true}
          onClick={(evt) => {
            doc.moveValue(-1, docValue.id);
          }}
        />
        <Button
          icon="arrow-down"
          small={true}
          onClick={() => doc.moveValue(1, docValue.id)}
        />
        <Button
          icon="remove"
          small={true}
          onClick={(evt) => doc.removeValue(docValue.id)}
        />
      </div>
    </ControlGroup>
  );
};

export default observer(DocumentValuePair);
