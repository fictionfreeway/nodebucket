/*
Title: app.module.ts
Author: William Watlington
Date: 14 January 2023
Description: main app module for nodebucket app
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './pages/contact/contact.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthLayoutComponent,
    BaseLayoutComponent,
    LoginComponent,
    ContactComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MessageModule,
    MessagesModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
