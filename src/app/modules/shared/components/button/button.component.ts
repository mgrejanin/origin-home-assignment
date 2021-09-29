import { Component, Input } from '@angular/core';

@Component({
  selector: 'saving-goals-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'menu' | 'reset' | 'submit' = 'button';
  @Input() size: 'md' | 'xl' = 'xl';
}
