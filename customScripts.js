/* FUNCTION TO HIGHLIGHT THE SEARCHED ITEM */

function highlight(elem)
{
    inputbox = document.getElementById("filterbox");
    inputbox.value = '';    
    list_val = div.getElementsByTagName("li");
    for (i = 0; i < list_val.length; i++) 
    {
        list_val[i].style.display = "none";
    }
    var list_id = elem.hash
    var card_id =list_id.substring(1);
    var element = document.getElementById(card_id);
    card_tile = element.getElementsByClassName("card")
    card_tile[0].classList.add("highlight");
 setTimeout(function () {
    card_tile[0].classList.remove("highlight");
 }, 2000);

}

/* FUNCTION TO HIGHLIGHT THE SEARCHED ITEM ENDS */


/* FUNCTION TO FACILITATE THE SEARRCH */
function searchfunc() 
{
    var input, filter, ul, li, a, i;
    input = document.getElementById("filterbox");
    filter = input.value.toUpperCase();
    div = document.getElementById("customList");
    li = div.getElementsByTagName("li");
    if ( input.value.length > 2 )
    {
         
        for (i = 0; i < li.length; i++) {
          txtValue = li[i].textContent || li[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "block";
          } else {
            li[i].style.display = "none";
          }
        }
    }
    else
    {
      for (i = 0; i < li.length; i++) 
      {
          li[i].style.display = "none";
      }
    } 
  }

  /* FUNCTION TO FACILITATE THE SEARRCH ENDS */

/* SCRIPT TO FETCH PUBLIC API DETAILS FROM NEW YORK TIMES */

window.onload = function ()  {

var request = new XMLHttpRequest()
var newshtml = '';

request.open('GET', 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=XUvGy7DyFaEmY5Q2v0PnGvsdK09c88dG', true)

request.onload = function () {

    var featureddata = JSON.parse(this.response)
    var featurednewsdata = featureddata.response.docs;
    for ( i=0; i< featurednewsdata.length; i++ )
    {
        if (i < 3)
        {
            newshtml += '<div class="col-md-4 card-styles"> ' +
            '<div class="card latestnewscard">' +
                '<div class="card-img-top" style=background-image:url("https://www.nytimes.com/'+ featurednewsdata[i].multimedia[0].url +'")></div>' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + featurednewsdata[i].subsection_name + '</h5>' +
                '<p class="card-text">' +featurednewsdata[i].abstract+ '</p>' +
                '</div>' +
            '</div>' +
            '</div>' ;
        }
    }
    var featured_news = document.getElementById("featurednewsdiv");
    featured_news.innerHTML = newshtml;
}

request.send()

var request1 = new XMLHttpRequest()
var featurednewshtml = '';
var listitems = '';

request1.open('GET', 'https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?&api-key=XUvGy7DyFaEmY5Q2v0PnGvsdK09c88dG', true)

request1.onload = function () {
  
    var data = JSON.parse(this.response)
    var latestnewsdata = data.results
    for ( i=0; i< latestnewsdata.length; i++ )
    {
        if (i < 9)
        {
            featurednewshtml += '<div class="col-md-4 card-styles" id="cardnumber' + latestnewsdata[i].id + '"> ' +
            '<div class="card featurednewscard">' +
                '<div class="card-body">' +
                '<h5 class="card-title" style="margin-bottom:10px;">' + latestnewsdata[i].title + '</h5>' +
                '<p class="card-text">' +latestnewsdata[i].abstract + '</p>' +
                '</div>' +
            '</div>' +
            '</div>' ;
        
            /* THE BELOW FOR LOOP DYNAMICALLY FETCHES DATA FROM THE API AND ADDS TO DROPDOWN OF SEARCH BOX AND 
            UPON CLICK OF THE RESULT IT JUMPS TO THE PARTICULAR NEWS CARD AND HIGHLIGHTS IT */

            for ( k=0; k < latestnewsdata[i].des_facet.length ; k++ )
            {
                if ( !( listitems.includes( latestnewsdata[i].des_facet[k]) ) )
                {
                    listitems += '<li style="display:none"><a onclick="highlight(this)" href="#cardnumber'+ latestnewsdata[i].id +'">' + latestnewsdata[i].des_facet[k] + '</a></li>';

                }
            }
        }
    }
    var latest_news = document.getElementById("latestnewsdiv");
    latest_news.innerHTML = featurednewshtml;

    var search_items = document.getElementById("customList");
    search_items.innerHTML = listitems;
}

request1.send()

}

/* SCRIPT TO FETCH PUBLIC API DETAILS FROM NEW YORK TIMES ENDS */