export type FormType = 'cinema' | 'screen' | 'movie' | 'screening' | 'booking';

export interface FormOptions {
    createType: FormType;
    cinemaId: number | string;
    screenId: number | string;
    movieId: number | string;
    screeningId: number | string;
}