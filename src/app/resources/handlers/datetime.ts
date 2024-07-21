import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTime {

  public getDateTime() {

    const now = new Date();
    const year = now.getFullYear();
    let month = String(now.getMonth() + 1);
    month = ("0" + month).slice(-2);
    let day = String(now.getDate());
    day = ("0" + day).slice(-2);
    let hour = String(now.getHours());
    hour = ("0" + hour).slice(-2);
    let minutes = String(now.getMinutes());
    minutes = ("0" + minutes).slice(-2);

    const date_time = `${year}-${month}-${day}T${hour}:${minutes}`;

    return date_time;
  }
}
