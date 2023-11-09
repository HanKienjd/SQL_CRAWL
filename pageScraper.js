const scraperObject = {
	url: 'https://noithatthucung.com/danh-muc/san-pham/',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
    await page.waitForSelector('.shop-container');
    let products =await page.evaluate(() => {
      let getBox = document.querySelectorAll('.title-wrapper');
      let product = [];
      getBox.forEach((item) => {
        product.push({
          // @ts-ignore
          title: item.querySelector('a').innerText,
          // @ts-ignore
          link: item.querySelector('a').href
        });
      });
      
      return product;
    });

    // go to each product
    let pageProducts = await browser.newPage();
    for (let i = 0; i < products.length; i++) {
      await pageProducts.goto(products[i].link);
      await pageProducts.waitForSelector('.product');
      let product = await pageProducts.evaluate(() => {
        let product = {};
        // @ts-ignore
        product.title = document.querySelector('.product_title').innerText;
        // @ts-ignore
        product.price = document.querySelector('.woocommerce-Price-amount').innerText;
        // @ts-ignore
        product.description = document.querySelector('.woocommerce-product-details__short-description').innerText;
        // @ts-ignore
        product.image = document.querySelector('.woocommerce-product-gallery__image img').src;
        return product;
      });
      products[i].price = product.price;
      products[i].description = product.description;
      products[i].image = product.image;
    }


    console.log(products);

		
	}
}

module.exports = scraperObject;
