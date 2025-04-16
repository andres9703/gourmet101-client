import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-welcome-page',
  imports: [ ReactiveFormsModule, DropdownModule, ButtonModule],
  templateUrl: './welcome-page.component.html',
})
export class WelcomePageComponent implements OnInit {
  formGroup!: FormGroup;

  stateOptions = [
    { label: 'Normal User', value: 'user' },
    { label: 'Business', value: 'business' }
  ];

  constructor() {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      value: new FormControl(null)
    });
  }

  submit() {
    const selectedValue = this.formGroup.value.value;
  
    if (selectedValue) {
    console.log(selectedValue, 'THIS IS THE SELECTED VALUE')
    } else {
      console.warn('Please select a type first!');
    }
  }
}
