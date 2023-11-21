import { Component } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss']
})
export class TodoInputComponent {
  public todoContent = '';

  constructor(private todoService: TodoService) { }

  onSubmit() {
    if(this.todoContent.trim() == "")
      return;
    this.todoService.addTodo(this.todoContent);
    this.todoContent ="";   
  }
}
