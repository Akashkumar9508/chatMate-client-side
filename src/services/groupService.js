import config from '../config/config.js';
import axios from 'axios';

export class GroupsService {
    API;

    constructor() {
        this.API = axios.create({
            baseURL: `${config.apiUrl}/api/groups`,
            withCredentials: true,
        });
    }

    // Create a group
    async createGroup(name, members) {
        try {
            const response = await this.API.post('/create', { name, members });
            return response.data;
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    }

    // Get group details
    async getGroupDetails(groupId) {
        try {
            const response = await this.API.get(`/${groupId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching group details:', error);
            throw error;
        }
    }

    // Add a member to a group
    async addMemberToGroup(groupId, memberId) {
        try {
            const response = await this.API.post('/add-member', { groupId, memberId });
            return response.data;
        } catch (error) {
            console.error('Error adding member to group:', error);
            throw error;
        }
    }

    // Remove a member from a group
    async removeMemberFromGroup(groupId, memberId) {
        try {
            const response = await this.API.post('/remove-member', { groupId, memberId });
            return response.data;
        } catch (error) {
            console.error('Error removing member from group:', error);
            throw error;
        }
    }

    // Update group name
    async updateGroupName(groupId, newName) {
        try {
            const response = await this.API.post('/update', { groupId, newName });
            return response.data;
        } catch (error) {
            console.error('Error updating group name:', error);
            throw error;
        }
    }

    // Delete a group
    async deleteGroup(groupId) {
        try {
            const response = await this.API.post('/delete', { groupId });
            return response.data;
        } catch (error) {
            console.error('Error deleting group:', error);
            throw error;
        }
    }
}

const groupsService = new GroupsService();

export default groupsService;
