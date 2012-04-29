$(document).ready(function(){
    // WebKit�n�u���E�U�ł� 0.5pt �̘g�����\������Ȃ����߁A1pt �ɒu������B
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
        '          <input type="text" id="keyword" name="keyword" value="" placeholder="�����L�[���[�h..." />',
        '          <a class="delete" title="�����L�[���[�h������" onclick="$(\'#keyword\').val(\'\').trigger(\'keyup\').trigger(\'blur\').focus();"></a>',
        '        </div>',
        '      </form>',
        '      <a class="product" href="http://hp.vector.co.jp/authors/VA049605/excel_incremental_search.html" target="_blank">Excel�C���N�������^���T�[�` ver2.0</a>',
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
    
    $('#keyword').quicksearch('div > table > tbody > tr:gt(0)', {
        delay: 50,
        bind: 'search',
        onBefore: function(results) {
            $(results).removeHighlight();       //�n�C���C�g����
        },
        onAfter: function (results) {
            var keyword = $("#keyword").val().split(/[ �@]/);
            for(var i = 0; i < keyword.length; i++){
                if(keyword[i].length != 0){
                    $(results).highlight(keyword[i]);
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
                $("shape", this).css("display", "none");  // �摜���c��
                $("td", this).css("display", "none");     // �����c��
            }
        },
        prepareQuery: function (val) {
            // ���p or �S�p�X�y�[�X�ŕ���
            return val.toLowerCase()
                      .replace("&", "&amp;")
                      .replace("<", "&lt;")
                      .replace(">", "&gt;")
                      .split(/[ �@]/);
        }
    });
    
    $('#keyword').blur(function(){
        location.replace("#" + encodeURIComponent($("#keyword").val()));
    });
    
    if(location.hash){
        $("#keyword").val(decodeURIComponent(location.hash.substring(1))).trigger('keyup');
    }
});