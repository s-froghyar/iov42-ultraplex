export type CardSize = 'small' | 'medium' | 'large';
export type CardIcon = 'cinema' | 'movie' | 'screen' | 'screening' | 'booking' | 'add';

export interface ICard {
    title: string | null;
    size: CardSize;
    icon: CardIcon;
    selected: boolean;
    id: number | string;
}