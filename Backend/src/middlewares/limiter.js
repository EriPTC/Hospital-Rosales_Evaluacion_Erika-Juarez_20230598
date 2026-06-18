import rateLimit from "express-rate-limit"

const limiter = rateLimit ({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: {
        status: 429,
        error: "too many request"
    }
})

export default limiter