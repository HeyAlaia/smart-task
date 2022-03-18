import QUEUE_STATUS from "../emuns/QUEUE_STATUS";
import { CommonTaskImpl } from "./CommonTaskImpl";

export class TaskManager {

    constructor(task: CommonTaskImpl[]) {
        this.taskList = task
    }

    status: QUEUE_STATUS = QUEUE_STATUS.IDLE;
    isShutDown: boolean = false;
    isWorking: boolean = false;
    hasNextTask: boolean = true;
    currentTask: CommonTaskImpl;
    taskList: CommonTaskImpl[] = [];

    // 开始使用任务管理器
    public start() {
        if (this.taskList.length == 0) return
        this.work()
    }

    // 暂停任务管理器
    public pause() {
        console.log("暂停任务管理器");
        this.status = QUEUE_STATUS.PAUSE;
        this.hasNextTask = false
    }
    // 恢复任务管理器
    public resume() {
        console.log("恢复任务管理器");
        // 如果被关停了，则不能恢复啦
        if (this.isShutDown) {
            return;
        }
        this.hasNextTask = true
        this.work();
    }
    // 关停任务管理器
    public shudown() {
        console.log("关停任务管理器");
        this.taskList = []
        this.isShutDown = true
        this.hasNextTask = false
        this.status = QUEUE_STATUS.SHUTDOWN;
    }
    // 任务管理器工作
    private async work() {
        this.status = QUEUE_STATUS.WORKING;
        if (!this.isWorking && this.hasNextTask) {

            // 如果满足条件，会继续执行下一个任务
            this.currentTask = this.getNextTask();
            const resultTask = await this.currentTask.execute().catch((error) => {
                // 异常处理
            });
            // 判断是否有分裂的新任务
            if (resultTask) {
                // 如果有，就塞回到任务队列的头部，需要优先处理
                this.taskList.unshift(resultTask);
            }
            // 继续执行下一个任务
            this.checkContinueWork();
        }
    }

    private getNextTask() {
        return this.taskList[0]
    }

    private checkContinueWork() {
        this.taskList.shift()
        if (this.taskList.length == 0) {
            this.status = QUEUE_STATUS.IDLE;
            console.log("任务已全部完成")
        } else {
            this.work()
        }
    }

}