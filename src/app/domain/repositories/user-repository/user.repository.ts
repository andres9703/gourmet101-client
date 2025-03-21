import { Observable } from "rxjs";
import { UserEntity } from "../../entities/user/user.entity";

export interface UserRepository {
  getUser(): Observable<{ user: UserEntity; isAuthenticated: boolean }>;
  saveUser(user: UserEntity): UserEntity;
  updateUser(user: UserEntity): UserEntity;
  getUserById(id: string): UserEntity;
}