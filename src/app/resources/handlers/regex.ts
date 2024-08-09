import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Regex {

  //Retorna o primeiro e o último nome
  public getFirstAndLastName(text: string | undefined): string {
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

  public formatToTwoDigits(number: any) {
    return number < 10 ? '0' + number : number.toString();
  }

  public getFirstNameAndLastNameInitial(fullName: string) {
    // Divide a string em um array de palavras usando o espaço como separador
    const names = fullName.trim().split(" ");

    // Verifica se há mais de um nome na string
    if (names.length > 1) {
      const firstName = names[0];
      const lastNameInitial = names[names.length - 1][0]; // Obtém a primeira letra do último nome
      return `${firstName} ${lastNameInitial}.`;
    } else {
      // Se houver apenas um nome, retorna apenas esse nome
      return names[0];
    }
  }

  public getDecimalPart(number: number) {
    // Convertendo o número para string
    let numberString = number.toString();

    // Verificando se existe uma parte decimal
    if (numberString.includes('.')) {
      // Retorna a parte decimal, excluindo o ponto
      return Number(numberString.split('.')[1]);
    } else {
      // Se não houver parte decimal, retorna '0'
      return 0;
    }
  }

  public getNextNumber(number: number){
    return Math.ceil(number);
  }

  public decimal(number: number) {
    return parseFloat(number.toFixed(2));
}
}
