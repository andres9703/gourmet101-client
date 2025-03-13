import { Injectable } from '@angular/core';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { User } from '../../../data/models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserMapper {
  mapToDomain(userModel: User): UserEntity {
    return {
      nickname: userModel.nickname,
      name: userModel.name,
      picture: userModel.picture,
      updated_at: userModel.updated_at,
      sub: userModel.sub
    };
  }
}