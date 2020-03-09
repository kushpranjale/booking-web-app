import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomerLoginComponent } from './customer-login/customer-login.component';

import { MaterialModule } from './material.module';
import { CustomerSignupComponent } from './customer-signup/customer-signup.component';

@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
        AddRoomComponent,
        BookingDetailsComponent,
        CustomerLoginComponent,
        CustomerSignupComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SlickCarouselModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
