import { AfterViewInit, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastModule } from 'primeng/toast';
import { NavbarComponent } from '../../../shared/components/layout/navbar/navbar.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown'; // <-- use DropdownModule instead of Select
import { MessageService } from 'primeng/api';
import { GourmetUserStateService } from 'src/app/core/state/gourmet-user-state.service';
import { GourmetUserEntity } from 'src/app/domain';
import { Message } from 'primeng/message';
import { UpdateGourmetUserUseCase } from 'src/app/domain/usecases/gourmet-user/update-gourmet-user.usecase';

interface UserTypeOptions {
  label: string;
  value: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    FileUploadModule,
    DropdownModule,
    Message,
    Toast,
    ToastModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [Message, MessageService, Toast, ToastModule],
})
export class ProfileComponent implements AfterViewInit {
  profileForm: FormGroup;
  profileImagePreview: string | ArrayBuffer | null = null;
  isProfileComplete = signal(false);
  isLoadingUpdate = signal(false);
  isLoadingProfilePicture = signal(false);
  user = signal<GourmetUserEntity | null>(null);

  userTypeOptions: UserTypeOptions[] = [
    { label: 'Normal', value: 'normal' },
    { label: 'Business', value: 'business' },
  ];

  constructor(
    private fb: FormBuilder,
    private gourmetUserStateService: GourmetUserStateService,
    private updateGourmetUserUseCase: UpdateGourmetUserUseCase,
    private messageService: MessageService
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      isProfileComplete: [false],
      phone: ['', Validators.required],
      profilePicture: [this.profileImagePreview],
      userType: [null, Validators.required], // <-- new select field with required validation
    });
  }

  ngAfterViewInit() {
    const user: GourmetUserEntity = this.gourmetUserStateService.getGourmetUserFromSessionStorage();
    if (user) {
      this.user.set(user);
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        userType: user.userType,
        isProfileComplete: user.isProfileComplete,
      });

      if (user.isProfileComplete) {
        this.isProfileComplete.set(user.isProfileComplete);
      }
    }
  }

  show() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Profile updated successfully',
      life: 5000,
    });
  }

  onBasicUploadAuto(event: any) {
    try {
      const file = event?.files[0];
      if (file) {
        this.profileForm.patchValue({ profilePicture: file });

        const reader = new FileReader();

        reader.onload = e => {
          this.profileImagePreview = e.target?.result!;
        };
        reader.onerror = e => {
          console.error('Error reading image', e);
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.error('Error uploading image', err);
      this.isLoadingProfilePicture.set(false);
    }
  }

  onSubmit() {
    this.isLoadingUpdate.set(true);
    if (this.profileForm.valid) {
      const formData = new FormData();

      this.profileForm.patchValue({ isProfileComplete: true });
      Object.entries(this.profileForm.value).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          // Make sure it's a string (or convert it)
          formData.append(key, String(value));
        }
      });

      console.log(Object.fromEntries(formData.entries()), '👌👌');

      this.updateGourmetUserUseCase.execute(formData, this.user()?.id!).subscribe({
        next: res => {
          console.log('Profile saved', res);
          sessionStorage.setItem('gourmetUser', JSON.stringify(res));
          this.profileForm.patchValue({ profilePicture: res.profilePicture });
          this.isLoadingUpdate.set(false);
          this.show();
        },
        error: err => {
          console.error('Error uploading', err);
          this.isLoadingUpdate.set(false);
        },
      });
    } else {
      this.profileForm.markAllAsTouched();
    }
  }
}
