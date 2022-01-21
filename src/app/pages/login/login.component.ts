import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {
  state = 'none';
  constructor(private fb: FormBuilder, private router: Router, private httpService: HttpService
) { }
  loginForm = this.fb.group({
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
   * store a variable on local storage to simple guard dashboard page
   */
   onSubmit(): void {
    const { mail, password } = this.loginForm.value;
    this.httpService
      .logInUser({ mail, password })
      .subscribe(res => {
        localStorage.setItem('usuario', JSON.stringify(res));
        this.router.navigate(['app/dashboard']);
      });
  }

  

}
