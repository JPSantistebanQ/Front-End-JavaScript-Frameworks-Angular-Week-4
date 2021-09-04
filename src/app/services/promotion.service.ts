import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { Promotion } from '../shared/promotion';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  constructor(
    private restangular: Restangular,
    private processHTTPMsgService: ProcessHttpmsgService
  ) {}

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular
      .all('promotions')
      .getList({ featured: true })
      .map((dishes) => dishes[0]);
  }
}
