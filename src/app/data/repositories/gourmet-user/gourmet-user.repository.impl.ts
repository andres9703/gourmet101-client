import { Injectable } from '@angular/core';
import { GourmetUserEntity } from 'src/app/domain';
import { GourmetUserApiDataSource } from '../../datasources/local/gourmet-user-api.datasource';
import {  Observable } from 'rxjs';
import { GourmetUserRepository } from 'src/app/domain/repositories/gourmet-user-repository/gourmet-user.repository';


@Injectable({
  providedIn: 'root'
})

export class GourmetUserRepositoryImplementation implements GourmetUserRepository {
  constructor(private gourmetUserApiDataSource: GourmetUserApiDataSource) {}
  getUser(): Observable<GourmetUserEntity> {
    return this.gourmetUserApiDataSource.getUser();
  }
  saveUser(user: GourmetUserEntity): GourmetUserEntity {
    // Implement the logic to save a user
    return {} as GourmetUserEntity;
  }

  updateUser(user: GourmetUserEntity): GourmetUserEntity {
    // Implement the logic to update a user
        return {} as GourmetUserEntity;
  }

  getUserById(id: string): GourmetUserEntity {
    // Implement the logic to get a user by ID
    return {} as GourmetUserEntity;
  }
}