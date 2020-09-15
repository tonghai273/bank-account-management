import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/guard/auth.service';
import { Role } from 'src/app/shared/models/role';
import { SESSION } from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    SESSION.removeSessionAuthen()
    this.router.navigateByUrl('/auth')
  }

  get isAdmin() {
    return this.auth.hasRole(Role.Admin)
  }
}
