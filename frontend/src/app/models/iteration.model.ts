import { Card } from './card.model';

export interface Iteration {
    _id: string;
    _parent: string;
    title: string;
    description: string;
    goal: string;
    state: string;
    summary?: string;
    cards: [Card];
    date?: Date;
    startDate?: Date;
    finishDate: Date;
}
