import {Component, OnInit} from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../interfaces/Student';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService) {
    this.studentService.fetchStudentsFromFirebase().subscribe();
    this.studentService.student$.subscribe(res => {
      console.log('My Students ,', res);
      this.students = res;
    });
  }

  ngOnInit(): void {
  }

  onNavigateHome() {

  }

  onShoppingCart() {

  }

  onAddProduct() {

  }
}
