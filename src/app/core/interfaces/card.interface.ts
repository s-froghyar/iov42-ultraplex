export type CardSize = 'small' | 'medium' | 'large';
export type CardIcon = 'cinema' | 'movie' | 'screen' | 'screening';

export interface Card {
    title: string;
    size: CardSize;
    icon: CardIcon;
    selected: boolean;
}