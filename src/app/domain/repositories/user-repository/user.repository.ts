import { Observable } from "rxjs";
import { UserEntity } from "../../entities/user/user.entity";

export interface UserRepository {
  getUser(): Observable<UserEntity>;
  saveUser(user: UserEntity): UserEntity;
  updateUser(user: UserEntity): UserEntity;
  getUserById(id: string): UserEntity;
}