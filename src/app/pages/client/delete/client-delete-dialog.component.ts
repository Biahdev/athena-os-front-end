import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ClientService} from "../../../services/client.service";
import {Client} from "../../../types/Client";

@Component({
    selector: 'client-delete-dialog',
    templateUrl: 'client-delete-dialog.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ]
})
export class ClientDeleteDialog {

    constructor(
        public dialogRef: MatDialogRef<ClientDeleteDialog>,
        private clientService: ClientService,
        @Inject(MAT_DIALOG_DATA) protected data: Client,
    ) {
    }

    onNoClick(event: Event): void {
        event.preventDefault();
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.clientService.delete(this.data.clientId).subscribe(data => {
            this.dialogRef.close('deleted');
        });
    }


}
