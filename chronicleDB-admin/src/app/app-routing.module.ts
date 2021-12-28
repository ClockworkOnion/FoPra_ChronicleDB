import { SystemInfoComponent } from './page-system-info/system-info/system-info.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
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

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: PageLoginComponent },
  { path: 'no-access', component: NoAccessComponent },
  { path: 'settings', component: TabMenuComponent },
  // {path:"insertData",component:InsertDataTabMenuComponent},
  { path: 'systemInfo', component: SystemInfoComponent },
  { path: 'show_right_flank', component: ShowRightFlankComponent },
  { path: 'time_travel', component: TimeTravelComponent },
  { path: 'create_stream', component: CreateStreamComponent, canActivate: [AuthGuard, CreateAuthGuard] },
  { path: '**', redirectTo: '' }, // als letztes wird alles andere zu home weitergeleitet...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
