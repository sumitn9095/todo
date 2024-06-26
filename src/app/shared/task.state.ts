import { Action, Selector, State, StateContext, getActionTypeFromInstance } from "@ngxs/store";
import { GetTasks, SetTask, EditTask, DeleteTask, EditTaskDetails, ChangeStatus } from "./task.actions";
import { Injectable } from "@angular/core";
import { TasksService } from "../tasks/tasks.service";
import { tap } from "rxjs";
import { filter } from "rxjs";
import { ITask } from "../utility/model/ITask";

export interface ITaskarr {
    taskss: ITask[];
    data: any;
}

@State<ITask>({
    name: 'task',
    // defaults: {
    //     // taskname: 'New Task',
    //     // date: new Date(),
    //     // isOver: false,
    //     // priority: 1,
    //     // dueDate: new Date()
    // }
})
// export class TaskState {
//     @Action(SetTask)
//     SetTask( {setState, getState}: StateContext<ITask>, {payload}: SetTask) {
//         // const taskState = getState();
//         // console.log("Current Task State",taskState);
//         setState({
//             taskname: payload.taskname,
//             date: payload.date,
//             isOver: payload.isOver,
//             priority: payload.priority,
//             dueDate: payload.dueDate
//         })
//     }
// }

@Injectable()
export class TaskApiState {
    constructor(private taskService: TasksService){}
    @Action(GetTasks)
    GetTasks(ctx: StateContext<ITaskarr>, {payload}: GetTasks) {
        return this.taskService.userTasks(payload).pipe(
            tap(response => {
                const state = ctx.getState();
                //console.log("taskState",taskState,"response",response);
                ctx.setState({
                    ...state,
                    taskss: response.data
                })
            })
        )
    }

    @Action(SetTask)
    SetTask( {patchState, getState}: StateContext<ITaskarr>, {payload}: SetTask) {
        return this.taskService.userTaskAdd(payload).pipe(
            tap(response => {
                const state = getState();
                patchState({
                    taskss: [...state.taskss, response.data]
                })
            })
        )
    }

    @Action(EditTaskDetails)
    EditTaskDetails( {getState, setState}: StateContext<ITaskarr>, {payload, file}: EditTaskDetails) {
        return this.taskService.userTaskDetailsSave(payload, file).pipe(tap(response => {
            const state = getState();
            const tasks = [...state.taskss];
            const taskIndex = tasks.findIndex(t => t._id == payload.id);
            tasks[taskIndex] = response.data;
            setState({
                ...state,
                taskss: tasks
            })
        }))
    }

    @Action(EditTask)
    EditTask( {getState, setState} : StateContext<ITaskarr>, {payload}: EditTask) {
        return this.taskService.userTaskEdit(payload).pipe(tap(response => {
            const state = getState();
            const tasks = [...state.taskss];
            const taskIndex = tasks.findIndex(r => r._id == payload.id);
            tasks[taskIndex]['taskname'] = response.taskname;
            setState({
                ...state,
                taskss: tasks
            })
        }))
    }

    @Action(ChangeStatus)
    ChangeStatus({getState, setState} : StateContext<ITaskarr>, {id, isOver}: ChangeStatus) {
        return this.taskService.userTaskStatusChange(id, isOver).pipe(tap((response)=>{
            const state = getState();
            const tasks = [...state.taskss];
            const taskIndex = tasks.findIndex(r => r._id == id);
            tasks[taskIndex]['isOver'] = response.status;
            setState({
               ...state,
                taskss: tasks
            })
        }))
    }

    @Action(DeleteTask)
    DeleteTask( {getState, setState}: StateContext<ITaskarr>, {id}: DeleteTask) {
        return this.taskService.taskDelete(id)
        .pipe(
            tap(() => {
                const state = getState();
                //console.log("state.taskss",state.taskss)
                const filtered = state.taskss.filter((task:ITask) => task._id !== id);
                setState({
                    ...state,
                    taskss: filtered
                })
            })
        )
    }


    @Selector([TaskApiState])
    static selectTasks(state: ITask) {
        return state;
    }
}