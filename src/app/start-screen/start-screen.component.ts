import { Component } from '@angular/core';
import { Firestore, addDoc, collection} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from '../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) { }


  async newGame(){
    let game = new Game();

    addDoc(collection(this.firestore, 'games'), game.toJSON()).then(
      (gameInfo) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      }
    ).catch((error) => {console.error(error)});

  }

}
