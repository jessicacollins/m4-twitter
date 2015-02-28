
$(function() {

	//User Object
	var User = {
		title: '@Jessica',
		img: '/JavaScript/images/jessica.jpg'
	}

	//State management
	$(document).on('click', '.tweet', function(){
		$(this).parents('.thread').toggleClass("expand");
	});

	$(document).on('click', '.compose textarea', function(){
		$(this).parents('.compose').toggleClass("expand");
	});

	// New Tweet
	$(document).on('submit', 'header form', function(event){
		event.preventDefault();
		var message = $('textarea').val();
		if(message){
			var thread = renderThread(message, User);
			$('.tweets').prepend(thread);
			$('form textarea').val('');
		}
	});

	// Reply Tweet
	$(document).on('submit', '.replies form', function(event){
		event.preventDefault();
		var message = $(this).find('textarea').val();
		if(message){
			var tweet = renderTweet(message, User);
			$(this).parents('.replies').prepend(tweet);
			$('form textarea').val('');
		}
	});

	//Render Tweet
	var renderTweet = function(message, user) {
		var source = $('#template-tweet').html();
		var template = Handlebars.compile(source);
		return template({
			'message' : message,
			'title' : user.title,
			'img' : user.img
		});
	}

	//Render Thread
 	var renderThread = function(message, user) {
		var source = $('#template-thread').html();
		var template = Handlebars.compile(source);
		return template({
			'tweet': renderTweet(message, user),
			'compose': renderCompose()
		});
	}

	//Render Compose Form
 	var renderCompose = function() {
		var source = $('#template-compose').html();
		var template = Handlebars.compile(source);
		return template({
		});
	}

});

