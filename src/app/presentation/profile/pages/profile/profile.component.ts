import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';  // <-- use DropdownModule instead of Select

interface UserTypeOptions {
  label: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, FileUploadModule, DropdownModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  profileForm: FormGroup;
  profileImagePreview: string | ArrayBuffer | null = null;

  userTypeOptions: UserTypeOptions[] = [
    { label: 'Normal', value: 'normal' },
    { label: 'Business', value: 'business' }
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      profilePicture: [null],
      userType: [null, Validators.required]   // <-- new select field with required validation
    });
  }

  onBasicUploadAuto(event: any) {
    const file = event?.files[0];
    if (file) {
      this.profileForm.patchValue({ profilePicture: file });

      const reader = new FileReader();
      reader.onload = (e) => {
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
