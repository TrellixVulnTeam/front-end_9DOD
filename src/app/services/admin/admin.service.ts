import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Message, Department, Floor, Room } from 'src/model';

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
interface roomResponse {
  payload: Room;
}
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private router: Router) {}

  private loginApi = 'https://feedback-project-api.herokuapp.com/login';
  private floorApi = 'https://feedback-project-api.herokuapp.com/api/v1/floors';
  private departmentApi =
    'https://feedback-project-api.herokuapp.com/api/v1/departments';
  private roomApi = '//feedback-project-api.herokuapp.com/api/v1/rooms';
  private messageApiUrl =
    'https://feedback-project-api.herokuapp.com/api/v1/feedbacks';

  private highMessageApiUrl =
    'https://feedback-project-api.herokuapp.com/api/v1/feedbacks/?feedbackLevel=High';
  private NormalMessageApiUrl =
    'https://feedback-project-api.herokuapp.com/api/v1/feedbacks/?feedbackLevel=Medium';
  private lowMessageapiUrl =
    'https://feedback-project-api.herokuapp.com/api/v1/feedbacks/?feedbackLevel=Low';

  getMessage() {
    return this, this.http.get<Message[]>(this.messageApiUrl, httpOption);
  }
  getHighMessage() {
    return this, this.http.get<Message[]>(this.highMessageApiUrl, httpOption);
  }
  getNormalMessage() {
    return this, this.http.get<Message[]>(this.NormalMessageApiUrl, httpOption);
  }
  getLormalMessage() {
    return this, this.http.get<Message[]>(this.lowMessageapiUrl, httpOption);
  }
  login(email: string, password: string) {
    return this.http.post<any>(this.loginApi, { email, password });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  loggedIn() {
    return !!localStorage.getItem('token');
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
  getRoom() {
    return this.http.get<Room[]>(this.roomApi);
  }
  createRoom(data: any): Observable<roomResponse> {
    return this.http.post<roomResponse>(this.roomApi, data, httpOption);
  }

  deleteRoom(id: any): Observable<any> {
    return this.http.delete(`${this.roomApi}/${id}`, httpOption);
  }

  deleteMessage(id: string): Observable<any> {
    return this.http.delete(`${this.messageApiUrl}/${id}`, httpOption);
  }
}
