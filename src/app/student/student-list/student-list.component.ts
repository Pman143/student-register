import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../interfaces/Student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  @Input() students: Student[];

  constructor() {
  }

  ngOnInit(): void {
   // console.log(this.students[0].studentResidentialAddress);
  }

}
