import { Card } from "./interfaces/card.interface";

export const dashboardNavigationCards: Card[] = [
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
]