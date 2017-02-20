/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {GameComponent} from '../../game.component';

describe('Deck Service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameComponent
            ],
        });
        TestBed.compileComponents();
    });

    it('should create the Deck', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        game.createDeck(true);
        expect(game.deckService.cards.length).toEqual(52);
    }));

    it('should have "as" as first Card in Deck ', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        game.createDeck(true);
        expect(game.deckService.cards[0]).toEqual({suit: 's', rank: 'a'});
    }));

    it('should not have "as" as first Card in Deck ', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        game.createDeck(false);
        expect(game.deckService.cards[0]).not.toEqual({suit: 's', rank: 'a'});
    }));
});
