import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { LogiComponent } from './logi/logi.component';
import { PocetnaKorisnikComponent } from './pocetna-korisnik/pocetna-korisnik.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PregledZahtevaZaKnjigomComponent } from './pregled-zahteva-za-knjigom/pregled-zahteva-za-knjigom.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { ZaduzeneComponent } from './zaduzene/zaduzene.component';
import { ZahtevZaKnjiguComponent } from './zahtev-za-knjigu/zahtev-za-knjigu.component';

const routes: Routes = [
  {path:"",component:PocetnaComponent},
  {path:"login",component:LogiComponent},
  {path:"search",component:SearchComponent},
  {path:"detalji",component:DetaljiComponent},
  {path:"pocetnaKorisnik",component:PocetnaKorisnikComponent},
  {path:"profile",component:ProfileComponent},
  {path:"zaduzene",component:ZaduzeneComponent},
  {path:"istorija",component:IstorijaComponent},
  {path:"dodajKnjigu",component:DodajKnjiguComponent},
  {path:"admin",component:AdminComponent},
  {path:"sviKorisnici",component:SviKorisniciComponent},
  {path:"zahtevZaKnjigu",component:ZahtevZaKnjiguComponent},
  {path:"pregledZahtevaZaKnjigu",component:PregledZahtevaZaKnjigomComponent},
  {path:"**",component:PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
