import { Injectable } from '@angular/core';
import { Observable, throwError,} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }
  search(terms: Observable<string>) {
    return terms.pipe(debounceTime(400), distinctUntilChanged(), switchMap(term => this.searchEntries(term)));
  }
  searchEntries(term) {
    return this.http.get(config.userUrl + term);
  }
}
