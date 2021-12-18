import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Service } from 'src/app/services/service.service';
import { Department, Floor, Room, SendMessage } from 'src/model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(private service: Service, private fb: FormBuilder) {}

  submitForm: FormGroup = new FormGroup({});

  floors: Floor[] = [];
  departments: Department[] = [];
  rooms: Room[] = [];
  submitted = false;

  floorID: string | null = '';
  departmentID: string | null = '';
  ngOnInit(): void {
    this.service.getfloor().subscribe((data: any) => {
      console.log(data);
      this.floors = data.payload;
    });
    this.service.getDepartment().subscribe((data: any) => {
      console.log(data);
      this.departments = data.payload;
    });
    this.service.getRoom().subscribe((data: any) => {
      console.log(data);
      this.rooms = data.payload;
    });
    this.submitForm = this.fb.group({
      title: new FormControl(''),
      message: new FormControl(''),
      feedbackLevel: new FormControl(''),
      floor_id: new FormControl(''),
      room_id: new FormControl(''),
      department_id: new FormControl(''),
    });
  }

  test() {
    console.log('test');
  }

  setFloorID(floor: any) {
    console.log('Floor', floor);
    this.floorID = floor;
    this.departmentID = '';
    // this.message.department_id = '';
    this.submitForm.controls['department_id'].setValue('');
    // this.displayDP = false;
    // this.displayRoom = false;
  }
  setDepartmentID(depart: any) {
    console.log('departmentId', depart);
    this.departmentID = depart;
    // this.message.room_id = '';
    this.submitForm.controls['room_id'].setValue('');
  }
  getRoomID(room: any) {
    console.log('departmentId', room);
  }

  sendMessage(): void {
    let feedBackType = '';
    let uniqueIDs = [''];
    if (this.submitForm.controls['floor_id'].value != '') {
      feedBackType = 'floor';
      uniqueIDs = [this.submitForm.controls['floor_id'].value];
      if (this.submitForm.controls['department_id'].value != '') {
        feedBackType = 'department';
        uniqueIDs = [this.submitForm.controls['department_id'].value];
        if (this.submitForm.controls['room_id'].value != '') {
          uniqueIDs = [this.submitForm.controls['room_id'].value];
          feedBackType = 'room';
        }
      }
    }

    const data: SendMessage = {
      title: this.submitForm.controls['title'].value,
      message: this.submitForm.controls['message'].value,
      feedbackLevel: this.submitForm.controls['feedbackLevel'].value,
      feedbackType: feedBackType,
      uniqueIDs: uniqueIDs,
    };

    console.log(this.submitForm.value);
    this.service.sendMessage(data).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
        this.floorID = '';
        this.departmentID = '';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newMsg(): void {
    this.submitted = false;
    this.submitForm.reset();
  }

  displayDP = false;
  displayRoom = false;

  showDP() {
    this.displayDP = true;
  }
  showRoom() {
    this.displayRoom = true;
  }
  hideDP() {
    this.displayDP = false;
    this.departmentID = null;
    this.submitForm.controls['department_id'].setValue('');
  }
  hideRoom() {
    this.displayRoom = false;
    this.submitForm.controls['room_id'].setValue('');
  }
}
