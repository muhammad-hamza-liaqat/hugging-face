const requestLogger = (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`Incoming request: ${req.method} ${req.url} from IP: ${ip}`);
    next();
};

module.exports = requestLogger;