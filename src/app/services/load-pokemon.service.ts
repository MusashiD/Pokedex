import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoadPokemonService {
  pokemons: any = [];
  constructor(private http: HttpClient) {
   }

   async getPokemons(length:any,start:any) {
    if(start < 400){
      const res: any = await this.http.get(`https://pokeapi.co/api/v2/pokemon?limit=${length}&offset=${start}`).toPromise();
      res.results.forEach((element: any) => {
       this.pokemons.push(element.name);
      });

    }

    return this.pokemons;
    }

    getPokemon(pokeName:String){
      return this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
    }

    getPokemonSpecie(pokeName:String){
      return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeName}`)
    }

}
