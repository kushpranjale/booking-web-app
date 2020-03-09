import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormGroupDirective,
} from '@angular/forms';

@Component({
    selector: 'app-booking-details',
    templateUrl: './booking-details.component.html',
    styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
    selectedFile: File;
    previewUrl: any;
    bookingGroup: FormGroup;
    t1: any;
    t2: any;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.bookingGroup = this.formBuilder.group({
            full_name: ['', [Validators.required]],
            mobile_number: ['', [Validators.required]],
            email_id: ['', [Validators.required, Validators.email]],
            age: ['', [Validators.required]],
            image: ['', [Validators.required]],
        });
    }
    onFileSelect(event) {
        this.selectedFile = event.target.files[0] as File;
        console.log(this.selectedFile);
        this.bookingGroup.patchValue({ image: this.selectedFile });
        this.preView();
    }
    preView() {
        const render = new FileReader();
        render.readAsDataURL(this.selectedFile);
        render.onload = () => {
            console.log(render);
            this.previewUrl = render.result;
        };
    }
    onSubmit(formDirective: FormGroupDirective) {
        if (this.bookingGroup.invalid) {
            return;
        } else {
            console.log('Booking form Group');
            console.log(this.bookingGroup);
        }
    }
}
