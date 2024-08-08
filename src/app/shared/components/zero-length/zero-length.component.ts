import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-zero-length',
  templateUrl: './zero-length.component.html',
  styleUrl: './zero-length.component.scss'
})
export class ZeroLengthComponent {

  @Input() text: string = '';
}
