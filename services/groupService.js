const groupsDbHandler = require('../models/actions/groups');
const tasksDbHandler = require('../models/actions/tasks');
const membersDbHandler = require('../models/actions/members');
const { generateUuid } = require('../utils/uidUtil');

class GroupService {
    constructor() { }

    static getGroupById = async (groupId) => {
        const group = await groupsDbHandler.getGroupById(groupId);
        return group.rows[0];
    }

    static getGroupByInviteCode = async (inviteCode) => {
        const group = await groupsDbHandler.getGroupByInviteCode(inviteCode);
        return group.rows[0];
    }

    static getGroupMembers = async (groupId) => {
        const members = await membersDbHandler.getAllGroupMembers(groupId);
        return members.rows;
    }

    static addGroupMembers = async (groupId, idsToAdd) => {
        await membersDbHandler.addGroupMembers(groupId, idsToAdd);
    }

    static getGroupTasks = async (groupId) => {
        const tasks = await tasksDbHandler.getAllGroupTasks(groupId);
        return tasks.rows;
    }

    static createGroup = async (group, userId) => {
        group.invite_code = generateUuid();
        const newGroup = await groupsDbHandler.createGroup(group, userId);
        return newGroup;
    }

    static updateGroup = async (group, groupId) => {
        await groupsDbHandler.updateGroup(group, groupId);
    }

    static isUserMemberOfGroup = async (groupId, userId) => {
        return !!(await groupsDbHandler.isUserMemberOfGroup(groupId, userId))?.rows?.length;
    }

    static isUserAdmin = async (groupId, userId) => {
        const isAdmin = await groupsDbHandler.isUserAdmin(groupId, userId);
        return isAdmin?.rows[0]?.is_admin ?? false;
    }
}

module.exports = GroupService;