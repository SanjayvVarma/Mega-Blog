const REFRESH_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'None' : "Lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

const ACCESS_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'None' : "Lax",
    maxAge: 15 * 60 * 1000,
};

const LOGOUT_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? 'None' : "Lax",
}

export { ACCESS_OPTIONS, REFRESH_OPTIONS, LOGOUT_OPTIONS };