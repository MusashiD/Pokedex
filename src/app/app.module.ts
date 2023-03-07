import { RouterModule } from '@angular/router';
import { LoadPokemonService } from './services/load-pokemon.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonAboutComponent } from './pokemon-about/pokemon-about.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabStatsComponent } from './tab-stats/tab-stats.component';
import { MatTabGroupComponent } from './mat-tab-group/mat-tab-group.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PokeStatusComponent } from './poke-status/poke-status.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    PokemonCardComponent,
    PokemonAboutComponent,
    TabStatsComponent,
    MatTabGroupComponent,
    PokeStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    RouterModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatProgressBarModule
  ],
  providers: [LoadPokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
