/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {GameComponent} from '../../game.component';
import {Card} from '../Card/card.interface';

const cards = {
    'as': {suit: 's', rank: 'a'},
    'ac': {suit: 'c', rank: 'a'},
    'ah': {suit: 'h', rank: 'a'},
    'ad': {suit: 'd', rank: 'a'},
    'ks': {suit: 's', rank: 'k'},
    'kc': {suit: 'c', rank: 'k'},
    'kh': {suit: 'h', rank: 'k'},
    'kd': {suit: 'd', rank: 'k'},
    'qs': {suit: 's', rank: 'q'},
    'qc': {suit: 'c', rank: 'q'},
    'qh': {suit: 'h', rank: 'q'},
    'qd': {suit: 'd', rank: 'q'},
    'js': {suit: 's', rank: 'j'},
    'jc': {suit: 'c', rank: 'j'},
    'jh': {suit: 'h', rank: 'j'},
    'jd': {suit: 'd', rank: 'j'},
    '10s': {suit: 's', rank: '10'},
    '10c': {suit: 'c', rank: '10'},
    '10h': {suit: 'h', rank: '10'},
    '10d': {suit: 'd', rank: '10'},
    '9s': {suit: 's', rank: '9'},
    '9c': {suit: 'c', rank: '9'},
    '9h': {suit: 'h', rank: '9'},
    '9d': {suit: 'd', rank: '9'},
    '8s': {suit: 's', rank: '8'},
    '8c': {suit: 'c', rank: '8'},
    '8h': {suit: 'h', rank: '8'},
    '8d': {suit: 'd', rank: '8'},
    '7s': {suit: 's', rank: '7'},
    '7c': {suit: 'c', rank: '7'},
    '7h': {suit: 'h', rank: '7'},
    '7d': {suit: 'd', rank: '7'},
    '6s': {suit: 's', rank: '6'},
    '6c': {suit: 'c', rank: '6'},
    '6h': {suit: 'h', rank: '6'},
    '6d': {suit: 'd', rank: '6'},
    '5s': {suit: 's', rank: '5'},
    '5c': {suit: 'c', rank: '5'},
    '5h': {suit: 'h', rank: '5'},
    '5d': {suit: 'd', rank: '5'},
    '4s': {suit: 's', rank: '4'},
    '4c': {suit: 'c', rank: '4'},
    '4h': {suit: 'h', rank: '4'},
    '4d': {suit: 'd', rank: '4'},
    '3s': {suit: 's', rank: '3'},
    '3c': {suit: 'c', rank: '3'},
    '3h': {suit: 'h', rank: '3'},
    '3d': {suit: 'd', rank: '3'},
    '2s': {suit: 's', rank: '2'},
    '2c': {suit: 'c', rank: '2'},
    '2h': {suit: 'h', rank: '2'},
    '2d': {suit: 'd', rank: '2'},
};

const hands = {
    'Royal Flush': [
        [cards['as'], cards['ks'], cards['qs'], cards['js'], cards['10s']],
        [cards['ad'], cards['kd'], cards['qd'], cards['jd'], cards['10d']],
    ],
    'Straight Flush': [
        [cards['kh'], cards['qh'], cards['jh'], cards['10h'], cards['9h']],
        [cards['10d'], cards['7d'], cards['9d'], cards['8d'], cards['6d']]
    ],
    'Four of a kind': [
        [cards['ah'], cards['ad'], cards['ac'], cards['as'], cards['2d']],
        [cards['4h'], cards['3h'], cards['4s'], cards['4d'], cards['4c']]
    ],
    'Full House': [
        [cards['ah'], cards['ad'], cards['ac'], cards['kd'], cards['ks']],
        [cards['4s'], cards['jh'], cards['4h'], cards['jd'], cards['js']]
    ],
    'Flush': [
        [cards['as'], cards['qs'], cards['10s'], cards['7s'], cards['2s']],
        [cards['jd'], cards['2d'], cards['ad'], cards['qd'], cards['8d']],
        [cards['10c'], cards['7c'], cards['kc'], cards['9c'], cards['8c']]
    ],
    'Straight': [
        [cards['qd'], cards['jh'], cards['10h'], cards['9h'], cards['8d']],
        [cards['5d'], cards['6d'], cards['9c'], cards['7s'], cards['8d']],
        [cards['ah'], cards['2h'], cards['3h'], cards['4s'], cards['5s']]
    ],
    'Three of a kind': [
        [cards['7h'], cards['7d'], cards['7c'], cards['ah'], cards['5h']],
        [cards['9h'], cards['9s'], cards['9d'], cards['5s'], cards['kd']]
    ],
    'Two Pairs': [
        [cards['7h'], cards['7d'], cards['5h'], cards['5c'], cards['ah']],
        [cards['ah'], cards['5s'], cards['ad'], cards['9d'], cards['9s']]
    ],
    'One Pair': [
        [cards['5h'], cards['5c'], cards['9h'], cards['kd'], cards['ah']],
        [cards['6d'], cards['qd'], cards['5c'], cards['qh'], cards['ah']]
    ],
    'High Card': [
        [cards['kh'], cards['jh'], cards['9d'], cards['7c'], cards['5c']],
        [cards['jh'], cards['qd'], cards['7h'], cards['5s'], cards['9d']]
    ],
};

describe('Poker Result Service general', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameComponent
            ],
        });
        TestBed.compileComponents();
    });

    it('should have the result names equal to "hands" keys', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;

        for (let name of Object.keys(hands)) {
            for (let i = 0; i < hands[name].length; i++) {
                let hand = game.pokerResultService.score(hands[name][i]);
                expect(hand.name).toEqual(name);
            }
        }
    }));

    it('should be invalid', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        const hand = game.pokerResultService.score([cards['7h'], cards['5c']]);

        expect(hand.name).toEqual('invalid');
        expect(hand.value).toEqual(0);
    }));
});


describe('Poker Result Service scenarios', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameComponent
            ],
        });
        TestBed.compileComponents();
    });

    it('should be king higher than queen', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        let win = game.pokerResultService.score(hands['High Card'][0]).value,
            lose = game.pokerResultService.score(hands['High Card'][1]).value;

        expect(win).toBeGreaterThan(lose);
        expect(lose).toBeLessThan(win);
    }));

    it('should be high card 10 better than hight card 5', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;
        let current = hands['Four of a kind'][1],
            win = game.pokerResultService.score(current.concat([cards['10h'], cards['3h']])).value,
            lose = game.pokerResultService.score(current.concat([cards['5h'], cards['3d']])).value;

        expect(win).toBeGreaterThan(lose);
    }));

    it('should be two pairs higher than one pair', async(() => {
        const fixture = TestBed.createComponent(GameComponent);
        const game = fixture.debugElement.componentInstance;

        let win = game.pokerResultService.score(hands['Two Pairs'][0]).value,
            lose = game.pokerResultService.score(hands['One Pair'][0]).value;

        expect(win).toBeGreaterThan(lose);
    }));
});
