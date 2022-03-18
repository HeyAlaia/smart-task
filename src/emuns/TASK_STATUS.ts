enum TASK_STATUS {
    INIT = "INIT", // 初始状态
    READY = "READY", // 可执行
    RUNNING = "RUNNING", // 执行中
    SUCCESS = "SUCCESS", // 执行成功
    FAILED = "FAILED", // 执行失败
    DESTROY = "DESTROY", // 已销毁
}

export default TASK_STATUS;