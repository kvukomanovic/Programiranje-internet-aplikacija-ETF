import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { LogiComponent } from './logi/logi.component';
import { PocetnaKorisnikComponent } from './pocetna-korisnik/pocetna-korisnik.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ZaduzeneComponent } from './zaduzene/zaduzene.component';

const routes: Routes = [
  {path:"app",component:AppComponent},
  {path:"",component:PocetnaComponent},
  {path:"login",component:LogiComponent},
  {path:"search",component:SearchComponent},
  {path:"detalji",component:DetaljiComponent},
  {path:"pocetnaKorisnik",component:PocetnaKorisnikComponent},
  {path:"profile",component:ProfileComponent},
  {path:"zaduzene",component:ZaduzeneComponent},
  {path:"istorija",component:IstorijaComponent},
  {path:"dodajKnjigu",component:DodajKnjiguComponent},
  {path:"**",component:PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
