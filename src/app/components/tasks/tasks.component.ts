import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/models/task.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  form: FormGroup;
  newForm:FormGroup;
  showForm = false;
  searchTerm:string;
  constructor(private apiService:ApiService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.getAllTasks();
  }

  getAllTasks() {
   this.apiService.getAllTasks().subscribe((tasks:Task[]) => {
    this.tasks = tasks;
    console.log(tasks)
  });
  }
  deleteTask(id: string) {
    this.apiService.deleteTask(id).subscribe(() => {
    this.getAllTasks(); // Refresh the task list after deletion
    });
    }

    toggleForm() {
      this.showForm = !this.showForm;
    }
    submitNewTaskForm() {
      if (this.form.valid) {
        let newTask: Task = this.form.value;
        console.log(newTask)
        this.apiService.addTask(newTask)
          .subscribe((response: Task) => {
            this.getAllTasks();
            this.showForm = false;
            this.form.reset();
          }, error => {
            console.error(error);
          });
      }
    }
    searchTasks() {
      this.apiService.searchTasks(this.searchTerm).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
    
    
    
}
