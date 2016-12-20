import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { CreateComponent } from './create/create.component';
import { PartyComponent } from './party/party.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { ValuesPipe } from './values.pipe';

import { UserService } from './user.service';
import { UserComponent } from './user/user.component';

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
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
