import { ICard } from "./interfaces/card.interface";

export const dashboardNavigationCards: ICard[] = [
    {
        title: 'Cinemas',
        icon: 'cinema',
        size: 'large',
        selected: true
    },
    {
        title: 'Movies',
        icon: 'movie',
        size: 'large',
        selected: false
    },
    {
        title: 'Bookings',
        icon: 'screening',
        size: 'large',
        selected: false
    },
];


export const createItemCard: ICard = {
    title: 'Add new',
    icon: 'add',
    size: 'medium',
    selected: false
}