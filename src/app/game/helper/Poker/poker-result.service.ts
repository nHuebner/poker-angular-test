import {Injectable} from "@angular/core";

import {Card} from '../Card/card.interface';
import {PokerHand} from './poker-hand.interface';

// ranks by value
const _ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k', 'a'];

@Injectable()
export class PokerResultService {
    /**
     * Returns PokerHand with orderd best hands its name and its value
     *
     * @param allCards
     * @returns {PokerHand}
     */
    score(...allCards: Card[][]): PokerHand {
        let best: PokerHand, hands: Card[];

        // return the best poker hand from a set or sets of hands
        hands = this._findBest(allCards);

        // start empty
        best = this._result(hands);

        // find best hand
        for (let combination of this._combinations(hands, 5)) {
            // calculate value of 5 hands
            let result = this._determine(combination);
            if (result.value > best.value)
                best = result;
        }

        // finish with best result
        return best;
    }

    /**
     * Internal function to return best hand of all combinations
     *
     * @param allHands
     * @returns {Card[]}
     * @private
     */
    _findBest(allHands: Card[][]): Card[] {
        // concatenate
        let hands: Card[] = [].concat.apply([], allHands);

        // valid rank and suit
        hands = hands.filter((hand) => {
            return !!(_ranks.indexOf(hand.rank) > -1 && hand.suit);
        });

        return hands;
    }

    /**
     * Internal function to create and return valid hands
     *
     * @param hands
     * @param minSize {number} - minimal cards per hand
     * @returns {any}
     * @private
     */
    _combinations(hands: Card[], minSize: number): Card[][] {
        // card combinations with the given size
        let result: Card[][] = [];

        // not enough hands
        if (minSize > hands.length)
            return result;

        // one group
        if (minSize == hands.length)
            return [hands];

        // one card in each minSize
        if (minSize == 1)
            return hands.map((card) => [card]);

        // everything else
        for (let i = 0; i < hands.length - minSize; i++) {
            let head = hands.slice(i, (i + 1));
            let tails = this._combinations(hands.slice(i + 1), (minSize - 1));
            for (let tail of tails) {
                result.push(head.concat(tail));
            }
        }

        return result;
    }

    /**
     * Internal function to checks hands and orders by "value"
     * and returns a organized hand
     *
     * @param hands
     * @returns {Card[][]}
     * @private
     */
    _ranked(hands: Card[]): Card[][] {

        let result: Card[][] = [];

        // split hands by rank
        for (let hand of hands) {
            let r = _ranks.indexOf(hand.rank);
            result[r] = result[r] || [];
            result[r].push(hand);
        }

        // pack cards
        result = result.filter((rank) => !!rank);

        // Reverse to get (if necessary) high card
        result.reverse();

        // order to get pairs or sets at start
        result.sort((a, b) => {
            return a.length > b.length ? -1 : a.length < b.length ? 1 : 0;
        });

        return result;
    }

    /**
     * Internal function to check if current hand is a straight
     *
     * @param ranked
     * @returns {boolean}
     * @private
     */
    _isStraight(ranked: Card[][]): boolean {
        // all cards have to be different
        let r1, r4: number;
        if (!ranked[4])
            return false;

        // determine if wheel, if wheel - ace is low
        if (ranked[0][0].rank == 'a' && ranked[1][0].rank == '5' && ranked[4][0].rank == '2') {
            // it's a low straight, switch positions of ace
            ranked.push(ranked.shift());
            // ace is now low
            return true;
        }

        // if all 5 different are in row it's a straight
        r1 = _ranks.indexOf(ranked[0][0].rank);
        r4 = _ranks.indexOf(ranked[4][0].rank);
        return (r1 - r4) == 4;
    }

    /**
     * Internal function to check if current Hand is a Flush
     *
     * @param hands
     * @returns {boolean}
     * @private
     */
    _isFlush(hands: Card[]): boolean {
        // for a flush all cards have to be of the same suit
        let suit = hands[0].suit; // base test suit

        for (let card of hands) {
            if (card.suit != suit)
                return false;
        }

        return true;
    }

    /**
     * Internal function to determine the current value of the hand.
     * Value is to make it possible to get a "winner" by comparing to hands.
     *
     * @param ranked
     * @param primary
     * @returns {number}
     * @private
     */
    _value(ranked: Card[][], primary: number): number {
        // primary wins the rest are kickers
        let valueString = '', _rank: number, _value: any;

        for (let rank of ranked) {
            // build value for current Rank
            _rank = _ranks.indexOf(rank[0].rank);
            _value = (_rank < 10 ? '0' : '') + _rank;

            // Build full value string
            for (let i = 0; i < rank.length; i++) {
                valueString += _value;
            }
        }

        // to integer
        return (primary * 10000000000) + parseInt(valueString);
    }

    /**
     * Internal function to create a accessible result
     *
     * @param hands
     * @param name
     * @param value
     * @returns {{hands: Hand[], name: (string|string), value: number}}
     * @private
     */
    _result(hands: Card[], name?: string, value?: number): PokerHand {
        return {
            hands: hands,
            name: name || 'invalid',
            value: value || 0
        };
    }

    /**
     * Internal function to determine the current valid Hand
     *
     * @param hands
     * @returns {PokerHand}
     * @private
     */
    _determine(hands: Card[]): PokerHand {
        // determine value of hand

        // Results in ranking order
        const handResults: string[] = ['Royal Flush', 'Straight Flush', 'Four of a kind', 'Full House', 'Flush', 'Straight', 'Three of a kind', 'Two Pairs', 'One Pair', 'High Card'];

        let ranked: Card[][] = this._ranked(hands);
        let isFlush = this._isFlush(hands);
        let isStraight = this._isStraight(ranked);

        if (isStraight && isFlush && ranked[0][0].rank == 'a')
            return this._result(hands, handResults[0], this._value(ranked, 9));

        else if (isStraight && isFlush)
            return this._result(hands, handResults[1], this._value(ranked, 8));

        else if (ranked[0].length == 4)
            return this._result(hands, handResults[2], this._value(ranked, 7));

        else if (ranked[0].length == 3 && ranked[1].length == 2)
            return this._result(hands, handResults[3], this._value(ranked, 6));

        else if (isFlush)
            return this._result(hands, handResults[4], this._value(ranked, 5));

        else if (isStraight)
            return this._result(hands, handResults[5], this._value(ranked, 4));

        else if (ranked[0].length == 3)
            return this._result(hands, handResults[6], this._value(ranked, 3));

        else if (ranked[0].length == 2 && ranked[1].length == 2)
            return this._result(hands, handResults[7], this._value(ranked, 2));

        else if (ranked[0].length == 2)
            return this._result(hands, handResults[8], this._value(ranked, 1));

        else
            return this._result(hands, handResults[9], this._value(ranked, 0));

    }
}
