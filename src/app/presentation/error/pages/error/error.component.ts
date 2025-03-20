import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styles: ``
})
export class ErrorComponent {
  constructor(private router: Router) {}

  returnHome() {
    this.router.navigate(['/login']);
  }
}
