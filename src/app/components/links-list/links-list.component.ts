import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Link } from 'src/app/interfaces/links.model';

@Component({
  selector: 'app-links-list',
  templateUrl: './links-list.component.html',
  styleUrls: ['./links-list.component.scss'],
})
export class LinksListComponent implements OnInit {
  @Input() links: ReadonlyArray<Link>;
  @Output() remove = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}
}
