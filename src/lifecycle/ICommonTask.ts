import TASK_STATUS from "../emuns/TASK_STATUS";
import { abstractCommonTask } from "./abstractCommonTask";

export interface ICommonTask {
    onReady(): Promise<TASK_STATUS>;
    onRun(): Promise<abstractCommonTask | void>;
    onDestroy(): Promise<void>;
}

