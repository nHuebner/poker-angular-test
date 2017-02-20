import {Injectable} from "@angular/core";

import {Card} from '../Card/card.interface';

@Injectable()
export class DeckService {
    deck;
    cards: Card[];

    /**
     * Intialize the suits and ranks for the deck card objects
     */
    constructor() {
        this.deck = {
            suits: ['s', 'h', 'd', 'c'],
            ranks: ['a', 'k', 'q', 'j', '10', '9', '8', '7', '6', '5', '4', '3', '2']
        };
    }

    /**
     * Creates a deck card objects based on the constructed suits and ranks
     */
    createDeck() {
        // Empty the the cards
        this.cards = [];

        for (let suit of this.deck.suits) {
            for (let rank of this.deck.ranks) {
                this.putCard({suit: suit, rank: rank});
            }
        }
    }

    /**
     * Internal function to mix the deck
     */
    shuffle() {
        let currentIndex = this.cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }

    }

    /**
     * Put a card in the deck
     *
     * @param card {Card}
     * @returns {boolean}
     */
    putCard(card: Card): boolean {


        if (card && card.suit && card.rank) {
            this.cards.push(card);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Returns count for the current cards in the deck
     *
     * @returns {number}
     */
    count(): number {
        return this.cards.length;
    }

    /**
     * Get Card from the deck
     *
     * @returns {undefined|Card}
     */
    draw(): Card {
        return this.count() > 0 ? this.cards.shift() : null;
    }
}
