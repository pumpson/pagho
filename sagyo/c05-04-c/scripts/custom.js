$(function(){

	/**
	 * 05-02　データからテーブルを生成する
	 */
	//テーブルを表示する
	function renderTable(data){
		var $table = $('#shop');
		$table.find('tr').remove(':not(:first-child)');
		$(data).each(function(){
			var shop = this;

			var $name = $('<td></td>').text(shop.name);
			var $address = $('<td></td>').text(shop.address);
			var $tel = $('<td></td>').text(shop.tel);
			var $solar = $('<td></td>')
			                   .html(getImage('normal', shop.normal));
			var $kids = $('<td></td>')
			                  .html(getImage('good', shop.good));
			var $natural = $('<td></td>')
			                      .html(getImage('verygood', shop.verygood));
            var $time = $('<td></td>')
                      .text(shop.time);            
            var $text = $('<td></td>')
                      .text(shop.text);

			$('<tr></tr>')
			.append($name)
			.append($address)
			.append($tel)
			.append($solar)
			.append($kids)
			.append($natural)
			.append($time)
			.append($text)
			.appendTo($table);
		});
	}

	/**
	 * 05-03　データに合わせてアイコン画像を切り替える
	 */
	//画像を返す
	function getImage(type, number){
		var num = parseInt(number);
		var suffix = '';
		if(num){
			suffix = 'yes';
		} else {
			suffix = 'no';
		}
		var fileName = type + '-' + suffix + '.png';
		var path = 'images/' + fileName;
		return $('<img>').attr('src', path);
	}

	/**
	 * 05-01　JSONデータを取得する
	 */
	//データをロードする
	let hoteldata;
	$.get('hoteldata.json', function(data){
		hoteldata = data;
		renderTable(hoteldata);   // 初回はホテル一覧の方のテーブルを表示
		console.log(hoteldata);
	})
	.fail(function(){
		console.log(hoteldata);
		alert('データの取得に失敗');
	});
    let buffedata;
	$.get('buffedata.json', function(data){
		buffedata = data;
//		renderTable(buffedata);   // テーブル表示は行わない
		console.log(buffedata);
	})
	.fail(function(){
		console.log(buffedata);
		alert('データの取得に失敗');
	});

	/**
	 * 05-04　データをフィルタする
	 */
	//フィルタした結果の新たなデータを作成して返す
	function filterData(data, filterName){
		var newData = [];
		$(data).each(function(){
			var currentData = this;
			var num = parseInt(currentData[filterName]);
			if(num == 1){
				newData.push(currentData);
			}
		});
		return newData;
	}

	//データをフィルタする
	$('.filter-btn')
	.on('click', 'li > a', function(event){
		event.preventDefault();
		var $this = $(this);

		//ボタンのアピアランスを変更する
		$this.parent('li').siblings()
		.addClass('off')
		.end()
		.removeClass('off');

		var idName = $this.parent().attr('id');
		if(idName == 'all'){
			renderTable(hoteldata);
		} else {
			var newData = filterData(hoteldata, idName);
			renderTable(newData);
		}
	});
    
    // 表示物を切り替える
	$('.nav-global')
	.on('click', 'li > a', function(event){
		event.preventDefault();
		var $this = $(this);

		//ボタンのアピアランスを変更する
		$this.parent('li').siblings()
		.addClass('off')
		.end()
		.removeClass('off');

		var idName = $this.parent().attr('id');
		if(idName == 'all'){
			renderTable(buffedata);
		} else {
			var newData = filterData(buffedata, idName);
			renderTable(newData);
		}
	});
    
    nav-global
});
