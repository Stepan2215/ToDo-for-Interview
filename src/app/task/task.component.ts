import _ from 'lodash';
import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'tr[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  taskDetails: Task;

  constructor(private serv: TaskService) { }

  ngOnInit(): void {
    this.loadDetails();
  }

  private loadDetails() {
    this.serv.getTask(this.task.id).subscribe((data: Task) => {
      this.taskDetails = data;
    });
  }

  isPastDueDate() {
    return this.taskDetails && (new Date(this.taskDetails.dueDate) < new Date());
  }

  completeTask() {
    this.taskDetails.isDone = true;
    this.serv.updateTask(this.taskDetails).subscribe(data => {
      
    });
  }

  deleteTask() {
    //     this.serv.deleteTask(task.id).subscribe(data => {
    //         this.statusMessage = 'Данные успешно удалены',
    //             this.loadTasks();
    //     });
  }
}
