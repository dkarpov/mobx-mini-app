import { toJS } from 'mobx';
import { types } from "mobx-state-tree";

export type DocumentValueType = { key: string; value: string; id: string; };
export type DocumentType = {
  id: string,
  values?: DocumentValueType[],
}

export const DocumentValue = types.model({
  key: types.string,
  value: types.string,
  id: types.string,
});

export const Document = types
  .model({
    id: types.string,
    values: types.optional(types.array(DocumentValue), []),
  })
  .actions((self) => {
    function addValue(rec: DocumentValueType) {
      self.values.push(rec);
    }

    function changeValue(idx: string, value: string, key: string) {
      const docVal = self.values.filter(({ id }) => id === idx)[0];
      if (docVal) {
        docVal.value = value;
        docVal.key = key;

        console.log(toJS(self.values))
      }
    }

    function moveValue(direction: number, moveId: string) {
      const index = self.values.findIndex(({ id }) => moveId === id)
      const newIndex = index + direction;


      if (newIndex >= 0 && newIndex < self.values.length) {
        const element = self.values[index];
        const arr = [...self.values];

        arr.splice(index, 1);
        arr.splice(newIndex, 0, element);

        self.values.replace(arr);
        console.log('@@@ ', index, newIndex, element, toJS(self.values));
      }
    }

    function removeValue(removeId: string) {
      const index = self.values.findIndex(({ id }) => removeId === id)
      self.values.remove(self.values[index])
    }

    return { addValue, changeValue, removeValue, moveValue };
  }).views((self) => ({
    get docs() {
      return self.values
    }
  }));

