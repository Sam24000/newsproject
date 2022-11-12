//https://newsapi.org/docs/endpoints/sources
// news Api key
// 8362053158e04193b1c2eb350ce4df85

let source = 'abc-news';
let apikey = '8362053158e04193b1c2eb350ce4df85';

let newscard1 = document.getElementById("newscard1");

//create a request from the other sources to fetch and get data
// //create an ajax get request.

// Dynamic content modification of web page: Using Ajax reloading of a web page is not required. The content of a web page can be modified dynamically by calling the XHR request in the background and changing the content using DOM Modification.

// Sending an XHR request
// To send and receive data from the server and implement the Ajax simple steps are explained below:

// Create a XMLHttpRequest object.
// Send the request to retrieve data from the server.
// Receive the response and display information to the end-user.

const xhr = new XMLHttpRequest();   //Create a XMLHttpRequest object

xhr.open('GET', `http://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`, true); //Send the request

//when response is ready then do
xhr.onload = function () {
    if (this.status ===200) {       //status 200 means OK response

        let json = JSON.parse(this.responseText) //
        let article = json.articles; //taking articles section from the response from the json

        console.log(article);   //this make an array of contents like title source author... from the source

        let newshtml = "";
        article.forEach(function (element, index) {
            // console.log(element,index);

            // element section is full of all headings like title author source url of that news etc.

          //  we are taking only title from the element section by using ${element["title"]}

            let news = `
                    <div class="card" >
                    
                    <div class="card-header" id="heading${index}">
                    
                        <h2>
                        <button class="btn btn-primary" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            
                            <b style="color: black;"> 
                            Breaking_News ${index+1}:-
                            </b>

                            ${element["title"]}

                        </button>
                        </h2>
                    </div>
                        <div style="min-height: 1px;"
                        class="collapse collapse-show" id="collapse${index}" aria-labelledby="heading${index}" data-bs-parent="#newscard1">
                            <div class="card card-body">

                              ${element["content"]}. <a href="${element['url']}" target= "_blank" > Read more </a>  

                            </div>
                        
                        </div>
                    </div>
                    `
            //we are taking content section from the element section and attaching url of the content   

            //above target=blank is use to open href into a new tab 
            // #newscard1 databsparent attribute is used to toggle or to collapse the data after completion of the event.

            newshtml += news; //refer to the next news

        });

        newscard1.innerHTML = newshtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send();


// console.log(news);