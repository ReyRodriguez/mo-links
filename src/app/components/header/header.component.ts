import { Component, Input, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(2000)),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  @Input() showLogo: boolean = false;
  @Input() textButton: string = '';
  @Input() redirectTo: string = '';
  state = 'none';
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.state = '*';
  }
}
