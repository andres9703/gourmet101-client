import { Injectable } from '@angular/core';
import { GourmetUserEntity } from '../../entities';
import { Observable} from 'rxjs';
import { GourmetUserRepositoryImplementation } from 'src/app/data/repositories/gourmet-user/gourmet-user.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class GetUserUseCase {
  constructor(private gourmetUserRepository: GourmetUserRepositoryImplementation) {}

  execute(): Observable<GourmetUserEntity> {
    return this.gourmetUserRepository.getUser();
  }
}