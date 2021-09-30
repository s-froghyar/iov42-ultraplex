import { CardIcon, ICard, CardSize } from "./interfaces/card.interface";
import { Booking, Cinema, Movie } from "./interfaces/cinema.interface";

export class CardFactory {
    cinemas: Cinema[] = [];
    movies: Movie[] = [];
    bookings: Booking[] = [];

    constructor(c: Cinema[], m: Movie[], b: Booking[]) {
        this.cinemas = c;
        this.movies = m;
        this.bookings = b;
    }
    generateAllCards(): [ICard[], ICard[], ICard[]] {
        return [
            this.createCards('cinema') ?? [],
            this.createCards('movie') ?? [],
            this.createCards('booking') ?? []
        ];
    }
    createCards(cardType: CardIcon): ICard[] | null {
        switch (cardType) {
            case 'cinema':
                return this.cinemas.map(c => {
                    return {
                        icon: cardType,
                        title: c.name ?? null,
                        size: 'medium',
                        selected: false,
                        id: c.id
                    }
                })
            case 'movie':
                return this.movies.map(m => {
                    return {
                        icon: cardType,
                        title: m.name ?? null,
                        size: 'medium',
                        selected: false,
                        id: m.id
                    }
                })
            case 'booking':
                return this.bookings.map(b => {
                    return {
                        icon: cardType,
                        title: b.id.toString() ?? null,
                        size: 'medium',
                        selected: false,
                        id: b.id
                    }
                })
            default: 
                return null;
        }
    }
}