import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, Validators } from '@angular/forms';

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
  constructor(private fb: FormBuilder
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
   * @description Enivia los datos del usuario a la apiy basado en la respuesta
   * guarda el usuario en el local storage y redirige al listado
   */
   onSubmit(): void {
     
  }

}
