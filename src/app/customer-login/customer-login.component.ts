import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-customer-login',
    templateUrl: './customer-login.component.html',
    styleUrls: ['./customer-login.component.css'],
})
export class CustomerLoginComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
    onSubmit(form: NgForm) {
        console.log(form);
    }
}
