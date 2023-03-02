import { LoadPokemonService } from './../services/load-pokemon.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Output,Input } from '@angular/core';

@Component({
  selector: 'app-mat-tab-group',
  templateUrl: './mat-tab-group.component.html',
  styleUrls: ['./mat-tab-group.component.scss']
})
export class MatTabGroupComponent {

  @Input() pokeIndex:number | undefined;
  constructor(private loadPokemonService:LoadPokemonService){

  }
  lotsOfTabs = new Array(100).fill(0).map((_, index) => `${index+1}`);


    goToPoke(pokemon:any){
      if (pokemon.srcElement.outerText>0){
        this.loadPokemonService.redirecionaPoke(pokemon.srcElement.outerText);
      } else return

  }


}
