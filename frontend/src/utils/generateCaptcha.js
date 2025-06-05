const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let chaptcha = ''

    for (let i = 0; i < 6; i++) {
        chaptcha += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return chaptcha;
};

export default generateCaptcha;