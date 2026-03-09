const SCORE_KEY = "score";

export function loadItem(): number {
    const val = localStorage.getItem(SCORE_KEY);
    return val ? parseInt(val, 10) : 0;
}

export function saveItem(value: number): void {
    localStorage.setItem(SCORE_KEY, String(value));
}