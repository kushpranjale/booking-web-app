import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: WelcomePageComponent,
    },
    {
        path: 'add-room',
        component: AddRoomComponent,
    },
    {
        path: 'booking-detail',
        component: BookingDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
