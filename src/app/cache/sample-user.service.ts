import { Injectable } from '@angular/core';
import { AbstractHttpCacheService } from "./abstract-http-cache.service";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";

/**
 * SampleUser のインターフェースです。
 */
export interface SampleUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

/**
 * SampleUserService です。
 */
@Injectable({
  providedIn: 'root'
})
export class SampleUserService extends AbstractHttpCacheService<SampleUser>{

  protected subject$: BehaviorSubject<SampleUser[]> = new BehaviorSubject<SampleUser[]>([]);

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * データを取得します。
   * @protected
   */
  protected fetch(): Observable<SampleUser[]> {
    return this.http
      .get<SampleUser[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(x => this.subject$.next(x))
      );
  }
}
