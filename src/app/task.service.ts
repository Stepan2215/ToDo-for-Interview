import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Task } from './task';
import { from } from 'rxjs';

const TOKEN: string = "f5ac3929-4ad4-426b-8148-acaf61a6b049";

@Injectable()
export class TaskService {

    private url = "/fps/todo/api/ToDos";
    constructor(private http: HttpClient) { }

    getTasks() {
        const params = new HttpParams().set('token', TOKEN);
        return this.http.get(this.url, { params });
    }

    getTask(id: number) {
        const params = new HttpParams().set('token', TOKEN);
        return this.http.get(this.url + '/' + id, { params }); 
    }

    createTask(task: Task) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.post(this.url, JSON.stringify(task), { headers: myHeaders });
    }
    updateTask(task: Task) {
        const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(this.url, JSON.stringify(task), { headers: myHeaders });
    }
    deleteTask(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}