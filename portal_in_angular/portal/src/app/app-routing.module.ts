// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsComponent } from './students/students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { UpdateStudentComponent } from './update-student/update-student.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
 { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'addstudent', component: AddStudentComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'students', component: StudentsComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'student/:rollno', component: StudentDetailComponent, canActivate: [AuthGuard] },  // Protected route
  { path: 'updatestudent/:rollno', component: UpdateStudentComponent, canActivate: [AuthGuard] },  // Protected route

  { path: '**', redirectTo: '' }  // Wildcard route for handling undefined paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
