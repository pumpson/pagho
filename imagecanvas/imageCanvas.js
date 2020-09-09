function loadLocalImage(e) {
    // ファイル情報を取得
    var fileData = e.target.files[0];
    // 画像のデータ表示
    document.getElementById("fileName").innerHTML = fileData.name;
    document.getElementById("fileSize").innerHTML = fileData.size + "byte";
    document.getElementById("fileType").innerHTML = fileData.type;
console.log(fileData.name);
console.log(fileData.size + "byte");
console.log(fileData.type);

    // 画像ファイル以外は処理を止める
    if(!fileData.type.match('image.*')) {
        alert('画像を選択してください');
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    // ファイル読み込みに成功したときの処理
    reader.onload = function() {
        // Canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw(uploadImgSrc);
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// Canvas上に画像を表示する
function canvasDraw(uploadImgSrc) {
    // canvas内の要素をクリアする
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Canvas上に画像を表示
    var img = new Image();
    img.src = uploadImgSrc;
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvasWidth, this.height * (canvasWidth / this.width));

        // Canvas上にテキストを表示
        addText();

        // canvasを画像に変換 0~1の範囲で0が低画質
        var data = canvas.toDataURL('image/jpeg', 0.3);

        // 画像として出力
        var outputImg = document.createElement('img');
        outputImg.src = data;
        document.getElementById('result').appendChild(outputImg);

        // ダウンロードリンクを生成して出力
        var dlLink = document.createElement('a');
        dlLink.href = data;
        dlLink.download = 'sample.jpg';
        dlLink.innerText = 'ダウンロード';
        document.getElementById('result').appendChild(dlLink);
    }
}

// Canvas上にテキストを表示する
function addText() {
    ctx.fillStyle = '#fdd000';
    ctx.fillRect(10, 10, 140, 30);

    ctx.font = "bold 10px 'MS Pゴシック'";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#002B69';
    ctx.fillText('廊下', 80, 25);
}
