import { Component, Input, OnInit } from '@angular/core';
import { LoadPokemonService } from '../services/load-pokemon.service';

@Component({
  selector: 'app-poke-status',
  templateUrl: './poke-status.component.html',
  styleUrls: ['./poke-status.component.scss']
})
export class PokeStatusComponent implements OnInit {

@Input () pokemon:any;
@Input() color:any;
constructor(private loadPokemon: LoadPokemonService){
  
}

ngOnInit(): void {
}


}
