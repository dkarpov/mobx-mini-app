import { types, onPatch, applyPatch, IJsonPatch } from 'mobx-state-tree'
import { Document } from './models/Document'

import { socket, submitPatch } from "../transport/webSocket"

let inPatching = false

const RootStore = types.model({
    currentWorkspaceId: types.string,
    currentDocId: types.optional(types.string, ''),
    docs: types.array(Document),
}).actions((self) => {
    function addDocument(docName: string) {
        self.docs.push(Document.create({ id: docName, values: [] }));
    }

    function removeDocument(docName: string) {
        const index = self.docs.findIndex(({ id }) => docName === id)
        self.docs.remove(self.docs[index])
    }

    function setCurrWorksapce(id: string) {
        self.currentWorkspaceId = id;
    }

    function setCurrentDocID(id: string) {
        self.currentDocId = id
    }

    return { addDocument, removeDocument, setCurrWorksapce, setCurrentDocID }
})

export const store = RootStore.create({
    currentWorkspaceId: 'myworkspaceID',
    docs: [Document.create({ id: 'test', values: [{ id: '1', key: 'test', value: 'test value' }] })]
})

onPatch(store, (patch) => {
    const { path } = patch

    console.log('@@@ onPatch', patch)

    if (path !== '/currentWorkspaceId' && path !== '/currentDocId') {
        if (!inPatching && store.currentWorkspaceId && store.currentDocId) {
            console.log('@@@', patch)
            submitPatch(store.currentWorkspaceId, store.currentDocId, patch)
        }
    }
})

export const applyPatchWrap = (workspaceId: string, docId: string, patch: IJsonPatch | IJsonPatch[]) => {
    if (workspaceId === store.currentWorkspaceId) {
        inPatching = true;
        applyPatch(store, patch)
        inPatching = false;
    }
}
