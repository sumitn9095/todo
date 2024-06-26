export class SetTask {
    static readonly type = '[task] set task';
    constructor(public payload: any) {}
}

export class EditTask {
    static readonly type = '[task] edit task';
    constructor(public payload: any) {}
}
export class EditTaskDetails {
    static readonly type = '[task] edit task details';
    constructor(public payload: any, public file:any) {}
}

export class ChangeStatus {
    static readonly type = '[task] Change status';
    constructor(public id: string, public isOver: boolean) {}
}

export class DeleteTask {
    static readonly type = '[task] delete task';
    constructor(public id: string) {}
}

export class GetTasks {
    static readonly type = '[task] get tasks';
    constructor(public payload: any) {}
}