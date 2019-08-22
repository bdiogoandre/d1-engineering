import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { HttpClientModule } from '@angular/common/http'; 
import { ApiService } from './services/api.service';
import { InformationPopup } from './popups/information.popup';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    CreateUserComponent,
    ListUsersComponent,
    InformationPopup
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    HttpClientModule
  ],
  providers: [FormBuilder, ApiService],
  bootstrap: [AppComponent],
  entryComponents: [InformationPopup]
})
export class AppModule { }
