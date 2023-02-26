import { LoadPokemonService } from './../services/load-pokemon.service';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemons: any = [];
  sprite:any = [];

  constructor(private router: Router) {
    this.loadSprite();
  }

  loadSprite(length:any = 400){
    for(let i = 1; i<=length ; i++){
      let sprite =  `https://www.centropkmn.com/pokes/animated/3ds/${i}.gif`
      this.sprite.push(sprite);
    }
  }


  playAudio(name: string) {
    let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${name}.mp3`);
    audio.play();
  }

  openPokemonPage(pokemon:string){
    this.router.navigate(['/', pokemon]);
  }



}
