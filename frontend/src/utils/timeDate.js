const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${diff < 120 ? '' : 's'} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${diff < 7200 ? '' : 's'} ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} day${diff < 172800 ? '' : 's'} ago`;
    if (diff < 1209600) return `1 week ago`;

    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
    });
};

export { getTimeAgo }