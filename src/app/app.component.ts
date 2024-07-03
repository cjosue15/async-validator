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
import { createValitor } from './username.validator';
import { UsernameService } from './data-access/username.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

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
  private _usernameService = inject(UsernameService);

  form = this._formBuilder.group<LoginForm>({
    username: this._formBuilder.nonNullable.control('', {
      validators: Validators.required,
      asyncValidators: createValitor(this._usernameService),
    }),
    password: this._formBuilder.nonNullable.control('', Validators.required),
  });

  constructor() {
    this.form
      .get('password')!
      .valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((value) => console.log(value));
  }

  hasRequiredError(field: string) {
    const control = this.form.get(field);

    return control?.hasError('required') && control.touched;
  }

  hasExistinUsername() {
    const control = this.form.get('username');

    return control?.hasError('usernameExists') && control.dirty;
  }

  get isPending() {
    return this.form.get('username')?.pending;
  }
}
