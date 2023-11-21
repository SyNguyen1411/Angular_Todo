import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos$ : Observable<Todo[]> | undefined;

  constructor(private todoService : TodoService){}
  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;
  }

  onChangeCompleted(todo : Todo){
    this.todoService.changeCompletedTodo(todo.id, todo.isComplete);
  }

  onSubmitUpdateEvent(todo: Todo){
    this.todoService.submitUpdateEvent(todo.id, todo.content);
  }

  onDeleteTodo(todo: Todo){
    this.todoService.delteTodoEvent(todo.id);
  }

}
