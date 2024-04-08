const request = require('request');
const cheerio = require("cheerio");

function getLatestStories(callback) {
    request('https://time.com/', (error, response, html) => {
        if (error) {
            console.error('Error:', error);
            callback(error, null);
        } else {
            const stories = handleHtml(html);
            callback(null, stories);
        }
    });
}

function handleHtml(html) {
    const $ = cheerio.load(html);
    const latestStories = $(".latest-stories__item");
    const stories = [];

    //storing the output in json format with filter of top 6 stories
    latestStories.each((index, element) => {
        if (index < 6) { 
            const title = $(element).find('.latest-stories__item-headline').text().trim();
            const link = "https://time.com/" + $(element).find('a').attr('href');
            stories.push({ title, link });
        }
    });

    return stories;
}

//displaying the data in json format
getLatestStories((error, stories) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log(JSON.stringify(stories, null, 2));
    }
});



// const request = require('request');
// const cheerio = require("cheerio");
// request('https://time.com/', cb);
// function cb(error,response,html){
//     if(error){

//         console.error('error:', error); // Print the error if one occurred
//     }
//     else{
//         handlehtml(html);
//     }
// }
// function handlehtml(html){
//    let selTool =  cheerio.load(html);

//     let array1 = selTool(".latest-stories__item .latest-stories__item-headline");
//     let array2 = selTool(".latest-stories__item a");
//     for(let i=0; i<array1.length; i++){

//         let data = selTool(array1[i]).text();
//         console.log("stories: ",data)
//     }
//     for(let i=0; i<array2.length; i++){

//         let link = selTool(array2[i]).attr('href');
//         console.log("link: ",link)
//     }
// }