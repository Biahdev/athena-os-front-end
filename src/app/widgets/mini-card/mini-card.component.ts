import {Component, Input, numberAttribute} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {DecimalPipe, formatPercent, NgClass, PercentPipe} from "@angular/common";

@Component({
    selector: 'app-mini-card',
    standalone: true,
    imports: [MatCardModule, RouterLink, MatIcon, NgClass, PercentPipe, DecimalPipe],
    templateUrl: './mini-card.component.html',
    styleUrl: './mini-card.component.scss',
})
export class MiniCardComponent {

    @Input() title: string;
    @Input() icon: string;
    @Input() iconColor: string;
    @Input() value: string;
    @Input() description: string;
    @Input({transform: numberAttribute}) graphValue: number;
    isNegativeValue: boolean;


    ngOnInit(): void {
        this.isNegativeValue = this.graphValue < 0;
    }

    constructor() {
    }
}
