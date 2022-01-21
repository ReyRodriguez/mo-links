import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectLinks } from 'src/app/state/links.selector';
import { HttpService } from 'src/app/services/http/http.service';
import { User } from 'src/app/interfaces/user.model';

import {
  retrievedLinkList,
  addLink,
  removeLink
} from 'src/app/state/links.actions'
import { Link } from 'src/app/interfaces/links.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s 400ms ease-in')
      ]),
      transition(':leave', [
        animate('0.3s ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {
  state = 'none';
  links$ = this.store.select(selectLinks);
  user$: any;
  constructor(private fb: FormBuilder, private store: Store, private httpService: HttpService,
    ) { }
      linksForm = this.fb.group({
        name: ['', [Validators.required, Validators.maxLength(30)]],
        url: ['', [Validators.required]],
      });

      onAdd(id: string) {
        this.store.dispatch(addLink({ id }));
      }
     
      onRemove(linkId: string) {
        this.store.dispatch(removeLink({ linkId }));
      }

  /**
   * @description Activa la animacion inicial
   */
   ngOnInit(): void {
    this.state = ':enter';


    this.httpService
      .getUser()
      .subscribe((user) => {
        this.user$ = user;

      
      });

      this.httpService
      .getLinks()
      .subscribe((links) => {
        let noComa = links.replace(/(.*?),\s*(\}|])/g, "$1$2")
        
        console.log(JSON.parse(noComa));
        let linkss: Link[] = JSON.parse(noComa);
        this.store.dispatch(retrievedLinkList( {links: linkss} ))
      });
  }

  

  /**
   * @description Enivia los datos del usuario a la apiy basado en la respuesta
   * guarda el usuario en el local storage y redirige al listado
   */
   onSubmit(): void {
     
  }

}
