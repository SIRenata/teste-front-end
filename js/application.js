var form = $('#search-form');
var search_field = $('#search-film-input');
var results = $('#container');

var KEY = 'AIzaSyCRIhIcZKzFcbF9Uxh1de6F3IAxSkLsL7k';

form.on('submit', function(e) {
	e.preventDefault();
	var url_search = 'https://www.googleapis.com/youtube/v3/search';

	var searchParams = {
		part: 'id,snippet',
		q: search_field.val(),
		key: KEY,
		maxResults: 48
	};

	$.get(url_search, searchParams, function(response) {
		$(".js-container-form").removeClass("container-form");
		$('#results').pagination({
			dataSource: response.items,
			pageSize: 12,
			ulClassName: "pagination",
			prevText: '<i class="material-icons">chevron_left</i>',
			nextText: '<i class="material-icons">chevron_right</i>',
			callback: function(data, pagination) {
				console.log(pagination);
				console.log(data);
				results.empty();
				$.each(data, function(index, item) {
					$("<div />").attr("class", "js-result-block col s12 m6 l3")
						.append($("<div />").attr("class", "js-card card")
							.append($("<div />").attr("class", "js-card-image card-image")
								.append($("<a />").attr("href", "teste.com").attr("class", "btn-floating halfway-fab red lighten-1")
									.append($("<i />").attr("class", "material-icons").html("play_arrow")))
								.append($("<img />").attr("src", item.snippet.thumbnails.high.url)))
							.append($("<div />").attr("class", "js-card-content card-content")
								.append($("<span />").attr("class","js-card-title card-title truncate").html(upperCaseFirstLetter(item.snippet.title)))
								.append($("<p />").attr("class", "js-card-chanel card-chanel").html(upperCaseFirstLetter(item.snippet.channelTitle)))
								.append($("<p />").attr("class", "js-card-desc card-desc").html(textTruncate(upperCaseFirstLetter(item.snippet.description), 90)))
								.append($("<div />").attr("class","js-card-action card-action center-align")
								.append($("<a />").attr("href", "teste.com2").attr("class","js-btn btn red lighten-1").html("+ Detalhes do vídeo"))))).appendTo(results);
				});
			}
		});
	});
});

function textTruncate(str, strSize) {
	if(strSize === null) {
		strSize = 100;
	}
	if (str.length > strSize){
		return str.substring(0,strSize) + '...';
	}else{
		return str;
	}
}

function upperCaseFirstLetter(str){
	var strUpper = 	str.toLowerCase().replace(/(?:^)\S/g, function(a) {
						return a.toUpperCase(); 
					});
	return strUpper;
}