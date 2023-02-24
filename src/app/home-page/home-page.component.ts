import { LoadPokemonService } from './../services/load-pokemon.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  pokemons: any = [];
  sum = 20;

  constructor(private loadPokemon: LoadPokemonService) {
  }

  ngOnInit() {
    this.loadPokemons();
    window.scroll(0, 0);
  }

  async loadPokemons(): Promise<void>{
    this.pokemons = await this.loadPokemon.getPokemons(20, (this.sum-20));
 }

  playAudio(name: string) {
    let audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${name}.mp3`);
    audio.play();
  }

  async  onScroll() {


    this.sum += 20;
    await this.loadPokemons();

  }
}
