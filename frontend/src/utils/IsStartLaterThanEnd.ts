export function isStartEarlierThanEnd(startTime: string, endTime: string): boolean {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    return start < end;
}