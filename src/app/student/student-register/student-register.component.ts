import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {StudentService} from '../../services/student.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Student} from '../../interfaces/Student';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit, OnChanges {

  registerForm: FormGroup;
  studentNameRequired = 'Student name is required.';
  studentSurnameRequired = 'Student surname is required.';
  studentResidentialAddressRequired = 'Student Residential Address is required.';
  studentContactDetailsRequired = 'Student Contact Details is required.';
  studentRegisteredCourseRequired = 'Student Registered Course is required.';

  studentId: string;
  addedStudent = false;
  loadingStatus: string;

  @Input() students: Student[];
  studentIsExisting = false;

  constructor(private fb: FormBuilder,
              private studentService: StudentService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
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
    const st: Student = registerForm.value;
    if (this.students.length > 0) {
      const duplicateStudent = this.students
      // tslint:disable-next-line:max-line-length
        .find(student => student.studentSurname.trim() === st.studentSurname.trim()
          && student.studentName.trim() === st.studentName.trim()
          && student.studentResidentialAddress.trim() === st.studentResidentialAddress.trim()
          && student.studentRegisteredCourse.trim() === st.studentRegisteredCourse.trim()
          && student.studentContactDetails.trim() === st.studentContactDetails.trim()
        );
      if (duplicateStudent) {
        this.studentIsExisting = true;
      }
    }
    console.log(registerForm.value);
    this.loadingStatus = 'LOADING';
    if (this.studentIsExisting) {
      this.studentService.openSnackBar('Student is already registered.', '');
      this.loadingStatus = 'SUCCESS';
      return;
    }
    this.studentService.registerStudent(registerForm.value).subscribe(res => {
      this.loadingStatus = 'SUCCESS';
      this.studentService.openSnackBar('Student successfully registered.', '');
      this.studentService.fetchStudentsFromFirebase().subscribe();
    }, error1 => {
      this.loadingStatus = 'FAILURE';
    });
  }
}
