import { LoadPokemonService } from './../services/load-pokemon.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {getColorFromURL} from 'color-thief-node';
import * as ColorThief from 'color-thief-node';
import { bindCallback } from 'rxjs';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-pokemon-about',
  templateUrl: './pokemon-about.component.html',
  styleUrls: ['./pokemon-about.component.scss']
})

export class PokemonAboutComponent implements OnInit {
  pokemon:any = {}
  pokemonBySpecie:any = {};
  backgroundImageColor:any;
  constructor(private route: ActivatedRoute,
    private loadPokemon : LoadPokemonService,
    private cdr:  ChangeDetectorRef,
    private router: Router ) { }


  ngOnInit() {
    const pokemonName = this.route.snapshot.params['pokemon'];
    this.getPokemon(pokemonName)
  }


  getPokemon(pokemonName:string){
    this.loadPokemon.getPokemon(pokemonName).subscribe({
      next: (res) =>{
        this.pokemon = res;
        this.getPokemonSpecie(pokemonName);
      },
      error: (error) => {
        console.log(error);
      }
  });
  }

  getPokemonSpecie(pokemonName:String) {
    this.loadPokemon.getPokemonSpecie(pokemonName).subscribe({
      next: (res) =>{
        this.pokemonBySpecie = res;
        this.getBackgroundImage()
      },
      error: (error) => {
        console.log(error);
      }
  });
    }

    getAbility(arg0: any) {
      console.log("entrou1")
            }

      getGeneration(arg0: any) {
        console.log("entrou@")
      }

      getImage(){
        console.log(this.pokemon.sprites.other['official-artwork'].front_default
        )
        return this.pokemon.sprites.other['official-artwork'].front_default

      }

      async getBackgroundImage() {
          if(this.pokemonBySpecie.pokedex_numbers[0].entry_number <10){
            const dominantColor = await getColorFromURL(`./assets/pokeImages/00${this.pokemonBySpecie.pokedex_numbers[0].entry_number} ${this.capitalizeFirstLetter(this.pokemon.name)}.png`);
             this.backgroundImageColor = `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`;
          } else if(this.pokemonBySpecie.pokedex_numbers[0].entry_number >= 10 && this.pokemonBySpecie.pokedex_numbers[0].entry_number < 100){
            const dominantColor = await getColorFromURL(`./assets/pokeImages/0${this.pokemonBySpecie.pokedex_numbers[0].entry_number} ${this.capitalizeFirstLetter(this.pokemon.name)}.png`);
             this.backgroundImageColor = `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`;
          } else {
            const dominantColor = await getColorFromURL(`./assets/pokeImages/${this.pokemonBySpecie.pokedex_numbers[0].entry_number} ${this.capitalizeFirstLetter(this.pokemon.name)}.png`);
             this.backgroundImageColor = `rgb(${dominantColor[0]},${dominantColor[1]},${dominantColor[2]})`;
          }
            return this.backgroundImageColor

          }

      capitalizeFirstLetter(str:string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
  getAbout(){
    const entry = this.pokemonBySpecie.flavor_text_entries.filter((entry: { language: { name: string; }; version: { name: string; }; }) => {
      return entry.language.name === 'en' && entry.version.name === 'x';
    }).find(() => true);

    const flavorText = entry ? entry.flavor_text : '';
    return flavorText;
  }


  findJpName(){
    const entry = this.pokemonBySpecie.names.filter((entry:any) => {
      return entry.language.name === 'ja';
    }).find(() => true);

    const jpName = entry ? entry.name: '';
    return jpName;
  }

}
