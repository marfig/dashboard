import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

/**
*	This class represents the lazy loaded DashboardComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'dashboard-cmp',
	templateUrl: 'dashboard.component.html',
	providers: [LoginService]
})

export class DashboardComponent implements OnInit {
	public identity;

	constructor(
		private _loginService: LoginService,
		private _router: Router
	  ){ }
	  
	ngOnInit(){
		this.identity = this._loginService.getIdentity();
    
		if (this.identity == null){
		  this._router.navigate(["/login"]);
		}
	}	
}
