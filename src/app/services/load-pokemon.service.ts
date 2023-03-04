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
      if(!!pokeNameIndex){
        let name:String = pokeNameIndex;
        this.router.navigate(['/', name]).then(nav => {
          window.location.reload();
    });;
      }
    }

    async getEvolutionChain(pokemon:any){
      const pokeForms: any = [];
      await this.http.get(pokemon.evolution_chain.url).toPromise().then( (res:any) => {
          pokeForms.push(res.chain.species.name);
          let actualState:any = res.chain.evolves_to;

          while (actualState.length > 0 ){
            for (let state of actualState){
              pokeForms.push(state.species.name);
            actualState = state.evolves_to;
            }
            
          }
          
        }).catch((error) => {
          console.log(error);
        })

      return pokeForms;
    }

    async getTypingMultiplier(type:any){
      let pokeTypes: any ;
      await this.http.get(type).toPromise().then( (res:any) => {
          pokeTypes= res.damage_relations;
          
        }).catch((error) => {
          console.log(error);
        })

      return  await pokeTypes;
    }

}