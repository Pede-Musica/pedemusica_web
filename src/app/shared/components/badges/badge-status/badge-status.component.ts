import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge-status',
  templateUrl: './badge-status.component.html',
  styleUrl: './badge-status.component.scss'
})
export class BadgeStatusComponent {

  @Input() text: string = '';
  @Input() color: string = ''

  get backgroundColor() {
    switch(this.color) {
      case 'green': return 'bg-green-500'
      case 'red': return 'bg-red-500'
    }

    return 'bg-white'
  }

}
