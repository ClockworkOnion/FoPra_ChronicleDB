import { JavaCreateStreamComponent } from './java/java-page-create-stream/java-create-stream/java-create-stream.component';
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
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { RustAuthGuard } from './services/guards/rust-auth-guard.service';
import { JavaAuthGuard } from './services/guards/java-auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard]} },
  { path: 'login', component: PageLoginComponent },
  { path: 'no-access', component: NoAccessComponent },
  // {path:"insertData",component:InsertDataTabMenuComponent},
  { path: 'user_management', component: UserManagementComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, AdminAuthGuard]} },
  // { path: 'show_right_flank', component: ShowRightFlankComponent },
  // { path: 'time_travel', component: TimeTravelComponent },
  { path: 'rust/systemInfo', component: SystemInfoComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, RustAuthGuard]} },
  { path: 'rust/create_stream', component: CreateStreamComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, RustAuthGuard, CreateAuthGuard]} },
  { path: 'rust/jobs', component: PageJobsComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, RustAuthGuard]} },
  { path: 'rust/messages', component: PageMessagesComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, RustAuthGuard]} },
  { path: 'java/create_stream', component: JavaCreateStreamComponent, canActivate: [MasterGuard], data: {guards: [AuthGuard, JavaAuthGuard, CreateAuthGuard]} },
  { path: '**', redirectTo: '' }, // als letztes wird alles andere zu home weitergeleitet...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
