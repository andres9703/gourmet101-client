import { Observable } from 'rxjs';
import { GourmetUserEntity } from '../../entities';

export interface GourmetUserRepository {
  getUser(): Observable<GourmetUserEntity>;
  saveUser(sub: string): Observable<GourmetUserEntity>;
  updateUser(user: FormData, id: string): Observable<GourmetUserEntity>;
  getUserById(id: string): Observable<{ user: GourmetUserEntity; subSubmitted: string }>;
}
