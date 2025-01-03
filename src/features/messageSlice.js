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
        initialiseMessages:(state,action)=>{
            state.messages[action.payload.userName]=action.payload.messages;
        },
        addMessage: (state, action) => {
            const { senderId, content, userName,Date } = action.payload;
            if (!state.messages[userName]) {
                state.messages[userName] = [];
            }
            state.messages[userName].push({
                content: content,
                sender: senderId,
                sentAt: Date,
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

export const { addMessage, clearMessages, initialiseMessages } = messageSlice.actions;

export default messageSlice.reducer;