(function(){	// protect the lemmings!

	/*
	 *
	 *    this method will encompass ALL BESTBUY API calls
	 *	  it is basically a wrapper function/closure that will
	 *	  protect the local variables
	 *
	 */
	function handleBestBuyAPI() {
		var __URL_BASE__ = 'http://api.remix.bestbuy.com/v1/products'
			, __FORMAT__ = 'json'
			, __APIKEY__ = 'gskwnqxsvzkjqfbmud4d9sqg';

		/*
		 *
		 *	this function pulls in data from the bestbuy api
		 *	it takes name as a free text param
		 *
		 */
		function pullData( nameStr, userAPIOptions, successCallback ) {

			// these are the default keys for our API call
			var APIOptions = {
					format: __FORMAT__
					, apiKey: __APIKEY__
				};

			// add user defined api options
			$.extend( APIOptions, userAPIOptions );

			// these are the ajax method options
			var AJAXOptions = {
					url       		: __URL_BASE__+nameStr
					, data 			: APIOptions
					, dataType 		: 'jsonp'
					, cache			: true
					, jsonpCallback : 'jsoncallback'
					, success 		: successCallback
				};

			// call the ajax
			$.ajax( AJAXOptions );
		} // pullData

		/*
		 *
		 *	this function will get run after the ajax comes back successfully
		 *
		 */
		function onAJAXSuccess( data ) {
			console.log( data )
			__generateProductItemHTML( data );
		}

		/*
		 *
		 *	this is a PRIVATE function
		 *	it is responsible for pushing the data that we got back
		 *	into the view and rewiring masonry
		 *
		 */
		function __generateProductItemHTML( data ) {

			// grab products and sanity check
			var products = data.products;
			if ( typeof products === "undefined" ) return;

			// grab the _ template for bestbuyitems
			var dataItem = $('#data-item_bestbuy')
			// grab the HTML for said bestbuy item
				, templateContent = dataItem.html()
			// grab the container we want to append to
				, container = $( '.js-item-container' )
			// key: unique identifier for this batch of search results
				, key = new Date().getTime();


			// empty out container to make room for new stuff
			container.empty();


			// lets loop through the results 
			for ( var i = 0; i < products.length; i++ ) {
				var curr = products[ i ];

				//var templateCompiled = ;
				curr.__key = key;

				container.append(
					_.template(
						templateContent
						, { data: curr }
					)
				);

			} // for

			$container.masonry( 'addItems', $( '.item-bestbuy-'+key ) );
			$container.masonry( 'layout' );
			setTimeout(function() {
				$container.masonry( 'layout' );
			}, 70 );
			
		}


		// we are implementing the module pattern
		// which means that we will choose specific things to expose 
		return {
			pullData: pullData
			, onAJAXSuccess: onAJAXSuccess
		}
	}

// WALMART API
	
	 /*
	 *    this method will encompass ALL WALMART API calls
	 *	  it is basically a wrapper function/closure that will
	 *	  protect the local variables
	 */
	 
	function handleWalmartAPI() {
		var __URL_BASE__ = 'http://api.walmartlabs.com/v1/items'
			, __FORMAT__ = 'json'
			, __APIKEY__ = 'qx7k5taxsnn5fdhzkxtmmghv';

}




	/*****************************************
	/*
	/*	 			INITIALIZERS
	/*
	/*******************************************/ 
	var BestBuyAPI = handleBestBuyAPI();

	$('#search-terms').on('blur', function( e ) {
		var value = $( this ).val();
		onSearch( value );
	});
	$('.search-terms-sm').on('blur', function( e ) {
		var value = $( this ).val();
		onSearch( value );
	});


	$('#search-terms').on('keypress', function( e ){
		var value = $( this ).val();
		if ( e.keyCode === 13 ) {
			e.preventDefault();
			onSearch( value );
		}
	});
	$('.search-terms-sm').on('keypress', function( e ){
		var value = $( this ).val();
		if ( e.keyCode === 13 ) {
			e.preventDefault();
			onSearch( value );
		}
	});

	$('#ajaxloader1').show();

	function onSearch( value ) {
		if (
			value === "" 
			|| typeof value === "undefined" 
			|| value.length === 0 
			|| value.length <= 2
		) { return; }
console.log('here')
		BestBuyAPI.pullData(
			'(name='+value+'*)'
			, {
				pageSize: 100
			}
			, BestBuyAPI.onAJAXSuccess
		);
	}


	$('.js-nav-btn').on( 'click', onNavClick );
	function onNavClick( e ) {
		e.preventDefault();

		var me = $( this )
			, category = me.attr( 'data-category' );

		BestBuyAPI.pullData(
			'(categoryPath.name='+category+')'
			, {
				pageSize: 100
			}
			, BestBuyAPI.onAJAXSuccess
		);
	}

//infinite scroll - categories
		var timeout;
		var pageIdx = 0;
     	$(window).scroll(function() {
     		if($(window).scrollTop() == $(document).height() - $(window).height() - 200){
     		 // $(window).unbind('scroll');
				
				var append = $('.item').appendTo('#container');
				var button = $('.js-nav-btn');
				var me = $( '.active-item-search' )
					, category = me.attr( 'data-category' );
     			clearTimeout( timeout );
				timeout = setTimeout(function(){

				BestBuyAPI.pullData(
					'(categoryPath.name='+category+')'
					, {
						pageSize: 100
						,  page: 2 //currentPage++
		
					}
					, BestBuyAPI.onAJAXSuccess

				);
						} , 250);
				return false;
			}
        });//window scroll detection 

	function initialRandom() {
		var btns = $('.js-nav-btn')
			, random = Math.floor( Math.random() * btns.length );

		var randomBtn = $( btns[ random ] )
			, category = randomBtn.attr('data-category');

		BestBuyAPI.pullData(
			'(categoryPath.name='+category+')'
			, {
				pageSize: 100
			}
			, BestBuyAPI.onAJAXSuccess
		);

	}

	initialRandom();

})();






/*


var url = 'http://api.remix.bestbuy.com/v1/products(name=xbox*)?format=json&apiKey=gskwnqxsvzkjqfbmud4d9sqg&callback=test';

// function onSuccess( data ) {
//     alert('success!');
//     console.log( data );
// }


// $.ajax({
//     url: url
//     , dataType: "jsonp"
//     , type: 'POST'
//     , jsonp: false
//     , jsonpCallback: 'test'
//     , cache: true
//     , beforeSend: function( xhr, settings ) {
//     	console.log( xhr, settings )
//     	//settings.url = 'http://api.remix.bestbuy.com/v1/products(name=xbox*)?format=json&apiKey=gskwnqxsvzkjqfbmud4d9sqg&callback=test';
//     }
//     , success: onSuccess
// });

*/