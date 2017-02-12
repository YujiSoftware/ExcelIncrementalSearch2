(function() {
    jQuery.fn.max = function(){
        return Math.max.apply(null, this.get());
    };
})(jQuery);

$(document).ready(function(){
    var getGroups = function(rows){
        var groups = [], group = [];
        var count = 0;
        
        for(var i = 0, len = rows.length; i < len; i++){
            group.push(rows[i]);

            var rowSpan = $('td', rows[i])
                            .map(function(){ return this.rowSpan; })
                            .max();
            count = Math.max(count, rowSpan);
            if(count <= 1){
                // 結合がある場合のみ、グループ化する
                if(group.length > 1){
                    groups.push(group);
                }
                group = [];
            }
            count--;
        }

        return groups;
    };

    var bar = [
        '<div id="bar_wrapper">',
        '  <div id="bar">',
        '      <form id="quicksearch" action="#" onsubmit="return false;">',
        '        <div class="input_block">',
        '          <input type="text" id="keyword" name="keyword" value="" placeholder="検索キーワード..." />',
        '          <a class="delete" title="検索キーワードを消去" onclick="$(\'#keyword\').val(\'\').trigger(\'keyup\').trigger(\'blur\').focus();"></a>',
        '        </div>',
        '      </form>',
        '      <div id="count"></div>',
        '      <a class="product" href="http://hp.vector.co.jp/authors/VA049605/excel_incremental_search.html" target="_blank">Excelインクリメンタルサーチ ver2.0.13</a>',
        '  </div>',
        '</div>',
    ];
    $(document.body).prepend(bar.join(""));

    var oldValue;
    var timeout;
    $('#keyword').bind('keyup', oldValue, function(){
        var value = $('#keyword').val().trim();
        if(oldValue !== value){
            oldValue = value;
            
            var delay = Math.max(100, 650 / Math.max(1, value.length));
            
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                $('#keyword').trigger('search');
            }, delay);
        }
    });

    // ヘッダを除いた行
    // （ヘッダ = 1行目。ただし、1行目が結合されている場合、結合されている全部の行をヘッダとする）
    var tbody = $('div > table > tbody');
    var header = $('tr:first td', tbody).map(function(){ return this.rowSpan; }).max();
    var rows = $('> tr:gt(' + (header - 1) + ')', tbody).get();
    
    // 結合されている行をグループ化
    var groups = getGroups(rows);
    
    $('#keyword').quicksearch(rows, {
        delay: 0,
        bind: 'search',
        highlightTimer: null,
        onBefore: function(results) {
            clearInterval(this.highlightTimer);
            $(results).unhighlight();       //ハイライト消去
        },
        onAfter: function (results) {
            var keyword = $("#keyword").val().trim();

            if(keyword.length > 0){
                  var current = 0;
                  var self = this;
                  var highlight = function(){
                      var limit = Math.min(results.length, current + 50);
                      $(results.slice(current, limit)).highlight(keyword.split(/[ 　]/));
                      current = limit;

                      if(current != results.length){
                          self.highlightTimer = setTimeout(highlight, 25);
                      }
                  };
                  this.highlightTimer = setTimeout(highlight, 0);
            
                  $("#count").text(results.length + "/" + rows.length);
            }else{
                $("#count").text("");
            }
            
            // セルの結合がある場合、その行はまとめて表示する
            for(var i = 0; i < groups.length; i++){
                var group = $(groups[i]);
                if(group.is(":visible")){
                    group.each(this.show);
                }
            }
        },
        show: function () {
            this.classList.remove("hide");
        },
        hide: function () {
            this.classList.add("hide");
        },
        prepareQuery: function (val) {
            // 半角 or 全角スペースで分割
            return val.toLowerCase()
                      .replace("&", "&amp;")
                      .replace("<", "&lt;")
                      .replace(">", "&gt;")
                      .split(/[ 　]/);
        }
    });
    
    $('#keyword').blur(function(){
        // キーワードが入力されていないときのURLは「 ～.html# 」となる。
        // これをURLとして設定すると、自動でページの先頭へスクロールしてしまう。
        // これだと使いにくいので、設定後にスクロール位置を戻す。
        var top = document.body.scrollTop;
        var left = document.body.scrollLeft;
        location.replace("#" + encodeURIComponent($("#keyword").val()));
        document.body.scrollTop = top;
        document.body.scrollLeft = left;
    });
    
    if(location.hash){
        $("#keyword").val(decodeURIComponent(location.hash.substring(1))).trigger('search');
    }
});