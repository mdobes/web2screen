
/* Config */
const config = require('./config.json');

/* Express JS */
const express = require('express')
const app = express()
const port = config.port

/* Other */
const request = require('request');
const puppeteer = require('puppeteer');
const colors = require('colors');


function isURL(str) {
    var urlRegex = '^(?:(?:http|https|)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
}

app.get('/screenshot', (req, res) => {
    if (config.token === req.query.token){
        if (req.query.url) {

            if (isURL(req.query.url)) {
                let size
                request(req.query.url, function (error, response, body) {
    
                    if (error) {
                        res.json({ status: 400, message: "Web not found or offline." })
                    } else {
                        const sleep = (milliseconds) => {
                            return new Promise(resolve => setTimeout(resolve, milliseconds))
                        }
    
                        if (req.query.size) {
                            size = req.query.size
                        } else {
                            size = config.defaults.size
                        }
    
    
                        async function run() {
                            const browser = await puppeteer.launch({
                                args: ['--no-sandbox', '--window-size=' + size],
                                defaultViewport: null
                            });
    
                            const page = await browser.newPage();
                            await page.goto(req.query.url);
    
                            if (req.query.sleep) {
                                await sleep(req.query.sleep)
                            } else {
                                await sleep(config.defaults.sleep)
                            }
    
                            res.set('Content-Type', 'image/png');
                            await res.send(await page.screenshot({ type: 'png' }));
                            browser.close();
                        }
    
                        run();
    
                    }
    
                });
               
            } else {
                res.json({ status: 404, message: "URL parameter is not a valid url." })
            }
    
    
    
        } else {
            res.status(400)
            res.json({ status: 400, message: "URL parameter is not set." })
        }
    }else{
        res.status(401)
        res.json({ status: 401, message: "Unauthorized" })
    }


});

app.listen(port, () => {
    console.log(colors.brightRed(colors.bgCyan.black(" WEB ") + colors.bgGreen.black(" Succesful ") + " Web started successfully."))
})