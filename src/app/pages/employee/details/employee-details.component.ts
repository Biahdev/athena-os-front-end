import {NgIf, NgOptimizedImage} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CustomizerSettingsService} from '../../../customizer-settings/customizer-settings.service';
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../types/Client";
import {NgxMaskPipe} from "ngx-mask";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeEditDialog} from "../edit/employee-edit-dialog.component";
import {Employee} from "../../../types/Employee";
import {EmployeeService} from "../../../services/employee.service";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
    selector: 'app-employee-details',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule, NgOptimizedImage, NgxMaskPipe, MatIcon, MatTabGroup, MatTab],
    templateUrl: './employee-details.component.html',
    styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent {
    protected data: Employee = {employeeId: 0, name: '', position: '', status: '', note: ''};

    error: boolean = false;
    errorMessage: string;
    success: boolean = false;
    successMessage: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const employeeId = Number(params.get('employeeId'));
            this.employeeService.getById(employeeId).subscribe(data => {
                this.data = data;
            });
        });
    }


    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private employeeService: EmployeeService,
        public dialog: MatDialog,
        private route: ActivatedRoute,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    openEmployeeEditDialog(employee: Employee): void {
        const dialogRef = this.dialog.open(EmployeeEditDialog, {
            data: {employeeId: employee.employeeId, name: employee.name, position: employee.position, status: employee.status, note: employee.note},
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result: Employee) => {
            if(result) {
                this.data = result;
                this.successAlert("Sucesso ao editar o funcionário");
            } else if(result != undefined) {
                this.errorAlert('Erro ao editar funcionário');
            }
        });
    }

    dismissAlert(type: string) {
        if(type == 'sucess') {
            this.success = false;
        } else {
            this.error = false;
        }
    }

    successAlert(msg: string) {
        this.successMessage = msg;
        this.success = true;
        setTimeout(() => this.success = false, 10000);
    }

    errorAlert(msg: string) {
        this.errorMessage = msg;
        this.error = true;
        setTimeout(() => this.error = false, 10000);
    }

}

