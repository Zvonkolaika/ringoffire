import { NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Game } from '../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, doc, collectionData, onSnapshot, addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { MobilePlayerComponent } from '../mobile-player/mobile-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgStyle, PlayerComponent, GameInfoComponent, MatButtonModule, MatIconModule, MobilePlayerComponent, EditPlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  currentCard: string | undefined = '';
  pickCardAnimation = false;
  game: Game;
  
  firestore: Firestore = inject(Firestore);

  //items$;
  //items;

  unsubList;
  //unsubSingle;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
    this.game = new Game();
   // this.newGame();
    this.route.params.subscribe((params) => {
      console.log('Params: ', params);
    });

  this.unsubList = onSnapshot(this.getGameRef(), (data) => {
    data.forEach((element) => {
    console.log(element.data());
     });
    });

   // this.addGame(this.game.toJSON());
    //this.unsubSingle = onSnapshot(this.getSingleGameRef("games", "id"), (data) => {
      //console.log(data);
    //});
    // this.items$ = collectionData(this.getGameRef());
    // this.items = this.items$.subscribe( (data) => {
    //   data.forEach((element) => {
    //    console.log(element);
    //  });
    // })
    // this.items.unsubscribe();
  }

  async newGame(){

    let gameInfo = await addDoc(this.getGameRef(), this.game.toJSON()).catch((error) => {console.error(error)});
    console.log('GameInfo: ', gameInfo);
  
    //this.newGame();
    //console.log(this.game);
  }

  // async addGame(item: {}){
  //   await addDoc(this.getGameRef(), item).catch((error) => {console.error(error)}
  //   ).then((docRef) => {console.log('Document written with ID: ', docRef?.id)});
  // }

  ngOnDestroy(){
  this.unsubList();
   // this.unsubSingle();
  }
    
  //const itemCollection = collection(this.firestore, 'items');
  getGameRef(){
    return collection(this.firestore, 'games');
  }

  getSingleGameRef(colID: string, id: string){
    return doc(collection(this.firestore, colID), id);
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
      }
    });
  }
}
