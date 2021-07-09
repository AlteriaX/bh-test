const isAnimated = require('is-animated')

const MIN_COMPRESS_LENGTH = process.env.MIN_COMPRESS_LENGTH || 2048
const MIN_TRANSPARENT_COMPRESS_LENGTH = MIN_COMPRESS_LENGTH * 50 //~100KB

function shouldCompress(req, buffer) {
    const { originType, originSize, webp } = req.params

    if (!originType.startsWith('image')) return false
    if (originSize === 0) return false
    if (webp && originSize < MIN_COMPRESS_LENGTH) return false
    if (!webp && (originType.endsWith('png') || originType.endsWith('apng') || originType.endsWith('gif')) && originSize < MIN_TRANSPARENT_COMPRESS_LENGTH) {
        return false
    }

    return true
}

module.exports = shouldCompress
