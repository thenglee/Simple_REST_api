$(function(){

	$.get('/pandas', appendToList);

	function appendToList(pandas){
		var list = [];
		var content, panda;

		if (pandas != null){
			for (var i in pandas){
				panda = pandas[i];

				content = '<a href="/pandas/' + panda.name + '">' + panda.name + '</a>' 
							+ '<a href="#" data-panda="' + panda.name + '"> Delete ' + '</a>';

				list.push($('<li>', { html: content }));
			}

			$('.panda-list').append(list);

		}else{
			$('.panda-list').html('No pandas found!');
		}
	}



	$('form').on('submit', function(event){
		event.preventDefault();

		var form = $(this);
		var pandaData = form.serialize();

		$.ajax({
			type: 'POST', url: '/pandas', data: pandaData
		})
		.success(function(panda){
			appendToList([panda]);
			form.trigger('reset');
		});
	});


	$('.panda-list').on('click', 'a[data-panda]', function(event){
		if(!confirm('Are you sure?')){
			return false;
		}

		var target = $(event.currentTarget);

		$.ajax({
			type: 'DELETE', url: '/pandas/' + target.data('panda')
		}).done(function(){
			target.parents('li').remove();
		});
	});

});

