const scraperObject = {
  // url: 'https://benhvienthucuc.vn/khoa-kham-benh/khoa-tim-mach',
	async scraper(browser){
		let page = await browser.newPage();
		await page.goto(this.url);
    // await page.waitForSelector('.container');
    await page.evaluate(() => {
     // Function to extract keywords from the meta tags
  let metaTags = document.getElementsByTagName('meta');
  console.log("🚀 ~ file: pageScraper.js:12 ~ extractKeywords ~ metaTags:", metaTags)
// function extractKeywords() {
//     // Get all meta tags in the document
  
    
//     // Loop through all meta tags
//     // for (var i = 0; i < metaTags.length; i++) {
//     //     // Check if the meta tag has a 'name' attribute with a value of 'keywords'
//     //     if (metaTags[i].getAttribute('name') === 'keywords') {
//     //         // Get the content attribute of the meta tag
//     //         var keywordsContent = metaTags[i].getAttribute('content');
            
//     //         // Split the content into an array of keywords
//     //         var keywordsArray = keywordsContent.split(',');
            
//     //         // Trim any leading or trailing whitespaces from each keyword
//     //         keywordsArray = keywordsArray.map(function(keyword) {
//     //             return keyword.trim();
//     //         });
            
//     //         // Output the keywords
//     //         // console.log('Keywords:', keywordsArray);
            
//     //         // You can return the keywordsArray or perform further processing here
//     //         return keywordsArray;
//     //     }
//     // }
    
//     // Return an empty array if no keywords are found
//     // return [];
// }

// // Call the function when the DOM is ready
// document.addEventListener('DOMContentLoaded', function() {
//     // Call the function to extract keywords
//     extractKeywords();
// });
 
    });    

    // console.log(result);

    // return result;
		
	}
}

module.exports = scraperObject;
