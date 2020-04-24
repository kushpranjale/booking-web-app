import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class AddRoomComponent implements OnInit {
    rooms = [];
    // imageList = [
    //     { img: '../../assets/room_type.jpg' },
    //     { img: '../../assets/A_Building.jpg' },

    //     { img: '../../assets/A_Building.jpg' },
    //     { img: '../../assets/room_type.jpg' },
    //     { img: '../../assets/A_Building.jpg' },

    //     { img: '../../assets/A_Building.jpg' },
    // ];

    imageList = [];
    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
    };

    constructor() {}

    ngOnInit() {}

    getSelectedRooms(item) {
        if (item) {
            this.rooms = item;
        }
        this.rooms['selectedSeats'].map((el) => {
            for (let img of el.path) {
                this.imageList.push(img);
            }
        });
        console.log(this.rooms);
    }
}
