import {NgFor, NgIf, NgOptimizedImage} from '@angular/common';
import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {RouterLink} from '@angular/router';
import {CustomizerSettingsService} from '../../customizer-settings/customizer-settings.service';
import {Employee} from "../../types/Employee";
import {EmployeeService} from "../../services/employee.service";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {EmployeeCreateDialog} from "./create/employee-create-dialog.component";
import {EmployeeEditDialog} from "./edit/employee-edit-dialog.component";
import {EmployeeDeleteDialog} from "./delete/employee-delete-dialog.component";

@Component({
    selector: 'app-e-sellers',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, NgFor, NgOptimizedImage, MatIcon, NgIf],
    templateUrl: './employee-page.component.html',
    styleUrl: './employee-page.component.scss',
})
export class EmployeePageComponent {

    protected employees: Employee[] = []
    protected error: boolean = false;
    protected errorMessage: string;
    protected success: boolean = false;
    protected successMessage: string;

    // isToggled
    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        public dialog: MatDialog,
        public employeeService: EmployeeService,
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    ngOnInit(): void {
        this.employeeService.getAll().subscribe(data => {
            this.employees = data;
        });
    }

    openEmployeeCreateDialog(): void {
        const dialogRef = this.dialog.open(EmployeeCreateDialog, {
            width: '500px',
        });
        dialogRef.afterClosed().subscribe((result: Employee) => {
            if (result) {
                this.employees.push(result);
                this.successAlert(`Funcionário '${result.name}' criada com sucesso`);
            } else if (result != undefined) {
                this.errorAlert('Erro ao criar um funcionario');
            }
        });
    }


    openEmployeeEditDialog(employee: Employee): void {
        const dialogRef = this.dialog.open(EmployeeEditDialog, {
            data: {employeeId: employee.employeeId, name: employee.name, position: employee.position, status: employee.status, note: employee.note},
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result: Employee) => {
            if (result) {
                const index = this.employees.findIndex(item => item.employeeId === result.employeeId);
                if (index !== -1) {
                    this.employees[index] = result;
                    this.employees = [...this.employees];
                    this.successAlert(`Funcionário '${employee.name}' editada com sucesso`);
                }
            } else if (result != undefined) {
                this.errorAlert(`Erro ao editar funcionário '${employee.name}'`);
            }
        });
    }


    openEmployeeDeleteDialog(employee: Employee): void {
        const dialogRef = this.dialog.open(EmployeeDeleteDialog, {
            data: {employeeId: employee.employeeId, name: employee.name, position: employee.position, status: employee.status, note: employee.note},
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if (result === 'deleted') {
                this.employees = this.employees.filter(item => item.employeeId !== employee.employeeId);
                this.successAlert(`Funcionário '${employee.name}' deletado com sucesso`);
            } else if (result != undefined) {
                this.errorAlert('Erro ao deletar funcionário');
            }
        });
    }


    dismissAlert(type: string) {
        if (type == 'sucess') {
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
