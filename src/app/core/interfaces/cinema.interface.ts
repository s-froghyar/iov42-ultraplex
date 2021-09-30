
export interface ResponseDto<T> {
    content: T;
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
​    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
}

export interface CinemaScreen {
    id: number;
    name: string;
}

export interface CinemaScreening {
    id: number;
    cinemaName: string;
    screenName: string;
    movie: Movie;
    start: any;
}


export interface Cinema {
    id: number;
    name: string | null;
    screens: CinemaScreen[];
}

export interface Movie {
    id: number;
    name: string;
    runtime: number | null;
}

export interface Booking {
    id: number;
}