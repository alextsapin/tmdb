import {
    MINUTES_PER_HOUR,
    RATING_HIGH_THRESHOLD,
    RATING_MEDIUM_THRESHOLD,
} from '@/shared/constants';

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

export function runtimeConverter(time: number): string {
    const h = Math.floor(time / MINUTES_PER_HOUR);
    const m = time - h * MINUTES_PER_HOUR;

    if (h < 1) return `${time}m`;
    if (m === 0) return `${h}h`;

    return `${h}h ${m}m`;
}
