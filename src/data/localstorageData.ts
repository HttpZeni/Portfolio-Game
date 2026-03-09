const SCORE_KEY = "score";
const VISITED_KEY = "visited";

export function loadScore(): number {
    const val = localStorage.getItem(SCORE_KEY);
    return val ? parseInt(val, 10) : 0;
}
export function saveScore(value: number): void {
    localStorage.setItem(SCORE_KEY, String(value));
}
export function loadVisited(): number {
    const val = localStorage.getItem(VISITED_KEY);
    return val ? parseInt(val, 10) : 0;
}
export function saveVisited(value: number): void {
    localStorage.setItem(VISITED_KEY, String(value));
}