import {Card} from '../Card/card.interface';

export interface PokerHand
{
    hands: Card[];
    name: string;
    value: number;
}
