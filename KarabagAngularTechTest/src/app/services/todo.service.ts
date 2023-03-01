import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private URL = 'http://localhost:3000/tasks';

  constructor(private readonly _httpClient: HttpClient) { }

  getTodoList(): Observable<Todo[]> {
    return this._httpClient.get(this.URL) as Observable<Todo[]>
  }

  getTodoDetails(todo: Todo): Observable<Todo> {
    return this._httpClient.get(`${this.URL}/${todo.id}`) as Observable<Todo>
  }

  addTodo(todo: Todo): Observable<any> {
    if (!todo.id) throw new Error ('No id passed');
    return this._httpClient.post(this.URL, todo);
  }

  editTodo(todo: Todo): Observable<any> {
    if (!todo.id) throw new Error ('No id passed');
    return this._httpClient.patch(`${this.URL}/${todo.id}`, todo);
  }

  deleteTodo(todo: Todo): Observable<any> {
    if (!todo.id) throw new Error ('No id passed');
    return this._httpClient.delete(`${this.URL}/${todo.id}`);
  }
}
