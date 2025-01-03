import config from '../config/config.js';
import axios from 'axios';

export class MessagesService {
    API;

    constructor() {
        this.API = axios.create({
            baseURL: `${config.apiUrl}/api/messages`,
            withCredentials: true,
        });
    }

    // Send a message
    async sendMessage({ targetUser, targetGroupId, texts }) {
        try {
            const response = await this.API.post('/sendMessage', { targetUser, targetGroupId, texts });
            return response.data;
        } catch (error) {
            console.error('Error sending message:', error);
            throw error;
        }
    }

    // Get messages with a specific user
    async getMessagesWithUser(userId) {
        try {
            const response = await this.API.get(`/getUserMessages/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching messages with user:', error);
            throw error;
        }
    }

    // Get messages in a group
    async getGroupMessages(groupId) {
        try {
            const response = await this.API.get(`/group/${groupId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching group messages:', error);
            throw error;
        }
    }

    // Mark a message as read
    async markMessageAsRead(messageId) {
        try {
            const response = await this.API.post('/read', { messageId });
            return response.data;
        } catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    }
}

const messagesService = new MessagesService();

export default messagesService;
