import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoadPokemonService {
  pokemons: any = [];
  constructor(private http: HttpClient,private router:Router) {
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

    redirecionaPoke(pokeNameIndex:string){
      if(pokeNameIndex.length > 0){
        let name:String = pokeNameIndex;
        this.router.navigate(['/', name]).then(nav => {
          window.location.reload();
    });;
      }
    }

}
