export function getDateString(date:Date | string) {
    
    let target = new Date(date);

    const y = target.getFullYear();
    const m = target.getMonth() + 1;
    const d = target.getDate();

    return `${y}년 ${m}월 ${d}일`;
}