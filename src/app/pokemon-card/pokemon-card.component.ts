import { LoadPokemonService } from './../services/load-pokemon.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent {
  @Input() pokemons: any = [];
  sprite:any = [];

  constructor() {
    this.loadSprite();
  }

  loadSprite(length:any = 400){
    for(let i = 1; i<=length ; i++){
      let sprite =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${i}.gif`
      this.sprite.push(sprite);
    }
  }


  playAudio(name: string) {
    let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${name}.mp3`);
    audio.play();
  }



}
