import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostdataService {

  constructor() { }
  postData: any;

  setData(data: any) {
    this.postData = data;
  }
  getData() {
    return this.postData;
  }
  clearData() {
    this.postData = null;
  }
}
