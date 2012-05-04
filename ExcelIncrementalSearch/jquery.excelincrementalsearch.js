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

    // WebKit系ブラウザでは 0.5pt の枠線が表示されないため、1pt に置換する。
    if(navigator.userAgent.indexOf('AppleWebKit/') > -1){
        var regex = /0.5/g;
        $(document.styleSheets[0].cssRules).each(function(){
            var borders = ["borderWidth", "borderTopWidth", "borderBottomWidth", "borderLeftWidth", "borderRightWidth"];
            for(var i = 0; i < borders.length; i++){
                this.style[borders[i]] = this.style[borders[i]].replace(regex, '1');
            }
        });
    }

    var bar = [
        '<div id="bar_wrapper">',
        '  <div id="bar">',
        '      <form id="quicksearch" action="#" onsubmit="return false;">',
        '        <div class="input_block">',
        '          <input type="text" id="keyword" name="keyword" value="" placeholder="検索キーワード..." />',
        '          <a class="delete" title="検索キーワードを消去" onclick="$(\'#keyword\').val(\'\').trigger(\'keyup\').trigger(\'blur\').focus();"></a>',
        '        </div>',
        '      </form>',
        '      <a class="product" href="http://hp.vector.co.jp/authors/VA049605/excel_incremental_search.html" target="_blank">Excelインクリメンタルサーチ ver2.0.1</a>',
        '  </div>',
        '</div>',
    ];
    $(document.body).prepend(bar.join(""));

    var oldValue;
    $('#keyword').bind('keyup', oldValue, function(){
        var value = $('#keyword').val();
        if(oldValue !== value){
            oldValue = value;
            $('#keyword').trigger('search');
        }
    });
    
    var rows = $('div > table > tbody > tr:gt(0)');
    var groups = getGroups(rows)
    
    $('#keyword').quicksearch(rows, {
        delay: 50,
        bind: 'search',
        onBefore: function(results) {
            $(results).removeHighlight();       //ハイライト消去
        },
        onAfter: function (results) {
            var keyword = $("#keyword").val().split(/[ 　]/);
            for(var i = 0; i < keyword.length; i++){
                if(keyword[i].length != 0){
                    $(results).highlight(keyword[i]);
                }
            }

            // セルの結合がある場合、その行はまとめて表示する
            for(var i = 0; i < groups.length; i++){
                var group = $(groups[i]);
                if(group.is(":visible")){
                    group.each(function(){
                        this.style.display = "";
                        if($.browser.msie){
                            $("shape", this).css("display", "");
                            $("td", this).css("display", "");
                        }
                    });
                }
            }
        },
        show: function () {
            this.style.display = "";
            if($.browser.msie){
                $("shape", this).css("display", "");
                $("td", this).css("display", "");
            }
        },
        hide: function () {
            this.style.display = "none";
            if($.browser.msie){
                $("shape", this).css("display", "none");  // 画像が残る
                $("td", this).css("display", "none");     // 線が残る
            }
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
        location.replace("#" + encodeURIComponent($("#keyword").val()));
    });
    
    if(location.hash){
        $("#keyword").val(decodeURIComponent(location.hash.substring(1))).trigger('keyup');
    }
});