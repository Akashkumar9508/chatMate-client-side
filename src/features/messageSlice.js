import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: {
        /**
         * userName(anant01): [
         *   {
         *     senderId: mongodbId,
         *     message: string,
         *     sentAt: Date.now(),
         *     isSeen:false,
         *   },
         *  ...
         * ]
         *...
         *...
         *...
         */
    },
};

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            const { senderId, content, userName } = action.payload;
            if (!state.messages[userName]) {
                state.messages[userName] = [];
            }
            state.messages[userName].push({
                content: content,
                sender: senderId,
                timestamp: new Date().toISOString(),
                isSeen: false,
            });
        },
        clearMessages: (state, action) => {
            const { userId } = action.payload;
            if (state.messages[userId]) {
                delete state.messages[userId];
            }
        },
    },
});

export const { addMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;