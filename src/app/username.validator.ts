import { AsyncValidatorFn } from '@angular/forms';
import { UsernameService } from './data-access/username.service';
import { map, switchMap, timer } from 'rxjs';

export const createValitor = (service: UsernameService): AsyncValidatorFn => {
  return (control) => {
    return timer(1000).pipe(
      switchMap(() =>
        service.checkIfUsernameExists(control.value).pipe(
          map((user) => {
            return user ? { usernameExists: true } : null;
          })
        )
      )
    );
  };
};
