import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/guard/auth.service';
import { Login } from 'src/app/shared/models/login-model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SESSION, KEY_ENCRYPT } from 'src/app/shared/utils/utils';
import { EncrDecrService } from 'src/app/shared/services/encrypt/EncrDecr.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  validateForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router,
    private encrypt: EncrDecrService
  ) {
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }

    let email = this.validateForm.controls['email'].value
    let password = this.encrypt.set(KEY_ENCRYPT, this.validateForm.controls['password'].value)

    this.login(this.getLoginInformation(email, password))
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  login(login: Login) {
    this.authService.login(login).subscribe(response => {
      let data: any = response
      if (data.token !== '') {
        SESSION.setSessionAuthen(data.token)
        SESSION.setSessionRole(data.role)
        this.router.navigateByUrl('/dashboard/list-account')
      } else {
        this.message.error('Email or Password invalid!');
      }
    })
  }

  // get login information
  getLoginInformation(email: string, password: string) {
    let login: Login = {
      email: email,
      password: password
    }
    return login
  }
}
