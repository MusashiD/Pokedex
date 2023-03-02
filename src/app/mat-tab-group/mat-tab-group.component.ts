import { LoadPokemonService } from './../services/load-pokemon.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mat-tab-group',
  templateUrl: './mat-tab-group.component.html',
  styleUrls: ['./mat-tab-group.component.scss']
})
export class MatTabGroupComponent implements OnInit {
  lotsOfTabs:any;
  @Input() pokeIndex:number | undefined;
  constructor(private loadPokemonService:LoadPokemonService){
  }


  ngOnInit() {
    if(this.pokeIndex){
      this.inicializarTabs(this.pokeIndex);
    }

  }


  inicializarTabs(index: number | undefined): void {
    if (index) {
      const start = Math.max(index - 100, 1);
      const end = Math.min(index + 100, 898);
      this.lotsOfTabs = new Array(end - start + 1).fill(start).map((_, i) => `${start + i}`);
      this.pokeIndex = this.lotsOfTabs.length - 101;
    }

  }

    goToPoke(pokemon:any){
      if (pokemon.srcElement.outerText>0){
        this.loadPokemonService.redirecionaPoke(pokemon.srcElement.outerText);
      } else return

  }


}
