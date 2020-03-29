import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { MovementModule } from './movement/movement.module';
import { ImageModule } from './image/image.module';

import { DashboardComponent } from './dashboard.component';

import { TopNavComponent } from './shared/topnav';
import { SidebarComponent } from './shared/sidebar';

@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	HomeModule,
		MovementModule,
		ImageModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent]
})

export class DashboardModule { }
