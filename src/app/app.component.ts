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
            this.tasks = data.sort((a, b) => a.id - b.id);
        });
    }

    // добавяне на задача
    addTask() {
        this.editedTask = new Task(0, "", "", 0);
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
        // добавляем пользователя
        this.serv.createTask(this.editedTask).subscribe((data: Task) => {
            this.statusMessage = 'Даните са успешно добавени';
            this.loadTasks();
        });
        this.editedTask = null;
    }

    // отмена редактирования
    cancel() {
        // если отмена при добавлении, удаляем последнюю запись
        this.editedTask = null;
    }

    // удаление пользователя
    onDelete(id: number) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
}
