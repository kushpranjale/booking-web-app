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
import { RoomChartComponent } from './room-chart/room-chart.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        WelcomePageComponent,
        AddRoomComponent,
        BookingDetailsComponent,
        CustomerLoginComponent,
        CustomerSignupComponent,
        RoomChartComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SlickCarouselModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MaterialModule,
        NgbModule,
        TooltipModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
