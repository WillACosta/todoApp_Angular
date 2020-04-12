import { Component } from '@angular/core';

import { Todo } from 'src/models/Todo.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public mode: string = 'list';

  /**
   * Título da tarefa
   */
  public title: String = 'Tasks';

  /**
   * Lista de objetos a fazer
   */
  public todos : Todo[] = [];

  public form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])]
      /*,  //Compor um Array de validações
      id: ['', Validators.compose([
        Validators.required
      ])] */
    });
  }

  ngOnInit(){
    this.load();
  }

  add(){
    const title = this.form.controls['title'].value; // this.form.value; Retorna um json
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear(){
    this.form.reset;
  }

  remove(todo: Todo){

    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1); //Remove do array
    }
    this.save();
  }

  markAsDone(todo: Todo){
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo){
    todo.done = false;     //Recebe referencia direta do objeto
    this.save();
  }

  save(){
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load(){
    const data = localStorage.getItem('todos');
    if(data){
      this.todos = JSON.parse(data);
    }else{
      this.todos = [];
    }
  }

  changeMode(mode: string){
    this.mode = mode;
  }

}
