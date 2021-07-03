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

  protected subject$: BehaviorSubject<Array<SampleUser>> = new BehaviorSubject<Array<SampleUser>>([]);

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * データを取得します。
   * @protected
   */
  protected fetch(): Observable<Array<SampleUser>> {
    return this.http
      .get<Array<SampleUser>>('https://jsonplaceholder.typicode.com/users')
      .pipe(
        tap(x => this.subject$.next(x))
      );
  }
}
