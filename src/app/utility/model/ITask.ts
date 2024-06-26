export interface ITask {
    email: string;
    category? : string[];
    date: Date;
    dueDate?: Date;
    imagePath?: string;
    isOver?: boolean;
    priority: number
    subTasks?: string[],
    taskname: string;
    _id?: string;
    data?: any[];
}