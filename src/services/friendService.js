import config from '../config/config.js';
import axios from 'axios';

export class FriendsService {
    API;

    constructor() {
        this.API = axios.create({
            baseURL: `${config.apiUrl}/api/friend-requests`,
            withCredentials: true,
        });
    }

    async sendFriendRequest(receiverUserId) {
        try {
            console.log("reciver's id", receiverUserId);
            const response = await this.API.post('/sendFriendRequest', { ReceiverUserId: receiverUserId });
            return response.data;
        } catch (error) {
            console.error('Error sending friend request:', error);
            throw error;
        }
    }

    // Get friend requests
    async getFriendRequests() {
        try {
            const response = await this.API.get('/getFriendRequests');
            return response.data;
        } catch (error) {
            console.error('Error fetching friend requests:', error);
            throw error;
        }
    }

    // Accept a friend request
    async acceptFriendRequest(userId) {
        try {
            const response = await this.API.put('/acceptRequest', { userId });
            return response.data;
        } catch (error) {
            console.error('Error accepting friend request:', error);
            throw error;
        }
    }

    // Decline a friend request
    async declineFriendRequest(username) {
        try {
            const response = await this.API.post('/decline-request', { username });
            return response.data;
        } catch (error) {
            console.error('Error declining friend request:', error);
            throw error;
        }
    }

    // Get all friends list
    async getFriendList() {
        try {
            const response = await this.API.get('/list');
            return response.data;
        } catch (error) {
            console.error('Error fetching friend list:', error);
            throw error;
        }
    }
}

const friendsService = new FriendsService();

export default friendsService;
