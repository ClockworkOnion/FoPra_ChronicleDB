import { SystemInfoComponent } from './page-system-info/system-info/system-info.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { DashboardComponent } from './page-home/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertDataTabMenuComponent } from './page-insert-data/insert-data-tab-menu/insert-data-tab-menu.component';
import { ShowRightFlankComponent } from './components/show-right-flank/show-right-flank.component';

const routes: Routes = [
  {path:"home",component:DashboardComponent},
  {path:"settings",component:TabMenuComponent},
  {path:"insertData",component:InsertDataTabMenuComponent},
  {path:"systemInfo",component:SystemInfoComponent},
  {path:"show_right_flank", component:ShowRightFlankComponent},
  {path: '**', redirectTo: 'home'} // als letztes wird alles andere zu home weitergeleitet...
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
