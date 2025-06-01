const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (password.length < 6) {
        return "❌ Password must be at least 6 characters long";
    }

    if (!regex.test(password)) {
        return "❌ Must include A-Z, a-z, 0-9 & special character";
    }

    return "";
};

const checkPasswordMatch = (password, confirmPassword) => {
    if (!confirmPassword) {
        return "";
    } else if (password === confirmPassword) {
        return "✅ Passwords match";
    } else {
        return "❌ Passwords do not match";
    }
};

export { validatePassword, checkPasswordMatch }