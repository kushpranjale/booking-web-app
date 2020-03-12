import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-add-room',
    templateUrl: './add-room.component.html',
    styleUrls: ['./add-room.component.css'],
    encapsulation: ViewEncapsulation.Emulated,
})
export class AddRoomComponent implements OnInit {
    imageList = [
        { img: '../../assets/room_type.jpg' },
        { img: '../../assets/A_Building.jpg' },

        { img: '../../assets/A_Building.jpg' },
        { img: '../../assets/room_type.jpg' },
        { img: '../../assets/A_Building.jpg' },

        { img: '../../assets/A_Building.jpg' },
    ];

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
}
