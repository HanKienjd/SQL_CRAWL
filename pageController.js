const pageScraper = require('./pageScraper');
const fs = require('fs');
const csv = require('csv-parser');
		
async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;

		// read data in file url.csv
		const results = [];
		await fs.createReadStream('url.csv')
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', () => {
				results.forEach(async (item, index) => {
					if (index < 5) {
						let page = await browser.newPage();
						await page.goto(`https://benhvienthucuc.vn${item.URL}`);
						await page.waitForSelector('.container');
						const result = await page.evaluate(() => {
							const metaTags = document.getElementsByTagName('meta');
							var keywords = [];
							for (var i = 0; i < metaTags.length; i++) {
        // Check if the meta tag has a 'name' attribute with a value of 'keywords'
        if (metaTags[i].getAttribute('name') === 'keywords') {
            // Get the content attribute of the meta tag
            var keywordsContent = metaTags[i].getAttribute('content');
            
            // Split the content into an array of keywords
            var keywordsArray = keywordsContent.split(',');
            
            // Trim any leading or trailing whitespaces from each keyword
            keywordsArray = keywordsArray.map(function(keyword) {
                return keyword.trim();
            });
						keywords.push(keywordsArray);
            // Output the keywords
        }
    }
							return keywords;
						});
						// save data to file
						fs.writeFile('data.json', JSON.stringify(result), function (err) {
							if (err) throw err;
							console.log('Saved!');
						});
						// close page
						await page.close();
				}
				});				
		})
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
