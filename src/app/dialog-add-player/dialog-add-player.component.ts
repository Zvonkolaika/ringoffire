import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog, MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatDialogTitle,
    MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}
  onNoClick(){
    this.dialogRef.close();
  }

}
