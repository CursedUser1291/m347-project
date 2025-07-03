export function participantsToArray(participants: string): string {
    if (!participants) return "";
    participants.split(',').map(participant => participant.trim()).filter(participant => participant !== '');
    return participants.toString()
}