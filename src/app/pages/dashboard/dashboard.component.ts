import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  retrievedLinkList,
  addLink,
  removeLink,
} from 'src/app/state/links.actions';
import { Link } from 'src/app/interfaces/links.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectLinks } from 'src/app/state/links.selector';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 400ms ease-in'),
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class DashboardComponent implements OnInit {
  state = 'none';
  links$ = this.store.select(selectLinks);
  user$: any;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private httpService: HttpService
  ) {}
  linksForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    url: ['', [Validators.required]],
  });

  /**
   * @description Ask confirmation, then calls the api make the delete and update the store.
   * @param linkId
   */
  onRemove(linkId: string) {
    if (confirm('Are you sure to delete the url?')) {
      this.httpService.deleteLink(linkId).subscribe((res) => {
        this.store.dispatch(removeLink({ linkId }));
      });
    }
  }

  /**
   * @description Activate initial animation, make api calls for links and user, dispatch links to store
   */
  ngOnInit(): void {
    this.state = ':enter';

    /**
     * server was responding with invalid json due to a trailing comma, here we transform the reponse to parse a valid json.
     */
    this.httpService.getLinks().subscribe((links) => {
      let trailingComma = links.replace(/(.*?),\s*(\}|])/g, '$1$2');
      let linksList: Link[] = JSON.parse(trailingComma);
      this.store.dispatch(retrievedLinkList({ links: linksList }));
    });

    this.httpService.getUser().subscribe((user) => {
      this.user$ = user;
    });
  }

  /**
   * @description Sends links data to api, dispatch the link to store and clear the form
   * we fake an id comming from the server response
   */
  onSubmit(): void {
    const { name, url } = this.linksForm.value;
    this.httpService.createLink({ name, url }).subscribe((res) => {
      let id = String(Math.floor(Math.random() * 100));
      this.store.dispatch(addLink({ link: { id, name, url } }));
      this.linksForm.reset();
    });
  }
}
