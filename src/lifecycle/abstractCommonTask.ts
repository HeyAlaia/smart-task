import { ICommonTask } from "./ICommonTask";
import TASK_STATUS from "../emuns/TASK_STATUS";

export abstract class abstractCommonTask implements ICommonTask {

    task: Function
    taskStatus: TASK_STATUS = TASK_STATUS.INIT;

    //生命周期函数
    abstract onReady(): Promise<TASK_STATUS>
    abstract onRun(): Promise<void | abstractCommonTask>
    abstract onDestroy(): Promise<void>


    /** 执行任务 **/
    public async execute(): Promise<abstractCommonTask | void> {
        // step 1 准备任务
        if (!(TASK_STATUS.READY == await this.onReady())) {
            // 任务准备校验不通过，直接没必要执行了
            return this.onDestroy();
        }
        // step 2 执行任务
        const runResult = await this.onRun();
        if (runResult) {
            console.log("若分裂出新的任务，返回并不再继续执行了");
            // 若分裂出新的任务，返回并不再继续执行了
            return runResult;
        }
        // step 3 销毁任务
        this.onDestroy();
    }
}