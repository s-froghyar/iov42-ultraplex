import { Cinema, CinemaScreen, CinemaScreening, Movie } from "../interfaces/cinema.interface"

export const mockCinemas: Cinema[] = [
    {
        id: 22,
        name: 'mockName1',
        screens: []
    }
];

export const mockMovies: Movie[] = [
    {
        id: 69,
        name: 'mockMovie',
        runtime: 100
    }
];
export const mockScreens: CinemaScreen[] = [
    {
        id: 20,
        name: 'screenname'
    }
];
export const mockScreenings: CinemaScreening[] = [
    {
        id: 10,
        cinemaName: 'cinemaName',
        screenName: 'screenName',
        movie: mockMovies[0],
        start: new Date()
    }
];