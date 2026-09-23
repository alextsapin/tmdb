import { RATING_HIGH_THRESHOLD, RATING_MEDIUM_THRESHOLD } from '../model/constants';

export function getRatingColor(rating: number): string {
    if (rating >= RATING_HIGH_THRESHOLD) {
        return '#21d07a'; // green
    }

    if (rating >= RATING_MEDIUM_THRESHOLD) {
        return '#d2d531'; // yellow
    }

    if (rating > 0) {
        return '#db2360'; // red
    }

    return '#666666'; // no rating
}
