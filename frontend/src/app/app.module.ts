import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { HttpClientModule } from '@angular/common/http';
import { LogiComponent } from './logi/logi.component'
import { EventEmmiterService } from './event-emmiter.service';
import { SearchComponent } from './search/search.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { PocetnaKorisnikComponent } from './pocetna-korisnik/pocetna-korisnik.component';
import { ProfileComponent } from './profile/profile.component';
import { ZaduzeneComponent } from './zaduzene/zaduzene.component';
import { IstorijaComponent } from './istorija/istorija.component';
import { MatSortModule } from '@angular/material/sort'
import { MatSort, Sort } from '@angular/material/sort'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DodajKnjiguComponent } from './dodaj-knjigu/dodaj-knjigu.component';
import { AdminComponent } from './admin/admin.component';
import { SviKorisniciComponent } from './svi-korisnici/svi-korisnici.component';
import { ZahtevZaKnjiguComponent } from './zahtev-za-knjigu/zahtev-za-knjigu.component';
import { PregledZahtevaZaKnjigomComponent } from './pregled-zahteva-za-knjigom/pregled-zahteva-za-knjigom.component'
import { CanvasJSChart } from 'src/assets/canvasjs.angular.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    LogiComponent,
    SearchComponent,
    DetaljiComponent,
    PocetnaKorisnikComponent,
    ProfileComponent,
    ZaduzeneComponent,
    IstorijaComponent,
    DodajKnjiguComponent,
    AdminComponent,
    SviKorisniciComponent,
    ZahtevZaKnjiguComponent,
    PregledZahtevaZaKnjigomComponent,
    CanvasJSChart
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatSortModule,
    BrowserAnimationsModule

  ],
  providers: [EventEmmiterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
