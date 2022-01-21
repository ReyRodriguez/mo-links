import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() showLogo: boolean = false;
  @Input() textButton: string = '';
  @Input() redirectTo: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
