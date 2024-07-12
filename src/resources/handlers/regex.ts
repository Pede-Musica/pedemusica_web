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
}
