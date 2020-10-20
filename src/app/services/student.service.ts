import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Student} from '../interfaces/Student';
import {map, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

const FIREBASE_URL = 'https://student-registration2.firebaseio.com/student.json';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentSubject = new BehaviorSubject<Student[]>([]);
  student$ = this.studentSubject.asObservable();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  registerStudent(student: Student) {
    return this.http.post(FIREBASE_URL, student).pipe();
  }

  fetchStudentsFromFirebase() {
    return this.http.get<{ [key: string]: Student }>(FIREBASE_URL).pipe(map(resData => {
      const stu: Student[] = [];
      for (const key in resData) {
        if (resData.hasOwnProperty(key)) {
          stu.push({
            studentKey: key,
            studentId: resData[key].studentId,
            studentName: resData[key].studentName,
            studentSurname: resData[key].studentSurname,
            studentContactDetails: resData[key].studentContactDetails,
            studentRegisteredCourse: resData[key].studentRegisteredCourse,
            studentResidentialAddress: resData[key].studentResidentialAddress
          });
        }
      }
      return stu;
    }), tap(res => {
      this.studentSubject.next(res);
    }));
  }

  fetchStudentById(student: Student) {
    return this.http.get<{ [key: string]: Student }>(`https://student-registration2.firebaseio.com/student/${student.studentKey}.json`)
      .pipe(
        map(resData => {
          return resData;
        }, tap())
      );
  }

  removeStudent(student: Student) {
    return this.http.delete(`https://student-registration2.firebaseio.com/student/${student.studentKey}.json`).pipe();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
