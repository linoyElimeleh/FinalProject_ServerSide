const groupsDbHandler = require('../models/actions/groups');
const tasksDbHandler = require('../models/actions/tasks');
const membersDbHandler = require('../models/actions/members');

class GroupService {
    constructor() { }

    static getGroupById = async (groupId) => {
        const group = await groupsDbHandler.getGroupById(groupId);
        return group.rows[0];
    }

    static getGroupMembers = async (groupId) => {
        const members = await membersDbHandler.getAllGroupMembers(groupId);
        return members.rows;
    }

    static getGroupTasks = async (groupId) => {
        const tasks = await tasksDbHandler.getAllGroupTasks(groupId);
        return tasks.rows;
    }

    static createGroup = async (group) => {
        const newGroup = await groupsDbHandler.createGroup(group);
        return newGroup.rows[0];
    }

    static updateGroup = async (group) => {
        await groupsDbHandler.updateGroup(group);
    }
}

module.exports = GroupService;