import TASK_STATUS from "../emuns/TASK_STATUS";
import { abstractCommonTask } from "./abstractCommonTask";

export class CommonTaskImpl extends abstractCommonTask {

    constructor(task: Function) {
        super();
        this.task = task ? task : () => { console.log("无法识别为任务！！！请传入任务"); }
    }

    onReady(): Promise<TASK_STATUS> {
        return new Promise<TASK_STATUS>((resolve, reject) => {
            if (this.task) {
                resolve(TASK_STATUS.READY)
            } else {
                resolve(TASK_STATUS.FAILED)
            }
        })
    };


    onRun(): Promise<void | CommonTaskImpl> {
        return new Promise<void | CommonTaskImpl>((resolve, reject) => {
            this.task().then((res: CommonTaskImpl) => {
                if (res) {
                    // 若分裂出新的任务，返回并不再继续执行了
                    return this;
                }
            })
            return resolve(null)
        })
    }

    onDestroy(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.taskStatus = TASK_STATUS.DESTROY
            this.task = null
            return resolve(null)
        })
    }
}