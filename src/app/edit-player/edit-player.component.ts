import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatDialog, MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [MatButtonModule, NgStyle, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  allProfilePictures = ['1.webp', '2.png', 'goat.png', 'hippo.svg', 'glasses.jpg!d', 'hair.jpg!d'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) {}
}
