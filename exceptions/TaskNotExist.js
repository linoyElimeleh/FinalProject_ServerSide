class TaskNotExist extends Error {
    constructor(message) {
        message = message ? message : "Task does not exist"
        super(message)

        // assign the error class name in your custom error (as a shortcut)
        this.name = this.constructor.name

        // capturing the stack trace keeps the reference to your error class
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = TaskNotExist