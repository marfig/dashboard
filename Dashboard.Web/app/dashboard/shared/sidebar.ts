import { Component } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'sidebar',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent{
	isActive = false;
	
	eventCalled() {
		this.isActive = !this.isActive;
	}
 }