import { SystemInfoComponent } from './page-system-info/system-info/system-info.component';
import { DashboardComponent } from './page-home/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowRightFlankComponent } from './components/show-right-flank/show-right-flank.component';
import { CreateStreamComponent } from './page-create-stream/create-stream/create-stream.component';
import { TimeTravelComponent } from './time-travel/time-travel.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { AuthGuard } from './services/guards/auth-guard.service';
import { CreateAuthGuard } from './services/guards/create-auth-guard.service';
import { MasterGuard } from './services/guards/master-guard.service';
import { UserManagementComponent } from './page-user-management/user-management/user-management.component';
import { AdminAuthGuard } from './services/guards/admin-auth-guard.service';
import { PageJobsComponent } from './page-jobs/page-jobs.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard]} },
  { path: 'jobs', component: PageJobsComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard]} },
  { path: 'login', component: PageLoginComponent },
  { path: 'no-access', component: NoAccessComponent },
  // {path:"insertData",component:InsertDataTabMenuComponent},
  { path: 'systemInfo', component: SystemInfoComponent },
  { path: 'user_management', component: UserManagementComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, AdminAuthGuard]} },
  { path: 'show_right_flank', component: ShowRightFlankComponent },
  // { path: 'time_travel', component: TimeTravelComponent },
  { path: 'create_stream', component: CreateStreamComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, CreateAuthGuard]} },
  { path: '**', redirectTo: '' }, // als letztes wird alles andere zu home weitergeleitet...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
