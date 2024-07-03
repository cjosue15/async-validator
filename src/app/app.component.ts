import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';
import { HlmInputModule } from '@spartan-ng/ui-input-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideLoader } from '@ng-icons/lucide';

import { HlmIconModule } from '@spartan-ng/ui-icon-helm';

interface LoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HlmButtonModule,
    HlmInputModule,
    HlmIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [provideIcons({ lucideLoader })],
})
export class AppComponent {
  private _formBuilder = inject(FormBuilder);

  form = this._formBuilder.group<LoginForm>({
    username: this._formBuilder.nonNullable.control('', Validators.required),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  hasRequiredError(field: string) {
    const control = this.form.get(field);

    return control?.hasError('required') && control.touched;
  }
}
