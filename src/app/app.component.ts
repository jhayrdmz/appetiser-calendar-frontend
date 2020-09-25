import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  eventForm: FormGroup;
  isLoading: boolean = false;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  daysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private http: HttpClient) {
    this.eventForm = new FormGroup({
      event_name: new FormControl(null, [Validators.required]),
      date_from: new FormControl(null, [Validators.required]),
      date_to: new FormControl(null, [Validators.required]),
      days: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ])
    });
  }

  get days() {
    return this.eventForm.get('days');
  }

  submit(form: FormGroup) {
    if(this.isLoading || form.invalid) {
      return false;
    }

    this.isLoading = true;

    this.http.post(environment.apiUrl + '/events', form.value)
      .subscribe(res => {
        console.log(res);

        this.calendarOptions.events = res;

        this.isLoading = false;
      });
  }

}
