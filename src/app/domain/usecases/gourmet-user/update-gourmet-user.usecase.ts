import { Injectable } from '@angular/core';
import { GourmetUserEntity } from '../../entities';
import { Observable } from 'rxjs';
import { GourmetUserRepositoryImplementation } from 'src/app/data/repositories/gourmet-user/gourmet-user.repository.impl';

@Injectable({
  providedIn: 'root',
})
export class UpdateGourmetUserUseCase {
  constructor(private gourmetUserRepository: GourmetUserRepositoryImplementation) {}

  execute(user: FormData, id: string): Observable<GourmetUserEntity> {
    console.log(user, 'Updating user...');
    return this.gourmetUserRepository.updateUser(user, id);
  }
}
