const sharp = require('sharp')
const redirect = require('./redirect')
const isAnimated = require('is-animated')

function compress(req, res, input) {

    const format = req.params.webp ? 'webp' : 'jpeg'
    
<<<<<<< HEAD
    if (isAnimated(input)) {
        sharp(input, { animated: true })
            .webp({ quality: 90 })
            .toBuffer((err, output, info) => {
                if (err || !info || res.headersSent) return redirect(req, res)

                res.setHeader('content-type', `image/${format}`)
                res.setHeader('content-length', info.size)
                res.setHeader('x-original-size', req.params.originSize)
                res.setHeader('x-bytes-saved', req.params.originSize - info.size)
                res.status(200)
                res.write(output)
                res.end()

                console.log("File format: " + format + " | Original: " + (req.params.originSize / 1000).toFixed(2) + "kB | Modified: " + (info.size / 1000).toFixed(2) + "kB | Saved: " + ((req.params.originSize - info.size) / 1000).toFixed(2) + "kB")
            })
    } else {
        sharp(input)
            .jpeg({ mozjpeg: true })
            .toBuffer((err, output, info) => {
                if (err || !info || res.headersSent) return redirect(req, res)

                res.setHeader('content-type', `image/${format}`)
                res.setHeader('content-length', info.size)
                res.setHeader('x-original-size', req.params.originSize)
                res.setHeader('x-bytes-saved', req.params.originSize - info.size)
                res.status(200)
                res.write(output)
                res.end()

                console.log("File format: " + format + " | Original: " + (req.params.originSize / 1000).toFixed(2) + "kB | Modified: " + (info.size / 1000).toFixed(2) + "kB | Saved: " + ((req.params.originSize - info.size) / 1000).toFixed(2) + "kB")
            })
    }
=======
    sharp(input, { animated: isAnimated(input) ? true : false })
        .webp({ quality: 90 })
        .toBuffer((err, output, info) => {
            if (err || !info || res.headersSent) return redirect(req, res)

            res.setHeader('content-type', `image/${format}`)
            res.setHeader('content-length', info.size)
            res.setHeader('x-original-size', req.params.originSize)
            res.setHeader('x-bytes-saved', req.params.originSize - info.size)
            res.status(200)
            res.write(output)
            res.end()
            
            console.log("Original: "+req.params.originSize+" | Modified: "+info.size+" | Saved: "+(req.params.originSize - info.size))
            if (isAnimated(input)) console.log('Animated image converted!')
              else console.log('Image converted!')
        })
>>>>>>> parent of fd081ab (Update compress.js)
}

module.exports = compress
