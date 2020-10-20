import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Student} from '../../interfaces/Student';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit, OnChanges {

  @Input() students: Student[];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
