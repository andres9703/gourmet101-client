import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';




@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, FileUploadModule, ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  profileImagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      profilePicture: [null]
    });
  }

  onBasicUploadAuto(event: any) {
    console.log(event, "THIS IS THE BASIC EVENT")
    const file = event?.files[0];
    if (file) {
      this.profileForm.patchValue({ profilePicture: file });

      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e, "THIS IS THE READER EVENT ?? 'e' ")
        this.profileImagePreview = e.target?.result!;
      };
      reader.readAsDataURL(file);
    }
}


  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
