import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Task } from 'src/app/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = "http://localhost:3000/auth/signin"
  constructor(private http: HttpClient) { }



  login(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/signin', { username, password })
      .pipe(
        catchError(error => {
          if (error.status === 401) {
            console.warn('Please check your credentials');
          }
          return throwError(error);
        })
      );
  }
  sigup(username: string, password: string) {
    return this.http.post('http://localhost:3000/auth/signup', { username, password })
      .pipe(
        catchError(error => {
          if (error.status === 401 && 400) {
            console.warn('Please check your credentials');
          }
          return throwError(error);
        })
      );  
  }
  getAllTasks(): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Task[]>('http://localhost:3000/tasks', { headers });
  }
  deleteTask(taskId: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete('http://localhost:3000/tasks/' + taskId,{ headers });
  }
  addTask(task:Task){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post('http://localhost:3000/asks',task, {headers})
  }t
  searchTasks(searchTerm: string): Observable<Task[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<Task[]>(`http://localhost:3000/tasks?search=${searchTerm}`, {headers});
  }
  
  
}
