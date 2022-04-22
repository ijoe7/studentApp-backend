module.exports = (err, req, res, next) => {
    
    console.error(err.name, err.message, err.stack);

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode || 500).json({
            error: {
                message: err.message
            }
        });
    } else if (process.env.NODE_ENV === 'production') {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                error: {
                    message: err.message,
                },
            });
        } else {
            res.status(err.statusCode || 500).json({
                error: {
                    message: "Something went wrong in the server",
                },
            });
        }
    }
}

