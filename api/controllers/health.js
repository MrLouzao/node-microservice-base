

// GET /health
function healthCheck (_, res) {
        res.status(200).json(
            {status: 200, content: 'OK!'}
        );
}


module.exports = {
    healthCheck,
}