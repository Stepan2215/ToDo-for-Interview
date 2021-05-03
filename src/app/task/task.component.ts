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

}
