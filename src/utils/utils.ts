export function getRatingColor(rating: number) {
    
    if (rating >= 7) {
        return '#21d07a'; // зелёный
    }

    if (rating >= 4) {
        return '#d2d531'; // жёлтый
    }

    if (rating > 0) {
        return '#db2360'; // красный
    }

    return '#666666'; // если рейтинга нет
};

export function runtimeConverter(time: number) {

    const h = Math.floor(time / 60);
    const m = time - h * 60

    if (h < 1) return `${time}m`;
    if (m === 0) return `${h}h`;

    return `${h}h ${m}m`;
}
