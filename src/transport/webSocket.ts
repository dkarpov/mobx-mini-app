import { applyPatchWrap } from './../store/store';
import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const socket = io("http://localhost:9001");

const subToWorkspace = (workspaceId: string) => {
    socket.emit("sub", { workspaceId }, (success: any) => {
        if (success) {
            console.log(`Subscribed to ${workspaceId}`);
        }
    });
};

const unsubFromWorkspace = (workspaceId: string) => {
    socket.emit("unsub", { workspaceId }, (success: any) => {
        if (success) {
            console.log(`Unsubscribed from ${workspaceId}`);
        }
    });
};

const submitPatch = (workspaceId: string, documentId: string, patches: any) => {
    const patchId = uuidv4();

    socket.emit("patch", { workspaceId, documentId, patchId, patches }, (success: any) => {
        if (success) {
            console.log(`Patch ${patchId} for document ${documentId} sent to ${workspaceId}`);
        }
    });
};

socket.on("connect", () => {
    // const workspaceId = "my-workspace";
    // const docId = "doc1";
    console.log('Connection established: ', socket)
    // subToWorkspace(workspaceId);
    // submitPatch(workspaceId, docId, ["your-json-patches here"]);
});

socket.on("patch", (data: { workspaceId: string, documentId: string, patchId: string, patches: any }) => {
    console.log(`Patch ${data.patchId} received for workspace ${data.workspaceId}`);
    const { workspaceId, documentId, patches, patchId } = data;
    console.log('Patch DATA', patches);

    applyPatchWrap(workspaceId, documentId, patches)

});

export { subToWorkspace, unsubFromWorkspace, submitPatch, socket }