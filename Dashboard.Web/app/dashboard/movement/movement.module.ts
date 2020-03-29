import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementComponent } from './movement.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MovementComponent],
    exports: [MovementComponent]
})

export class MovementModule { }
