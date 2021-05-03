import { TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Task } from './task';
import { TaskService } from './task.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [TaskService]
})
export class AppComponent implements OnInit {
    //типове шаблони
    @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

    editedTask: Task;
    tasks: Array<Task>;
    isNewRecord: boolean;
    statusMessage: string;

    constructor(private serv: TaskService) {
        this.tasks = new Array<Task>();
    }

    ngOnInit() {
        this.loadTasks();
    }

    //зареждане на задача
    private loadTasks() {
        this.serv.getTasks().subscribe((data: Task[]) => {
            this.tasks = data;
        });
    }
    // добавяне на задача
    addTask() {
        this.editedTask = new Task(0, "", "", 0);
        this.tasks.push(this.editedTask);
        this.isNewRecord = true;
    }

    // редактиране на задача
    editTask(task: Task) {
        this.editedTask = new Task(task.id, task.name, task.description, task.dueIn);
    }
    // загружаем один из двух шаблонов
    loadTemplate(task: Task) {
        if (this.editedTask && this.editedTask.id === task.id) {
            return this.editTemplate;
        } else {
            return this.readOnlyTemplate;
        }
    }
    // сохраняем пользователя
    saveTask() {
        if (this.isNewRecord) {
            // добавляем пользователя
            this.serv.createTask(this.editedTask).subscribe(data => {
                this.statusMessage = 'Даните са успешно добавени',
                    this.loadTasks();
            });
            this.isNewRecord = false;
            this.editedTask = null;
        } else {
            // изменяем пользователя
            this.serv.updateTask(this.editedTask).subscribe(data => {
                this.statusMessage = 'Данные успешно обновлены',
                    this.loadTasks();
            });
            this.editedTask = null;
        }
    }
    // отмена редактирования
    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        if (this.isNewRecord) {
            this.tasks.pop();
            this.isNewRecord = false;
        }
        this.editedTask = null;
    }
    // удаление пользователя
    deleteUser(task: Task) {
        this.serv.deleteTask(task.id).subscribe(data => {
            this.statusMessage = 'Данные успешно удалены',
                this.loadTasks();
        });
    }
}
