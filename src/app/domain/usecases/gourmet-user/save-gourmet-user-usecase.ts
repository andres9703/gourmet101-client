import { Injectable } from '@angular/core';
import { GourmetUserEntity } from '../../entities';
import { Observable} from 'rxjs';
import { GourmetUserRepositoryImplementation } from 'src/app/data/repositories/gourmet-user/gourmet-user.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class SaveGourmetUserUseCase {
  constructor(private gourmetUserRepository: GourmetUserRepositoryImplementation) {}

  execute(sub: string): Observable<GourmetUserEntity> {
    console.log(sub, "SEEING THE SUB FROM THE CALLBACK ROUTE!!!")
    return this.gourmetUserRepository.saveUser(sub);
  }
}