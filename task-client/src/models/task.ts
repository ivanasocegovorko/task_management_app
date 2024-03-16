
export class Task {
    taskId?: string;
    title?: string;
    completed?: boolean;

    constructor(id?: string, title?: string, completed?: boolean) {
        this.taskId = id;
        this.title = title;
        this.completed = completed;
    }
}