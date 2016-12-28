import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FIREBASE_PROVIDERS, AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { PartyComponent } from './party/party.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { UserComponent } from './user/user.component';

import { UserService } from './user.service';
import { PartyService } from './party.service';
import { AppStateService } from './app-state.service';
import { RandomService } from './random.service';

import { ValuesPipe } from './values.pipe';
import { OrderByPipe } from './order-by.pipe';
import { UserWelcomeComponent } from './user-welcome/user-welcome.component';

const appRoutes: Routes = [
  { path: 'party/:id', component: PartyComponent },
  { path: '', component: CreateComponent }
];

export const firebaseConfig = {
  apiKey: "AIzaSyCmySpUUIOBGVVl2jg5EqYx2Nm5Dcfd5zA",
  authDomain: "chips-257ca.firebaseapp.com",
  databaseURL: "https://chips-257ca.firebaseio.com",
  storageBucket: "chips-257ca.appspot.com",
  messagingSenderId: "628431259641"
};

@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    PartyComponent,
    CategoryComponent,
    ItemComponent,
    ValuesPipe,
    UserComponent,
    OrderByPipe,
    UserWelcomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    PartyService,
    UserService,
    AppStateService,
    RandomService,
    FIREBASE_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
