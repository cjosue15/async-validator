import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsernameService {
  private existingUsernames = ['admin', 'user', 'test'];

  checkIfUsernameExists(username: string) {
    console.log('username', username);
    const userFounded = this.existingUsernames.find(
      (user) => user === username
    );

    return of(userFounded).pipe(delay(1000));
  }
}
