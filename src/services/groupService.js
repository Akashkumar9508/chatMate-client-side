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
    async createGroup(name, members,description) {
        try {
            const response = await this.API.post('/', { name, members,description });
            return response.data;
        } catch (error) {
            console.error('Error creating group:', error);
            throw error;
        }
    }

    // Get group details
    async getGroupDetails(groupId) {
        try {
            const response = await this.API.get(`/details/${groupId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching group details:', error);
            throw error;
        }
    }

    // Add a member to a group
    async addMemberToGroup(groupId, memberId) {
        try {
            const response = await this.API.post('/addSingleMember', { groupId, memberId });
            return response.data;
        } catch (error) {
            console.error('Error adding member to group:', error);
            throw error;
        }
    }

    // Remove a member from a group
    async removeMemberFromGroup(groupId, memberId) {
        try {
            const response = await this.API.post('/removeSingleMember', { groupId, memberId });
            return response.data;
        } catch (error) {
            console.error('Error removing member from group:', error);
            throw error;
        }
    }

    // Update group name
    async updateGroupName(groupId, newName) {
        try {
            const response = await this.API.post('/updateGroup', { groupId, newName });
            return response.data;
        } catch (error) {
            console.error('Error updating group name:', error);
            throw error;
        }
    }

    // Delete a group
    async deleteGroup(groupId) {
        try {
            const response = await this.API.post('/delteGroup', { groupId });
            return response.data;
        } catch (error) {
            console.error('Error deleting group:', error);
            throw error;
        }
    }

    async getAllGroups() {
        try {
            const response = await this.API.get('/getAllGroups');
            return response.data;
        } catch (error) {
            console.error('Error fetching all groups:', error);
            throw error;
        }
    }

    async getUserGroups() {
        try {
            const response = await this.API.get('/getUserGroups');
            return response.data;
        } catch (error) {
            console.error('Error fetching user groups:', error);
            throw error;
        }
    }

    async getGroupsCreatedByUser(){
        try {
            const response = await this.API.get('/getGroupCreatedByUser');
            return response.data;
        } catch (error) {
            console.error('Error fetching groups created by user:', error);
            throw error;
        }
    }
}

const groupsService = new GroupsService();

export default groupsService;
