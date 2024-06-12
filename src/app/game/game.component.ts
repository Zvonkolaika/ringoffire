import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, doc, collection, collectionData, onSnapshot, setDoc, deleteDoc, addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MobilePlayerComponent } from '../mobile-player/mobile-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgStyle, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule, MobilePlayerComponent, EditPlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  gameId!: string;
  game!: Game;
  gameInfo: any;

  firestore: Firestore = inject(Firestore);

  unsubList! : any;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

    this.game = new Game();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log('Params: ', params);
    });
    this.unsubList = onSnapshot(this.getSingleGameRef('games', this.gameId), (data) => {
      console.log('data:', data.data());
      this.game.currentPlayer = data.get('currentPlayer');
      this.game.players = data.get('players');
      this.game.player_images = data.get('player_images');
      this.game.playedCards = data.get('playedCards');
      this.game.stack = data.get('stack');
      this.game.pickCardAnimation = data.get('pickCardAnimation');
      this.game.currentCard = data.get('currentCard');

      console.log('game:', this.game);
    });
  }

  // getCollectionData

  async ngOnDestroy(){
    this.unsubList();
  }

  getGameRef(){
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colID: string, id: string){
    return doc(collection(this.firestore, colID), id);
  }

  saveGame(){
    setDoc(this.getSingleGameRef('games', this.gameId), this.game.toJSON()).catch((error) => {console.log(error)});
  }


  async takeCard(){
    if(!this.game.pickCardAnimation){
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      console.log('New Card ' + this.game.currentCard);
      console.log('Game is ', this.game);
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(async() => {
        this.game.playedCards.push(this.game.currentCard as string);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  editPlayer(playerID: number){
    console.log('Edit Player', playerID);
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((picture: string) => {
      console.log('Recieved change', picture);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0){
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }
}
