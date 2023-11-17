const fs = require('fs');
const csv = require('csv-parser');
var XLSX = require('xlsx');

async function scrapeAll(browserInstance){
	let browser;
	try{
		browser = await browserInstance;

		// read data in file url.csv
		const results = [];
		let temp = 0;
		let data = [];
		await fs.createReadStream('url.csv')
			.pipe(csv())
			.on('data', (data) => results.push(data))
			.on('end', () => {
				// console.log(results);
			});
			
		// loop through each url in file url.csv
		for (let i = 0; i < 5000; i++) {

			let page = await browser.newPage({
				headless: true,
			});
			// go to url
			await page.goto(`https://benhvienthucuc.vn${results[i].URL}`);
			// wait for selector
			// await page.waitForSelector('.container');
			// evaluate the page

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
						keywordsArray = keywordsArray.map(function (keyword) {
							return keyword.trim();
						});

						keywords.push({
							'Keywords': keywordsArray.join(','),
						});
						// Output the keywords
					}
				}
				return keywords;
			}
			);
			// push result to array
			data.push(result);
			// close page
			await page.close();
			temp++;
		}
		const recoverData = data.map((item, index) => {
			if(item.length > 0) {
				return item[0];
			}
			return {'Keywords': ''};
		}
		);
		// write data to file data.json 
		fs.writeFile('data.json', JSON.stringify(recoverData), function (err) {
			if (err) throw err;
			console.log('Saved!');
		});
		// convert data from json to excel
		var workbook = XLSX.utils.book_new();
		var ws = XLSX.utils.json_to_sheet(recoverData);
		XLSX.utils.book_append_sheet(workbook, ws, "Keywords");
		XLSX.writeFile(workbook, "Keywords.xlsx");
			
	}
	catch (err) {
		console.log("Could not resolve the browser instance => ", err);
	}
	await browser.close();
}

module.exports = (browserInstance) => scrapeAll(browserInstance)
