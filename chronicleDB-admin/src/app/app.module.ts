import { StreamPropertiesComponent } from './page-home/card-stream-properties/stream-properties.component';
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
import { HttpClientModule } from '@angular/common/http';
import { StreamEventPropertyComponent } from './page-home/card-stream-event-properties/stream-event-property.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { EventgeneratorComponent } from './page-home/card-stream-event-properties/eventgenerator/eventgenerator.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import {MatBadgeModule} from '@angular/material/badge';
import { InsertDataTabMenuComponent } from './page-insert-data/insert-data-tab-menu/insert-data-tab-menu.component';
import { InsertDataManuallyComponent } from './page-insert-data/insert-data-manually/insert-data-manually.component';
import { InsertDataEventElementComponent } from './page-insert-data/insert-data-event-element/insert-data-event-element.component';
import { CreateStreamService } from './services/create-stream.service';
import { InsertDataService } from './services/rest services/insert-data.service';
import { SystemInfoComponent } from './page-system-info/system-info/system-info.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ShowRightFlankComponent } from './show-right-flank/show-right-flank.component';




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
    ShowRightFlankComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    HttpClientModule,
    MatDividerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatBadgeModule,
    MatSlideToggleModule
    
  ],
  providers: [ChronicleService, CreateStreamService, InsertDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
