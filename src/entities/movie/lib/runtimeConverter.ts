import { MINUTES_PER_HOUR } from '@/shared/constants';

export function runtimeConverter(time: number): string {
    const h = Math.floor(time / MINUTES_PER_HOUR);
    const m = time - h * MINUTES_PER_HOUR;

    if (h < 1) return `${time}m`;
    if (m === 0) return `${h}h`;

    return `${h}h ${m}m`;
}
