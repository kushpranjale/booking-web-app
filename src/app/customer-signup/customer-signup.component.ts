import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-customer-signup',
    templateUrl: './customer-signup.component.html',
    styleUrls: ['./customer-signup.component.css'],
})
export class CustomerSignupComponent implements OnInit {
    constructor() {}

    ngOnInit() {}

    onSubmit(form: NgForm) {
        console.log(form);
    }
}
