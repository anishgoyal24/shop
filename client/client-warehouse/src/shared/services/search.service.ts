import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private http: HttpClient
    ) { }

    search(terms: Observable<string>){
      return terms.pipe(debounceTime(400), distinctUntilChanged(), switchMap(term => this.searchEntries(term)));
    }

    searchEntries(term){
      let params = new HttpParams().set("email", term);
      return this.http
        .get(environment.BASE_URL_API + '/warehouse/search', {
          params: params
        })
        .pipe(map(res => res['data']));
    }
  
}