import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
    selectedFile: File;
    previewUrl: any;

    constructor() {}

    ngOnInit() {}
    onFileSelect(event) {
        this.selectedFile = event.target.files[0] as File;
        console.log(this.selectedFile);
        this.preView();
    }
    preView() {
        let render = new FileReader();
        render.readAsDataURL(this.selectedFile);
        render.onload = () => {
            console.log(render.result);
            this.previewUrl = render.result;
        };
    }
}
