import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export const BASE_API_URL = 'http://localhost:3000/users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  searchByFormControlKey<T>(
    formControlRef: any,
    requestOptions?: any
  ): Observable<T> {
    let url = BASE_API_URL;
    let flag = false;

    if (formControlRef) {
      for (let [index, [key, value]] of Object.entries(
        formControlRef
      ).entries()) {
        if (value) {
          if (index === 0) {
            url += '?';
            flag = true;
          } else {
            url += '&';
          }

          if (typeof value === 'object' && !Array.isArray(value)) {
            for (let [index, [keyRef, valueRef]] of Object.entries(
              value as any
            ).entries()) {
              url += `${key}.${keyRef}=${valueRef}`;
            }
            continue;
          }

          url += `${key}=${value}`;
        }
      }
    }

    if (requestOptions) {
      // http://localhost:3000/users?name=test&_page=1&_limit=10

      if (requestOptions.page && requestOptions.limit) {
        url += flag ? '&' : '?';
        url += `_page=${requestOptions.page}&_limit=${requestOptions.limit}`;
        flag = true;
      }

      // * http://localhost:3000/users?_sort=name&_order=asc
      // http://localhost:3000/users eğer page ve limit yoksa
      if (requestOptions.sort && requestOptions.order) {
        url += flag ? '&' : '?';
        url += `_sort=${requestOptions.sort}&_order=${requestOptions.order}`;
      }
    }
    return this.httpClient.get<T>(url);
  }

  saveUser<T>(data: any): Observable<T> {
    return this.httpClient.post<T>(BASE_API_URL, data);
  }
}
