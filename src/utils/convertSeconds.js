

export default function convertSeconds(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate minutes
    const seconds = totalSeconds % 60; // Remaining seconds

    return `${hours}h ${minutes}min ${seconds}s`;
}