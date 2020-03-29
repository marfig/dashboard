import { Component, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'topnav',
	templateUrl: 'topnav.html'
})

export class TopNavComponent{ 
	@Input() fullName:string;
}