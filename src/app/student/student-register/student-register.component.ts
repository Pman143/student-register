import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {

  registerForm: FormGroup;
  studentNameRequired = 'Student name is required.';
  studentSurnameRequired = 'Student surname is required.';
  studentResidentialAddressRequired = 'Student Residential Address is required.';
  studentContactDetailsRequired = 'Student Contact Details is required.';
  studentRegisteredCourseRequired = 'Student Registered Course is required.';

  studentId: string;
  addedStudent = false;
  loadingStatus: string;

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      studentName: new FormControl(null, Validators.required),
      studentSurname: new FormControl(null, Validators.required),
      studentResidentialAddress: new FormControl(null, Validators.required),
      studentContactDetails: new FormControl(null, Validators.required),
      studentRegisteredCourse: new FormControl(null, Validators.required),
    });
  }

  onRegisterStudent(registerForm: FormGroup) {
    if (registerForm.invalid) {
      return;
    }
    console.log(registerForm.value);
    this.loadingStatus = 'LOADING';
    this.studentService.registerStudent(registerForm.value).subscribe( res => {
      this.loadingStatus = 'SUCCESS';
      this.studentService.fetchStudentsFromFirebase().subscribe();
    }, error1 => {
      this.loadingStatus = 'FAILURE';
    });
  }
}
