import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'login.component.html',
	providers: [LoginService]
})

export class LoginComponent implements OnInit { 
	public errorMessage;
	public identity;
	public user;
	
	constructor(
		private _loginService: LoginService,
		private _route: ActivatedRoute,
		private _router: Router
	  ){ }
	  
	ngOnInit(){
		this._route.params.subscribe(params => {
		  let logout = +params["id"];
		  
		  if (logout == 1){
			localStorage.removeItem('identity');
			
			this._router.navigate(["/login"]);
		  }
		});
	
		let identity = this._loginService.getIdentity();
    
		if (identity != null && identity.access_token){
		  this._router.navigate(["/dashboard/home"]);
		}
		
		this.user = {
		  "email": "",
		  "password": ""
		};
	}
	
	onSubmit(){
		this._loginService.signup(this.user.email, this.user.password).subscribe(
			response => {
				this.identity = response;
			
				if(this.identity.length <= 0){
					alert("Error en el servidor");
				}
				else{
					localStorage.setItem('identity', JSON.stringify(this.identity));
					this._router.navigate(["/dashboard/home"]);
				}
			},
			error =>{
				if(error != null){
					this.errorMessage = "Error en el servidor";
					
					if (error._body != null){
						let error_json = JSON.parse(error._body);
						
						if (error_json.error == "invalid_grant"){
							this.errorMessage = "El nombre de usuario o contraseña es incorrecto";
						}
					}
					console.log(error);
				}
			});
			
		return false;
    }

    ngAfterViewInit() {
        var head = document.getElementsByTagName("head")[0];
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "/assets/scripts/jquery-1.10.2.min.js";
        head.appendChild(s);

        s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "/assets/scripts/login_external.js";
        head.appendChild(s);
    }
}
