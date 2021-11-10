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
import {MatTabsModule} from '@angular/material/tabs';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { GeneralStreamComponent } from './page-home/general-stream/general-stream.component';
import { CreateStreamComponent } from './page-home/create-stream-card/create-stream/create-stream.component';
import { StreamEventPropertiesComponent } from './page-home/create-stream-card/stream-event-properties/stream-event-properties.component';
import { MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ChronicleService } from './services/chronicle.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ExpansionPanelComponent,
    SnackBarComponent,
    TabMenuComponent,
    CreateStreamComponent,
    GeneralStreamComponent,
    StreamEventPropertiesComponent,
    
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

  ],
  providers: [ChronicleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
