import { Injectable } from '@angular/core';
import { UserEntity } from '../../entities/user/user.entity';
import { UserRepositoryImplementation } from '../../../data/repositories/user/user.repository.impl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUserUseCase {
  constructor(private userRepository: UserRepositoryImplementation) {}

  execute(): Observable<UserEntity> {
    return this.userRepository.getUser();
  }
}