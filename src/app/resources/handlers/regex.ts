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
    if (number < 10 && number > 1) {
      let formatted = number.toFixed(2);

      // Se os decimais forem 00, retorna o número com dois dígitos (ex: 1 -> 01)
      if (formatted.endsWith('00')) {
        return '0' + Math.floor(number).toString();
      }

      // Se o segundo decimal for 0, retorna o número com uma casa decimal e dois dígitos (ex: 1.50 -> 01.5)
      if (formatted.endsWith('0')) {
        return '0' + formatted.slice(0, -1);
      }

      // Retorna o número formatado com dois dígitos e duas casas decimais (ex: 1.23 -> 01.23)
      return '0' + formatted;
    }

    if (number >= 10) {
      let formatted = number.toFixed(2);

      // Se os decimais forem 00, retorna apenas a parte inteira
      if (formatted.endsWith('00')) {
        return Math.floor(number).toString();
      }

      // Se o segundo decimal for 0, retorna com uma casa decimal
      if (formatted.endsWith('0')) {
        return formatted.slice(0, -1);
      }

      return formatted;
    }

    return number.toString();
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

  public getNextNumber(number: number) {
    return Math.ceil(number);
  }

  public decimal(number: number) {
    return parseFloat(number.toFixed(2));
  }

  public isFloat(value: any) {
    if (typeof value === 'number') {
      return Number.isFinite(value) && !Number.isInteger(value);
    }
    if (typeof value === 'string') {
      return /^[+-]?\d*\.\d+$/.test(value);
    }
    return false;
  }
}
