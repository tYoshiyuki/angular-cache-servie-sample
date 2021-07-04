import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { take } from "rxjs/operators";

/**
 * HTTPリクエスト伴うキャッシュデータを扱うためのサービスです。
 */
@Injectable({
  providedIn: 'root'
})
export abstract class AbstractHttpCacheService<T> {

  protected abstract subject$: BehaviorSubject<Array<T>>;

  /**
   * データを取得します。
   * キャッシュが存在する場合は、キャッシュデータを返却します。
   */
  public get(): Observable<Array<T>> {
    // データが未取得の場合は、リクエストよりデータの取得を行います。
    if (this.subject$.getValue().length === 0) {
      return this.fetch();
    }
    return this.subject$.asObservable().pipe(take(1));
  }

  /**
   * HTTPリクエストを用いてデータの取得を行います。
   * @protected
   */
  protected abstract fetch(): Observable<Array<T>>;
}
