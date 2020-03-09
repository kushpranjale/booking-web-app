import { NgModule } from '@angular/core';

import {
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
    MatIconModule,
    MatGridListModule,
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatTooltipModule,
    ],
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatGridListModule,
        MatFormFieldModule,
        MatTooltipModule,
    ],
})
export class MaterialModule {}
