import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {Student} from '../../interfaces/Student';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  registerForm: FormGroup;
  studentNameRequired = 'Student name is required.';
  studentSurnameRequired = 'Student surname is required.';
  studentResidentialAddressRequired = 'Student Residential Address is required.';
  studentContactDetailsRequired = 'Student Contact Details is required.';
  studentRegisteredCourseRequired = 'Student Registered Course is required.';
  loadingStatus: string;
  studentKey: string;
  selectedStudent: Student;
  statuses = {
    loading: 'LOADING',
    fetchingUser: 'FETCHING_USER',
    fetchedUser: 'FETCHED_USER'
  };

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute) {
    this.studentKey = this.route.snapshot.paramMap.get('studentKey').toString();
  }

  ngOnInit(): void {
    this.loadingStatus = 'FETCHING_USER';
    this.studentService.fetchStudentById(this.studentKey).subscribe((res: any) => {
      this.loadingStatus = 'FETCHED_USER_SUCCESS';
      this.selectedStudent = res;
      this.initializeForm(this.selectedStudent);
    });
  }

  initializeForm(stu: Student) {
    console.log(this.selectedStudent);
    this.registerForm = this.fb.group({
      studentName: new FormControl(stu.studentName, Validators.required),
      studentSurname: new FormControl(stu.studentSurname, Validators.required),
      studentResidentialAddress: new FormControl(stu.studentResidentialAddress, Validators.required),
      studentContactDetails: new FormControl(stu.studentContactDetails, Validators.required),
      studentRegisteredCourse: new FormControl(stu.studentRegisteredCourse, Validators.required),
    });
  }

  onUpdateStudent(registerForm: FormGroup) {
    console.log(this.studentKey);
    this.studentService.updateStudentDetails(registerForm.value, this.studentKey).subscribe(res => {
      this.studentService.openSnackBar('Student details was updated successfully', '');
    });
  }

  onRemoveStudent() {
    this.studentService.removeStudent(this.studentKey).subscribe(res => {
      console.log(res, this.studentKey);
      this.studentService.openSnackBar('Student details was deleted successfully', '');
      this.router.navigate(['../']);
    });
  }
}
