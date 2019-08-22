import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface DialogData{
    id: string;
}

@Component({
    selector: 'information.popup',
    templateUrl: './information.popup.html',
    styleUrls: ['./information.popup.css']
})

export class InformationPopup{
    id = "";
    constructor(
        public dialogRef: MatDialogRef<InformationPopup>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ){
        this.id = this.data.id;
    }
    deleteUserConfirmed(){
        this.dialogRef.close(this.id);
    }
    cancelar(){
        this.dialogRef.close();
    }
}