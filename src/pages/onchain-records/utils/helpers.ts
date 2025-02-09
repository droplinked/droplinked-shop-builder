export const formatDate = (dateString: string) => {
    return (
        new Date(dateString).toLocaleDateString(undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            })
    )
};
export const getTime = (dateString: string) => {
    return (
        new Date(dateString).toLocaleTimeString(undefined,
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
            })
    )
}