/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {GameComponent} from './game.component';

describe('GameComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameComponent
            ],
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        expect(game).toBeTruthy();
    }));

    it('shouldn\'t have Elements in Players ', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        expect(game.players.length).toEqual(0);
    }));

    it('should create the Standard Player', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        game.createStandardPlayer();
        expect(game.players[0].name).toEqual('Player 1');
    }));

    it('should create the Deck', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        game.createDeck(true);
        expect(game.deckService.count()).toEqual(52);
    }));

    it('should have "as" as first Card in Deck ', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        game.createDeck(true);
        expect(game.deckService.cards[0]).toEqual({suit: 's', rank: 'a'});
    }));
});
