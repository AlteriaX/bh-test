const sharp = require('sharp')
const redirect = require('./redirect')
const isAnimated = require('is-animated')

function compress(req, res, input) {
    const originType = req.params.originType

    const image = sharp(input);
    
    image
        .metadata(function(err, metadata) {
            sharp(input, { animated: isAnimated(input) ? true : false })
            .toFormat('webp', { quality: 90 })
            .toBuffer((err, output, info) => {
                if (err || !info || res.headersSent) return redirect(req, res)
                   
                if (isAnimated(input)) console.log('Animated image converted!')
                    else console.log('Image converted!')
                   
                setResponseHeaders(info, 'webp')
                res.write(output)
                res.end()
            })
        })
    
    function setResponseHeaders (info, imgFormat){
        res.setHeader('content-type', `image/${imgFormat}`)
        res.setHeader('content-length', info.size)
        let filename = (new URL(req.params.url).pathname.split('/').pop() || "image") + '.' + 'webp'
        res.setHeader('Content-Disposition', 'inline; filename="' + filename + '"' )
        res.setHeader('x-original-size', req.params.originSize)
        res.setHeader('x-bytes-saved', req.params.originSize - info.size)
        res.status(200)
    }
}

module.exports = compress