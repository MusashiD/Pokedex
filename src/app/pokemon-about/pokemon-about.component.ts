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
  pokeChain:any;
  pokeByChain: any = [];
  pokeByChainSpecies: any = []; 
  arrayDamage:any = [];
  img0:any = []
  img025:any = []
  img05:any = []
  img2:any = []
  img4:any = []

  names:any = [];

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
        this.getTypingRelation();
        this.getPokemonSpecie(pokemonName);
      },
      error: (error) => {
        console.log(error);
      }
  });
  }

   getPokemonSpecie(pokemonName:String) {
    this.loadPokemon.getPokemonSpecie(pokemonName).subscribe({
      next: async (res) =>{
        this.pokemonBySpecie = res;       
        this.pokeChain = await this.loadPokemon.getEvolutionChain(this.pokemonBySpecie);
        this.pokeSpecieEvo()
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

  pokeSpecieEvo(){
    for (let poke of this.pokeChain){
      this.loadPokemon.getPokemonSpecie(poke).subscribe(
        {
          next :(res:any) =>{
            this.pokeByChainSpecies.push(res);
          }
        }
      )

      this.loadPokemon.getPokemon(poke).subscribe(
        {
          next :(resposta:any) =>{
            this.pokeByChain.push(resposta);
          }
        }
      )
    }
  }

  callImg(pokeImg:any){
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokeImg.pokedex_numbers[0].entry_number}.gif`
  }

  verificaSeta(i:number,pokedex_numbers:number){
    if(i<pokedex_numbers){
      return true
    }
    return false;
  }

  goToPage(index:string){
    this.loadPokemon.redirecionaPoke(index);

  }

  async getTypingRelation(){
    let type1 : any;
    let type2: any;
      
       type1 = await this.loadPokemon.getTypingMultiplier(this.pokemon.types[0].type.url);

       if(!!this.pokemon.types[1]){
        type2 = await this.loadPokemon.getTypingMultiplier(this.pokemon.types[1].type.url);
       }
      

        Object.keys(type1).map(key => {
        if (key == 'double_damage_from'){
          for(let damage of type1[key])
          {
            let index = this.arrayDamage.findIndex((item:any) => item.name === damage.name)
            if (index!= -1){
              this.arrayDamage[index].value = this.arrayDamage[index].value * 2;
            } else{
              damage = {name: damage.name,value:2}
              this.arrayDamage.push(damage);
            }
           
          }

        }

        if (key == 'half_damage_from' ){
          for(let damage of type1[key])
          {
            let index = this.arrayDamage.findIndex((item:any) => item.name === damage.name)
            if (index!= -1){
              this.arrayDamage[index].value = this.arrayDamage[index].value * 0.5;
            } else{
              damage = {name: damage.name,value:0.5}
              this.arrayDamage.push(damage);
            }
           
          }
        }
        if (key == 'no_damage_from' ){
             
          for(let damage of type1[key])
          {
            let index = this.arrayDamage.findIndex((item:any) => item.name === damage.name)
            if (index!= -1){
              this.arrayDamage[index].value = this.arrayDamage[index].value * 0;
            } else{
              damage = {name: damage.name,value:0}
              this.arrayDamage.push(damage);
            }
           
          }

        }
      })
     
      if (!!type2){
        
      Object.keys(type2).map(key => {
        if (key == 'double_damage_from'){
          for(let damage of type2[key])
          {
            let index = this.arrayDamage.findIndex((item:any) => item.name === damage.name)
            if (index!= -1){
              this.arrayDamage[index].value = this.arrayDamage[index].value * 2;
            } else{
              damage = {name: damage.name,value:2}
              this.arrayDamage.push(damage);
            }
           
          }

        }

        if (key == 'half_damage_from' ){
          for(let damage of type2[key])
          {
            let index = this.arrayDamage.findIndex((item:any) => item.name === damage.name)
            if (index!= -1){
              this.arrayDamage[index].value = this.arrayDamage[index].value * 0.5;
            } else{
              damage = {name: damage.name,value:0.5}
              this.arrayDamage.push(damage);
            }
           
          }
        }
        if (key == 'no_damage_from' ){
             
          for(let damage of type2[key])
          {
            let index = this.arrayDamage.findIndex((item:any) => item.name === damage.name)
            if (index!= -1){
              this.arrayDamage[index].value = this.arrayDamage[index].value * 0;
            } else{
              damage = {name: damage.name,value:0}
              this.arrayDamage.push(damage);
            }
           
          }

        }
      })
      }
       console.log(this.arrayDamage);
       this.getImg0()
       this.getImg025()
       this.getImg05()
       this.getImg2()
       this.getImg4()

    
  }

    getImg0(){
      for (let i = 0; i < this.arrayDamage.length; i++) {
        if (this.arrayDamage[i].value == 0) {
          this.img0[i] = `./assets/typesCircle/${this.arrayDamage[i].name}.png`;
        }
    }
  }
    getImg025(){
      for (let i = 0; i < this.arrayDamage.length; i++) {
        if (this.arrayDamage[i].value == 0.25) {
          this.img025[i] = `./assets/typesCircle/${this.arrayDamage[i].name}.png`;
        }
    }
  }

    getImg05(){
      for (let i = 0; i < this.arrayDamage.length; i++) {
        if (this.arrayDamage[i].value == 0.5) {
          this.img05[i] = `./assets/typesCircle/${this.arrayDamage[i].name}.png`;
        }
      }
    }

    getImg2(){
      for (let i = 0; i < this.arrayDamage.length; i++) {
        if (this.arrayDamage[i].value == 2) {
          this.img2[i] = `./assets/typesCircle/${this.arrayDamage[i].name}.png`;
        }
      }
    }
    getImg4(){
      for (let i = 0; i < this.arrayDamage.length; i++) {
        if (this.arrayDamage[i].value == 4) {
          this.img4[i] = `./assets/typesCircle/${this.arrayDamage[i].name}.png`;
        }
      }
    }
      
      
}
