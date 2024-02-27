import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgStyle, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  currentCard: string | undefined = '';
  pickCardAnimation = false;
  game: Game;
  

  constructor(public dialog: MatDialog) {
    this.game = new Game();
    this.newGame();
    //console.log(this.game);
   }

  newGame(){
    //this.newGame();
    //console.log(this.game);
  }

  takeCard(){
    if(!this.pickCardAnimation){
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;
      console.log('New Card ' + this.currentCard);
      console.log('Game is ', this.game);

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard as string);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
      }
    });
  }
}
