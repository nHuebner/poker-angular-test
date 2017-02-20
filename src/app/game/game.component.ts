import {Component, OnInit} from '@angular/core';

import {PlayerTexas} from './helper/Player/player.model';

import {Card} from "./helper/Card/card.interface";
import {DeckService} from './helper/Deck/deck.service';

import {PokerHand} from "./helper/Poker/poker-hand.interface";
import {PokerResultService} from './helper/Poker/poker-result.service';

@Component({
    selector: 'game-root',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css'],
    providers: [DeckService, PokerResultService]
})

export class GameComponent implements OnInit {

    // Necessary
    players: Array<PlayerTexas> = [];
    community: Array<Card> = [];
    playState: string = 'flop';
    ranking: Array<PlayerTexas> = [];
    communityState: boolean = false;

    // Only for show
    flopCards: Array<Card> = [];
    turnCard: Array<Card> = [];
    riverCard: Array<Card> = [];

    playerSelectActive: boolean = true;

    showFlop: boolean = false;
    showTurn: boolean = false;
    showRiver: boolean = false;
    showPlayerCards: boolean = false;
    rankingVisible: boolean = false;

    /**
     * Init services
     *
     * @param deckService
     * @param pokerResultService
     */
    constructor(private deckService: DeckService, private pokerResultService: PokerResultService) {
    }

    /**
     * Create the standard player
     *
     */
    createStandardPlayer() {
        this.players.push(new PlayerTexas(0, 'Player 1'));
    }

    /**
     * Call's deck functions to get a full new deck of cards
     *
     * @param testing
     */
    createDeck(testing: boolean) {
        this.deckService.createDeck();

        if (!testing) {
            this.deckService.shuffle();
        }
    }

    /**
     * Helper function to get player selection
     *
     * @param number
     * @returns {number[]}
     */
    createRange(number: number): number[] {
        let items: number[] = [];
        for (let i = 1; i <= number; i++) {
            items.push(i);
        }
        return items;
    }

    /**
     * Assigns deck cards to players and start the round
     *
     */
    getPlayerCards() {
        for (let n = 0; n < 2; n++) {
            for (let c = 0; c < this.players.length; c++) {
                let currentPlayer = this.players[c],
                    currentCard = this.deckService.draw();

                currentPlayer.hand.push(currentCard);
            }
        }

        this.getCommunityCards();
    }

    /**
     * Draws cards from the deck based on the playing state
     * Set visible state for the community cards.
     *
     */
    getCommunityCards() {
        // kill next Card
        let currentCard: Card;
        this.deckService.draw();


        switch (this.playState) {
            case 'turn':
                currentCard = this.deckService.draw();
                this.turnCard.push(currentCard);
                this.community.push(currentCard);
                break;
            case 'river':
                currentCard = this.deckService.draw();
                this.riverCard.push(currentCard);
                this.community.push(currentCard);
                break;
            default:
                for (let i = 0; i < 3; i++) {
                    currentCard = this.deckService.draw();
                    this.flopCards.push(currentCard);
                    this.community.push(currentCard);
                }
                break;
        }

        this.communityState = true;

        this.gameRoutine();
    }

    /**
     * Assigns the current score based ont the hand value to the players
     *
     */
    putScore() {
        let ranking: any[][] = [];

        for (let i = 0; i < this.players.length; i++) {
            ranking.push([this.players[i].id, this.players[i][this.playState]]);
        }

        ranking = ranking.sort((a, b) => {
            return a[1] - b[1];
        });

        for (let i = 0; i < ranking.length; i++) {
            this.players[ranking[i][0]][this.playState] = i;
        }
    }

    /**
     * Assigns the turn score to the final score and build a ranking array for view
     *
     */
    putFinalScore() {
        let _player: Array<PlayerTexas> = [];


        for (let i = 0; i < this.players.length; i++) {
            this.players[i].score = this.players[i].score + this.players[i].river;
            _player.push(this.players[i]);
        }

        this.ranking = _player;

        this.ranking = this.ranking.sort((a, b) => {
            return a.score - b.score;
        }).reverse();
    }

    /**
     * Writes the actual evaluated result to the given player.
     *
     * @param player
     */
    putPlayerScore(player) {
        let score: PokerHand = this.pokerResultService.score(player.hand, this.community);

        player[this.playState] = score.value;
        player.handName = score.name;
        player.best = score.hands;
    }

    /**
     *
     * Changes the playing state and call's scoring functions
     *
     */
    gameRoutine() {
        for (let p = 0; p < this.players.length; p++) {
            this.putPlayerScore(this.players[p]);
        }

        this.putScore();

        switch (this.playState) {
            case 'turn':
                this.playState = 'river';
                setTimeout(() => {
                    this.showFlop = true;
                }, 500);
                break;
            case 'river':
                this.putFinalScore();

                setTimeout(() => {
                    this.showTurn = true;
                }, 500);

                setTimeout(() => {
                    this.showRiver = true;
                    this.showPlayerCards = true;
                    this.rankingVisible = true;
                }, 1500);
                break;
            default:
                this.playState = 'turn';
                break;
        }

        if (this.community.length < 5) {
            this.getCommunityCards();
        }
    }

    /**
     * Creates given amount of Players
     *
     * @param toAdd
     */
    createPlayer(toAdd: number) {
        for (let i = 1; i <= toAdd; i++) {
            this.players.push(new PlayerTexas(i, 'Player ' + (i + 1)));
        }
    }

    /**
     * Click function for player selection
     *
     * @param el {Object}
     */
    onSelect(el) {
        let target = el.target || el.srcElemnt || el.currentTarget;

        this.createPlayer(parseInt(target.value));

        this.playerSelectActive = false;

        this.getPlayerCards();
    }

    /**
     * Create on init the standard PLayer and a deck
     */
    ngOnInit(): void {
        this.createStandardPlayer();
        this.createDeck(false);
    }
}

