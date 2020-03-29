import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { MovementRoutes } from './movement/movement.routes';
import { ImageRoutes } from './image/image.routes';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
	    	...HomeRoutes,
			...MovementRoutes,
			...ImageRoutes
    	]
  	}
];
