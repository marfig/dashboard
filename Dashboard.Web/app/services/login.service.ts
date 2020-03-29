import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class LoginService{
	public url = "http://localhost:51421";
	public identity;
	
    constructor(private _http: Http){}
    
	signup(username:string, password:string){	
       let params = "username=" + username + "&password=" + password + "&grant_type=password";
		
       let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
       return this._http.post(this.url + "/Token", params, {headers: headers})
                            .map(res => res.json());	
    }
	
	getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if (identity != "undefined"){
            this.identity = identity;
        }     
        else{
            this.identity = null;
        }   
        return this.identity;
    }
}