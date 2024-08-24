const redis = require("../redis-client");

const rateLimiter = async (req, res, next) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const [lastRequestTime, requestCount] = await redis.hmget(user_id, 'lastRequestTime', 'requestCount');

    // Initialize request count and last request time if not set
    let newRequestCount = parseInt(requestCount, 10) || 0;
    let lastRequest = parseInt(lastRequestTime, 10) || 0;

    // Check 1 task per second limit
    if (currentTime === lastRequest) {
        return res.status(503).json({ error: 'Rate limit of 1 task per second exceeded' });
    }

    // Increment the count of requests within the last minute
    if (currentTime - lastRequest < 60) {
        newRequestCount += 1;
    } else {
        newRequestCount = 1;
    }

    // Check 20 tasks per minute limit
    if (newRequestCount > 20) {
        return res.status(503).json({ error: 'Rate limit of 20 tasks per minute exceeded' });
    }

    // Update Redis with the latest request time and count
    await redis.hmset(user_id, 'lastRequestTime', currentTime, 'requestCount', newRequestCount);

    // Set TTL for the user_id key to 60 seconds to ensure it's cleaned up after inactivity
    await redis.expire(user_id, 60);

    next();
};

module.exports = rateLimiter;
