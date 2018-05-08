const webdriverio = require('webdriverio');
const options = {desiredCapabilities: {browserName: 'chrome'}};
const client = webdriverio.remote(options);

const fs = require('fs');
const path = require('path');
const request = require('request');

const file_name = path.join(__dirname, "Test_Worked.jpg");
const login = 'aleksander.kun';
const password = '7773439';
const number_photo = 2;

client
    .init()
    .url('https://www.instagram.com/')
    .pause(1000)
    .click('//a [@href="/accounts/login/"]')
    .pause(1000)
    .setValue('//input[@name="username"]', login)
    .pause(1000)
    .setValue('//input[@name="password"]', password)
    .pause(1000)
    .click('//button').then(() => console.log("logged"))
    .pause(1000)
    .click('//a [@href="/"]')
    .pause(2000)
    .setValue('/html[1]/body[1]/span[1]/section[1]/nav[1]/div[2]/div[1]/div[1]/div[2]/input[1]', '#sea')
    .pause(2000)
    .click('/html[1]/body[1]/span[1]/section[1]/nav[1]/div[2]/div[1]/div[1]/div[2]/div[2]/div[2]/div[1]/a[1]/div[1]')
    .pause(4000)
    .getAttribute('/html[1]/body[1]/span[1]/section[1]/main[1]/article[1]/div[1]/div[1]/div[1]/div[1]/div[' + number_photo + ']/a[1]/div[1]/div[1]/img[1]', 'src')
    .then(src => {
        console.log(src);
        request.head(src, (err, res) => {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(src).pipe(fs.createWriteStream(file_name)).on('close', () => console.log('done'));
        });
    })
    .pause(4000)
    .end();

