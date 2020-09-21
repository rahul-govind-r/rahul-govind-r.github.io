$(document).ready(function(){

    $("#filterbox").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".card").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });

    $.ajax({ 
        type: "GET",
        dataType: "json",
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=XUvGy7DyFaEmY5Q2v0PnGvsdK09c88dG",
        success: function(data){        
          
            var newsvalue = data.response.docs;
            var newshtml  = "";
            $.each(newsvalue, function( key, value ) {

                if (key < 3)
                {
                    newshtml += '<div class="col-md-4 card-styles"> ' +
                                '<div class="card latestnewscard">' +
                                    '<div class="card-img-top" style=background-image:url("https://www.nytimes.com/'+ value.multimedia[0].url +'")></div>' +
                                    '<div class="card-body">' +
                                    '<h5 class="card-title">' + value.subsection_name + '</h5>' +
                                    '<p class="card-text">' +value.abstract+ '</p>' +
                                    '</div>' +
                                '</div>' +
                                '</div>' ;
                }
            })

            $(".latestnews").append(newshtml);
        }
     });

     $.ajax({ 
        type: "GET",
        dataType: "json",
        url: "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?&api-key=XUvGy7DyFaEmY5Q2v0PnGvsdK09c88dG",
        success: function(data){        
          
            var newsvalue = data.results;
            var featurednewshtml = "";
            $.each(newsvalue, function( key, value ) {

                if (key < 9)
                {

                    featurednewshtml += '<div class="col-md-4 card-styles"> ' +
                    '<div class="card featurednewscard">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title" style="margin-bottom:10px;">' + value.title + '</h5>' +
                        '<p class="card-text">' +value.abstract + '</p>' +
                        '</div>' +
                    '</div>' +
                    '</div>' ;
                }
            })

            $(".featurednews").append(featurednewshtml);
        }
     });

})