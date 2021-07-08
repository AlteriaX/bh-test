const sharp = require('sharp')
const redirect = require('./redirect')
const isAnimated = require('is-animated')

function compress(req, res, input) {
    const format = req.params.webp ? 'webp' : 'jpeg'
    const originType = req.params.originType
  
    if (format === 'webp' && (originType.endsWith('gif') || originType.endsWith('png') || originType.endsWith('apng')) && isAnimated(input)) {
        const image = sharp(input);
        
        image
            .metadata(function(err, metadata) {
                var compressionQuality = req.params.quality;
                
                sharp(input, , { animated: true })
                .toFormat(format)
                .toBuffer((err, output, info) => {
                    if (err || !info || res.headersSent) return redirect(req, res)

                    setResponseHeaders(info, format)
                    res.write(output)
                    res.end()
                })
            })
    } else {
        const image = sharp(input);
        
        image
            .metadata(function(err, metadata) {
                var compressionQuality = req.params.quality;
                
                sharp(input)
                .toFormat(format, {
                    quality: compressionQuality,
                    progressive: true,
                    optimizeScans: true
                })
                .toBuffer((err, output, info) => {
                    if (err || !info || res.headersSent) return redirect(req, res)

                    setResponseHeaders(info, format)
                    res.write(output)
                    res.end()
                })
            })
    }
    
    function setResponseHeaders (info, imgFormat){
        res.setHeader('content-type', `image/${imgFormat}`)
        res.setHeader('content-length', info.size)
        let filename = (new URL(req.params.url).pathname.split('/').pop() || "image") + '.' + format
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"' )
        res.setHeader('x-original-size', req.params.originSize)
        res.setHeader('x-bytes-saved', req.params.originSize - info.size)
        res.status(200)
    }
}

module.exports = compress
