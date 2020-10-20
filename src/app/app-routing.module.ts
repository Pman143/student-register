import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StudentDetailsComponent} from './student/student-details/student-details.component';
import {StudentComponent} from './student/student.component';

const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'student-register'},
  {path: 'student-register', component: StudentComponent},
  {path: 'student-details', component: StudentDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
