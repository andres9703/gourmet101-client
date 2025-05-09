import { Injectable } from '@angular/core';
import { GourmetUserEntity } from '../../entities';
import { Observable} from 'rxjs';
import { GourmetUserRepositoryImplementation } from 'src/app/data/repositories/gourmet-user/gourmet-user.repository.impl';

@Injectable({
  providedIn: 'root'
})
export class GetGourmetUserUseCase {
  constructor(private gourmetUserRepository: GourmetUserRepositoryImplementation) {}

  execute(sub: string): Observable<{user:GourmetUserEntity, subSubmitted:string}> {
    return this.gourmetUserRepository.getUserById(sub);
  }
}