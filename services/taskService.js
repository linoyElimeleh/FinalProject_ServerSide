const TaskNotExist = require('../exceptions/TaskNotExist');
const dbHandler = require('../models/actions/tasks');

class TaskService {
    static createTask = async (task, userId, groupId, ownerId) => {
        return await dbHandler.createTask(task, userId, groupId, ownerId);
    }

    static assignTask = async (taskId, userId) => {
        await dbHandler.updateTaskAsignee(taskId, userId);
    }

    static getTask = async (taskId) => {
        const task = await dbHandler.getTaskById(taskId);
        return task?.rows[0];
    }

    static getTaskScore = async (taskId) => {
        const task = await dbHandler.getTaskScoreById(taskId);
        return task?.rows[0].score;
    }

    static deleteTask = async (taskId) => {
        await dbHandler.deleteTask(taskId);
    }

    static updateTask = async (task) => {
        return await dbHandler.updateTask(task);
    }

    static setTaskStatus = async (taskId, status) => {
        const result = await dbHandler.setTaskStatus(taskId, status);
        return result.rows[0];
    }

    static getGroupUserTaskRelation = async (taskId) => {
        const taskUserRelation = await dbHandler.getTaskGroupUserRelation(taskId);
        return taskUserRelation.rows[0];
    }

    static isTaskOwner = async (taskId, userId) => {
        const taskUserRelation = await this.getGroupUserTaskRelation(taskId);
        return taskUserRelation.owner_id === userId;
    }

    static isTaskReporter = async (taskId, userId) => {
        const taskUserRelation = await this.getGroupUserTaskRelation(taskId);
        if (!taskUserRelation) {
            throw new TaskNotExist();
        }
        return taskUserRelation.owner_id === userId || taskUserRelation.user_id === userId;
    }

    static isTaskAssignee = async (taskId, userId) => {
        const taskUserRelation = await this.getGroupUserTaskRelation(taskId);
        if (!taskUserRelation) {
            throw new TaskNotExist();
        }
        return taskUserRelation.user_id === userId;
    }
}

module.exports = TaskService;