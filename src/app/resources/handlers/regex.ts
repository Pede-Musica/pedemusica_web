import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Regex {

  //Retorna o primeiro e o último nome
  public getFirstAndLastName(text: string): string {
    if (typeof text !== 'string') {
      throw new Error('Input must be a string');
    }

    let names = text.trim().split(' ');

    if (names.length === 1) {
      return String(names[0]);
    }

    const concat = `${names[0]} ${names[names.length - 1]}`

    return String(concat);
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
