import {Component, ViewChild} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatAnchor, MatButton, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatNoDataRow,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableDataSource,
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {MatTooltip} from "@angular/material/tooltip";
import {formatNumber, NgIf} from "@angular/common";
import {Client} from "../../types/Client";
import {CustomizerSettingsService} from "../../customizer-settings/customizer-settings.service";
import {MatDialog} from "@angular/material/dialog";
import {ClientService} from "../../services/client.service";
import {CategoryDeleteDialog} from "../category/delete/category-delete-dialog.component";
import {Subscription} from "rxjs";
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";
import {CategoryCreateDialog} from "../category/create/category-create-dialog.component";
import {Category} from "../../types/Category";
import {ClientCreateDialog} from "./create/client-create-dialog.component";
import {CategoryEditDialog} from "../category/edit/category-edit-dialog.component";
import {ClientEditDialog} from "./edit/client-edit-dialog.component";
import {type} from "node:os";
import {ClientDeleteDialog} from "./delete/client-delete-dialog.component";
import {MiniCardComponent} from "../../widgets/mini-card/mini-card.component";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";

@Component({
    selector: 'app-client-page',
    standalone: true,
    imports: [NgxMaskDirective, NgxMaskPipe, RouterLink, MatButton, MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderRow, MatHeaderRowDef, MatIcon, MatIconButton, MatPaginator, MatRow, MatRowDef, MatSort, MatSortHeader, MatTable, MatTooltip, NgIf, MatHeaderCellDef, MatNoDataRow, MatAnchor, MatIconAnchor, RouterOutlet, NgxMaskPipe, MiniCardComponent, MatChipListbox, MatChipOption],
    templateUrl: './client-page.component.html',
    styleUrl: './client-page.component.scss',
})
export class ClientPageComponent {
    protected displayedColumns: string[] = ['name', 'status', 'phone', 'instagram', 'address', 'action'];
    protected dataSource = new MatTableDataSource<Client>([]);

    protected totalClient: number = 0;
    protected qtdRegulares: number = 0
    protected qtdInadimplente: number = 0;

    protected totalClientGraphValue: number = 0.2;
    protected qtdRegularesGraphValue: number = -5.6;
    protected qtdInadimplenteGraphValue: number = 9.9;

    protected error: boolean = false;
    protected errorMessage: string;
    protected success: boolean = false;
    protected successMessage: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        public themeService: CustomizerSettingsService,
        public dialog: MatDialog,
        private clientService: ClientService,
    ) {
    }

    ngOnInit(): void {
        this.clientService.getAll().subscribe(data => {
            this.dataSource.data = data;
            this.getTotalClient();
            this.getQtdRegulares();
            this.getQtdInadimplente();
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openClientCreateDialog(): void {
        const dialogRef = this.dialog.open(ClientCreateDialog, {
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result: Client) => {
            if(result) {
                this.dataSource.data.push(result);
                console.log(result.clientId)
                this.successAlert(`Cliente '${result.name}' criada com sucesso!`);
            } else if(result != undefined) {
                this.errorAlert('Erro ao criar um novo cliente');
            }
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
                instagram: client.instagram,
            },
            width: '600px',
        });

        dialogRef.afterClosed().subscribe((result: Client) => {
            if(result) {
                const index = this.dataSource.data.findIndex(c => c.clientId === result.clientId);
                if(index !== -1) {
                    this.dataSource.data[index] = result;
                    this.dataSource.data = [...this.dataSource.data];
                    this.successAlert(`Cliente '${client.name}' editada com sucesso`);
                }
            } else if(result != undefined) {
                this.errorAlert('Erro ao editar categoria');
            }
        });
    }

    openClientDeleteDialog(client: Client): void {
        const dialogRef = this.dialog.open(ClientDeleteDialog, {
            data: {
                clientId: client.clientId,
                name: client.name,
                address: client.address,
                status: client.status,
                phone: client.phone,
                whatsapp: client.whatsapp,
                instagram: client.instagram,
            },
            width: '500px',
        });

        dialogRef.afterClosed().subscribe((result: string) => {
            if(result === 'deleted') {
                this.dataSource.data = this.dataSource.data.filter(item => item.clientId !== client.clientId);
                this.successAlert(`Cliente '${client.name}' deletado com sucesso`);
            } else if(result != undefined) {
                this.errorAlert('Erro ao deletar cliente');
            }
        });
    }

    getTotalClient() {
        this.totalClient = this.dataSource.filteredData.filter((client: Client) => client.status !== 'INATIVO').length;
    }

    getQtdRegulares() {
        this.qtdRegulares = this.dataSource.filteredData.filter((client: Client) => client.status === 'REGULAR').length;
    }

    getQtdInadimplente() {
        this.qtdInadimplente = this.dataSource.filteredData.filter((client: Client) => client.status === 'INADIMPLENTE').length;
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
