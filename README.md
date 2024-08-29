# smart-task

## introduction

A task queue that is simple and easy to use, use Typescript wirte, full encapsulation of tasks and task managers, so you can start, pause, resume and close them.

## usage

~~~ javascript
import { CommonTaskImpl } from "./lifecycle/CommonTaskImpl";
import { TaskManager } from "./lifecycle/TaskManager";

const taskList: CommonTaskImpl[] = []

const task = new CommonTaskImpl(() => {
    console.log(1 + 1);
});

const task2 = new CommonTaskImpl(() => {
    console.log(1 + 2);
});

const task3 = new CommonTaskImpl(() => {
    console.log(1 + 3);
});


taskList.push(task)
taskList.push(task2)
taskList.push(task3)

const taskMsg = new TaskManager(taskList)

taskMsg.start()
taskMsg.pause()

setTimeout(() => {
    taskMsg.resume()
}, 3000);

~~~