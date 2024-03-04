export function getDateString(date:Date) {
    const y = date.getFullYear();
    const m = date.getMonth();
    const d = date.getDate();

    return `${y}.${m}.${d}`;
}