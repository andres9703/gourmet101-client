import { Injectable } from '@angular/core';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { UserRepository } from '../../../domain/repositories/user-repository/user.repository';
import { UserApiDataSource } from '../../datasources/remote/user-api.datasource';
import { map, Observable } from 'rxjs';
import { UserMapper } from '../../mappers/user/user.mapper';

@Injectable({
  providedIn: 'root'
})

export class UserRepositoryImplementation implements UserRepository {

  constructor(private userApiDataSource: UserApiDataSource, private userMapper: UserMapper) {}
  getUser(): Observable<{ user: UserEntity; isAuthenticated: boolean }> {
    return this.userApiDataSource.getUser().pipe(
      map((userInfo) => {
        return {
          user: this.userMapper.mapToDomain(userInfo.user),
          isAuthenticated: userInfo.isAuthenticated
        };
      })
    );
  }

  saveUser(user: UserEntity): UserEntity {
    // Implement the logic to save a user
    return {} as UserEntity;
  }

  updateUser(user: UserEntity): UserEntity {
    // Implement the logic to update a user
        return {} as UserEntity;
  }

  getUserById(id: string): UserEntity {
    // Implement the logic to get a user by ID
    return {} as UserEntity;
  }
}