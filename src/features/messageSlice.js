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
    groupMessages:{},
    chattingWithUser:false,
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
        initialiseGroupMessages:(state,action)=>{
            state.groupMessages[action.payload.id]=action.payload.messages;
        },
        addGroupMessage: (state, action) => {
            const { senderId, content, date, groupId } = action.payload;
            if (!state.groupMessages[groupId]) {
                state.groupMessages[groupId] = [];
            }
            state.groupMessages[groupId].push({
                content: content,
                sender: senderId,
                sentAt: date,
            });
        },
        setChattingWithUser:(state,action)=>{
            state.chattingWithUser = action.payload;
        },
        clearMessages: (state, action) => {
            const { userId } = action.payload;
            if (state.messages[userId]) {
                delete state.messages[userId];
            }
        },
    },
});

export const { addMessage, clearMessages, initialiseMessages,setChattingWithUser, initialiseGroupMessages,addGroupMessage } = messageSlice.actions;

export default messageSlice.reducer;