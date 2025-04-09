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
import {ClientEditDialog} from "../edit/client-edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
    selector: 'app-client-details',
    standalone: true,
    imports: [MatCardModule, MatMenuModule, MatButtonModule, RouterLink, MatTableModule, MatPaginatorModule, NgIf, MatCheckboxModule, MatTooltipModule, NgOptimizedImage, NgxMaskPipe, MatIcon, MatTabGroup, MatTab],
    templateUrl: './client-details.component.html',
    styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
    protected data: Client = {address: "", clientId: 0, instagram: "", name: "", phone: "", status: "", whatsapp: false};

    error: boolean = false;
    errorMessage: string;
    success: boolean = false;
    successMessage: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const clientId = Number(params.get('clientId'));
            this.clientService.getById(clientId).subscribe(data => {
                this.data = data;
            });
        });
    }


    isToggled = false;

    constructor(
        public themeService: CustomizerSettingsService,
        private clientService: ClientService,
        public dialog: MatDialog,
        private route: ActivatedRoute
    ) {
        this.themeService.isToggled$.subscribe(isToggled => {
            this.isToggled = isToggled;
        });
    }

    openClientEditDialog(client: Client): void {
        const dialogRef = this.dialog.open(ClientEditDialog, {
            data: {
                clientId: client.clientId,
                name: client.name,
                address: client.address,
                status: client.status,
                phone: client.phone,
                whatsapp: client.whatsapp,
                instagram: client.instagram
            },
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result: Client) => {
            if (result) {
                this.data = result;
                this.successAlert("Sucesso ao editar o cliente");
            } else if (result != undefined) {
                this.errorAlert('Erro ao editar cliente');
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

