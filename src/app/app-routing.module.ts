import { HomePageComponent } from './home-page/home-page.component';
import { PokemonAboutComponent } from './pokemon-about/pokemon-about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",
    component:HomePageComponent
  },
  {
    path: ':pokemon',
    component:PokemonAboutComponent
  },
  {
    path:"home",
    component:HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
