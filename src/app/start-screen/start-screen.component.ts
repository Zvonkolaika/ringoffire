import { Component } from '@angular/core';
import { addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  
  constructor(private router: Router) { }


  newGame(){
    //Start game
    this.router.navigateByUrl('/game');

  }

}
