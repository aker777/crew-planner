import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addMember(data: any){
    return this.http.post(this.apiUrl+'membre/', data)
  }

  getMembers(){
    return this.http.get(this.apiUrl+'membre/');
  }
}
