import {BrowserModule} from '@angular/platform-browser';
import {NgModule, enableProdMode} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {GameComponent} from './game.component';

enableProdMode();

@NgModule({
    declarations: [
        GameComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [],
        bootstrap: [GameComponent]
})
export class GameModule {
}
