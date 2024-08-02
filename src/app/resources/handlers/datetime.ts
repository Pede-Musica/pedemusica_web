import { Injectable } from '@angular/core';
import { getHours } from 'date-fns';

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

  public revertDateTime(dateISO: string) {

    const isoDate = new Date(dateISO);
    const hour = getHours(isoDate);
    isoDate.setHours(hour - 3);
    const final = isoDate.toISOString().replace(':00.000Z', '');
    return String(final);
  }

  public convertToBRTime(utcDateStr: any) {
    // Parse the UTC date string
    const date = new Date(utcDateStr);

    // Convert to Brasília Time (UTC-3)
    const offset = -3 * 60; // -3 hours in minutes
    const brtDate = new Date(date.getTime() + offset * 60000);

    // Format the date and time in PT-BR style
    const day = String(brtDate.getUTCDate()).padStart(2, '0');
    const month = String(brtDate.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = brtDate.getUTCFullYear();
    const hours = String(brtDate.getUTCHours()).padStart(2, '0');
    const minutes = String(brtDate.getUTCMinutes()).padStart(2, '0');
    const seconds = String(brtDate.getUTCSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

}
