import { Observable } from "rxjs";
import { GourmetUserEntity } from "../../entities";

export interface GourmetUserRepository {
  getUser(): Observable<GourmetUserEntity>;
  saveUser(user: GourmetUserEntity): GourmetUserEntity;
  updateUser(user: GourmetUserEntity): GourmetUserEntity;
  getUserById(id: string): GourmetUserEntity;
}