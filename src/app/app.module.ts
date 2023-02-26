import { RouterModule } from '@angular/router';
import { LoadPokemonService } from './services/load-pokemon.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonAboutComponent } from './pokemon-about/pokemon-about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PokemonCardComponent,
    PokemonAboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule
  ],
  providers: [LoadPokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
