export const removeFalsyValues = (obj: Record<string, any>) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            if (value === 0) return true; // Keep zero values
            return Boolean(value);
        })
    );
};