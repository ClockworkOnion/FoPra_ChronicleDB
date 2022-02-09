import { StreamPropertiesComponent } from './page-create-stream/card-stream-properties/stream-properties.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './page-home/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { GeneralStreamComponent } from './page-home/card-general-stream/general-stream.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ChronicleService } from './services/chronicle.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import { InsertDataTabMenuComponent } from './page-insert-data/insert-data-tab-menu/insert-data-tab-menu.component';
import { InsertDataManuallyComponent } from './page-insert-data/insert-data-manually/insert-data-manually.component';
import { InsertDataEventElementComponent } from './page-insert-data/insert-data-event-element/insert-data-event-element.component';
import { InsertDataService } from './services/rest services/insert-data.service';
import { SystemInfoComponent } from './page-system-info/system-info/system-info.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StreamListComponent } from './page-home/stream-list/stream-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UploadDataComponent } from './page-insert-data/upload-data/upload-data.component';
import { CreateStreamService } from './services/rest services/create-stream.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ShowRightFlankComponent } from './components/show-right-flank/show-right-flank.component';
import { CreateStreamComponent } from './page-create-stream/create-stream/create-stream.component';
import { StreamEventPropertyComponent } from './page-create-stream/card-stream-event-properties/stream-event-property.component';
import { EventgeneratorComponent } from './page-create-stream/card-stream-event-properties/eventgenerator/eventgenerator.component';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TimeTravelComponent } from './time-travel/time-travel.component';
import { MatTableModule } from '@angular/material/table'
import { IDValidators } from './page-insert-data/insert-data-manually/id.validators';
import { PageLoginComponent } from './page-login/page-login.component';
import { ErrorInterceptor } from './backend/error.interceptor';
import { fakeBackendProvider } from './backend/fake-backend';
import { JwtInterceptor } from './backend';
import { NoAccessComponent } from './no-access/no-access.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { StreamInfoComponent } from './stream-info/stream-info.component';
import { DoubleCheckDialog, UserManagementComponent } from './page-user-management/user-management/user-management.component';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { AddUserComponent } from './page-user-management/add-user/add-user/add-user.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSortModule } from '@angular/material/sort';
import { EditUserComponent } from './page-user-management/edit-user/edit-user/edit-user.component';
import { PageJobsComponent } from './page-jobs/page-jobs.component';
import { AddJobComponent } from './page-jobs/add-job/add-job.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PageMessagesComponent } from './page-messages/page-messages.component';
import { JobResultComponent } from './page-messages/job-result/job-result.component';
import { MinMaxTreeHeightComponent } from './page-home/stream-list/min-max-tree-height/min-max-tree-height.component';
import { JavaCreateStreamComponent } from './java/java-page-create-stream/java-create-stream/java-create-stream.component';
import { JavaStreamListComponent } from './java/java-stream-list/java-stream-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ExpansionPanelComponent,
    SnackBarComponent,
    TabMenuComponent,
    StreamPropertiesComponent,
    GeneralStreamComponent,
    StreamEventPropertyComponent,
    EventgeneratorComponent,
    InsertDataTabMenuComponent,
    InsertDataManuallyComponent,
    InsertDataEventElementComponent,
    SystemInfoComponent,
    StreamListComponent,
    UploadDataComponent,
    ShowRightFlankComponent,
    CreateStreamComponent,
    TimeTravelComponent,
    PageLoginComponent,
    NoAccessComponent,
    StreamInfoComponent,
    UserManagementComponent,
    AddUserComponent,
    DoubleCheckDialog,
    EditUserComponent,
    PageJobsComponent,
    AddJobComponent,
    PageMessagesComponent,
    JobResultComponent,
    MinMaxTreeHeightComponent,
    JavaCreateStreamComponent,
    JavaStreamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule,
    FormsModule,
    HttpClientModule,
    MatDividerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatBadgeModule,
    MatSlideToggleModule,
    DragDropModule,
    MatDialogModule,
    OverlayModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ChronicleService, CreateStreamService, InsertDataService, IDValidators,
  
    // Logout bei HTML Fehler...
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

    // provider used to create fake backend
    // fakeBackendProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
