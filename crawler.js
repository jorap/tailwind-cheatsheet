import * as cheerio from 'cheerio';
import fs from 'fs';

const crawlTWDocs = async (docsUrl, filename) => {
    const jsonData = [];

    // Extract url from Nav
    try {
        const baseUrl = new URL(docsUrl).origin;
        
        const response = await fetch(docsUrl);
        const html = await response.text();

        const $ = cheerio.load(html);

        $('nav h3').each((i, el) => {    // 'nav#nav p' for v0, 'nav#nav h5' for the rest versions, 'nav h3' for v4
            const sectionTitle = $(el).text().trim();
            const sectionItems = [];

            $(el)
                .next('ul')
                .find('li a')
                .each((j, link) => {
                    const itemTitle = $(link).text().trim();
                    // const itemUrl = $(link).attr('href');   // v0
                    const itemUrl = `${baseUrl}${$(link).attr('href')}`; // rest versions
                    sectionItems.push({
                        title: itemTitle,
                        url: itemUrl,
                    });
                });

            jsonData.push({
                title: sectionTitle,
                children: sectionItems,
            });
        });
        console.log('Navigation extracted');
    } catch (error) {
        console.error('Error extracting navigation :', error);
    }

    // Extract each page in the Nav
    try {
        for (const section of jsonData) {
            for (const child of section.children) {
                console.log('Now crawling :', child.url);
                try {
                    const response = await fetch(child.url);
                    const html = await response.text();
                    const $ = cheerio.load(html);

                    // Get description
                    const description = $('div.px-4 p[data-description="true"]').text().trim();
                    // const description = $('header#header p.mt-2').text().trim(); // v3
                    // const description = $('div#content-wrapper p:first').text().trim();   // v2
                    // const description = $('div#content-wrapper div.text-xl').first().text().trim();   // v0

                    // Get table
                    const table = [];
                    $('table tbody tr').each((i, row) => {
                        const className = $(row).find('td:nth-child(1)').text().trim();
                        const properties = $(row).find('td:nth-child(2)').text().trim();
                        const value = $(row).find('td:nth-child(2) span:first-child').text().trim();

                        table.push({ class: className, properties, value });
                    });

                    // Add the extracted data to the child object
                    child.description = description;
                    child.table = table;
                } catch (err) {
                    console.error(`Error crawling : ${child.url}`, err.message);
                }
            }
        }
        fs.writeFileSync(`${filename}.json`, JSON.stringify(jsonData, null, 2), 'utf-8');
        console.log(`Full site extracted and saved to ${filename}.json`);
    } catch (error) {
        console.error('Error extracting full site :', error.message);
    }
}

crawlTWDocs('https://tailwindcss.com/docs/installation/using-vite', 'v4.1');