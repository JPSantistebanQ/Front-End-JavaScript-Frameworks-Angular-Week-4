import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class LeaderService {
  constructor(
    private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  getLeaders(): Observable<Leader[]> {
    return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {
    return this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.restangular
      .all('leaders')
      .getList({ featured: true })
      .map((dishes as any) => (dishes as any)[0]);
  }
}
