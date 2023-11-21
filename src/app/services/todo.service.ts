import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Filter } from '../models/fitering.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private static readonly TodoStorageKey = 'todos';

  private todos !: Todo[];
  private filteredTodos !: Todo[];
  private lengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private displayTodosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private currentFilter: Filter = Filter.All;

  todos$: Observable<Todo[]> = this.displayTodosSubject.asObservable();
  length$: Observable<number> = this.lengthSubject.asObservable();

  constructor(private storageService: LocalStorageService) {

  }

  fetchFromLocalStorage() {
    this.todos = this.storageService.getValue<Todo[]>(TodoService.TodoStorageKey) || [];
    this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
    this.updateTodosData();
  }

  updateToLocalStorage() {
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.filterTodos(this.currentFilter, false);
    this.updateTodosData();
  }

  addTodo(todoContent: string) {
    const date = new Date(Date.now()).getTime();
    const newTodo = new Todo(date, todoContent);
    this.todos.unshift(newTodo);
    this.storageService.setObject(TodoService.TodoStorageKey, this.todos);
    this.updateToLocalStorage();
  }

  changeCompletedTodo(id: number, completed: boolean) {
    const index = this.todos.findIndex(t => t.id == id);
    const todo = this.todos[index];
    todo.isComplete = completed;
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }

  filterTodos(filter: Filter, isFiltering: boolean = true) {
    this.currentFilter = filter;

    switch (filter) {
      case Filter.Active:
        this.filteredTodos = this.todos.filter(todo => !todo.isComplete);
        break;
      case Filter.Complete:
        this.filteredTodos = this.todos.filter(todo => todo.isComplete);
        break;
      case Filter.All:
        this.filteredTodos = [...this.todos.map(todo => ({ ...todo }))];
        break;
    }

    if (isFiltering) {
      this.updateTodosData();
    }
  }

  delteTodoEvent(id: number) {
    const index = this.todos.findIndex(todo => todo.id == id);
    this.todos.splice(index, 1);
    this.updateToLocalStorage();
  }

  submitUpdateEvent(id: number, content: string) {
    const index = this.todos.findIndex(t => t.id == id);
    const todo = this.todos[index];
    todo.content = content;
    this.todos.splice(index, 1, todo);
    this.updateToLocalStorage();
  }

  togleAllTodo() {
    console.log("togle");
    this.todos = this.todos.map(t => {
      return { ...t, isComplete: !this.todos.every(t => t.isComplete == true) }
    })
    this.updateToLocalStorage();
  }

  private updateTodosData() {
    this.displayTodosSubject.next(this.filteredTodos);
    this.lengthSubject.next(this.todos.length);
  }
}
