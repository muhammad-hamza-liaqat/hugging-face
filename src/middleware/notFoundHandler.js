const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The requested URL ${req.originalUrl} was not found on this server.`,
    });
};

module.exports = notFoundHandler;