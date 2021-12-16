import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Department, Floor } from 'src/model';

const httpOption = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'auth-token': String(localStorage.getItem('token')),
    // 'auth-token':
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWEwNTY5ZWI1OGM5YWNmOTA4YmVlNzciLCJpYXQiOjE2Mzk0NzQ5MDB9.cIdU9dp_yDBufGfug05nTAmFaEgr1qmUjPZy_LIYZaQ',
  }),
};
interface floorResponse {
  payload: Floor;
}
interface departmentResponse {
  payload: Department;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  private loginApi = 'https://feedback-project-api.herokuapp.com/login';
  private floorApi = 'https://feedback-project-api.herokuapp.com/api/v1/floors';
  private departmentApi =
    'https://feedback-project-api.herokuapp.com/api/v1/departments';

  login(email: string, password: string) {
    return this.http.post<any>(this.loginApi, { email, password });
  }

  getfloor() {
    return this.http.get<Floor[]>(this.floorApi);
  }

  createFloor(data: any): Observable<floorResponse> {
    return this.http.post<floorResponse>(this.floorApi, data, httpOption);
  }

  deleteFloor(id: any): Observable<any> {
    return this.http.delete(`${this.floorApi}/${id}`, httpOption);
  }

  getDepartment() {
    return this.http.get<Floor[]>(this.departmentApi);
  }

  createDepartment(data: any): Observable<departmentResponse> {
    return this.http.post<departmentResponse>(
      this.departmentApi,
      data,
      httpOption
    );
  }

  deleteDepartment(id: any): Observable<any> {
    return this.http.delete(`${this.departmentApi}/${id}`, httpOption);
  }
}