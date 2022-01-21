import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
export class RegisterComponent implements OnInit {
  state = 'none';
  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService
) { }
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    mail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
 

  /**
   * @description Activa la animacion inicial
   */
   ngOnInit(): void {
    this.state = ':enter';
  }

  /**
   * @description Sends data to api and redirect depending on status response
   */
   onSubmit(): void {
    const { name, mail, password } = this.registerForm.value;
    this.httpService
      .signUpUser({ name, mail, password })
      .subscribe(res => {
        this.router.navigate(['app/login']);
      });
  }

}
