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
                // ����������ꍇ�̂݁A�O���[�v������
                if(group.length > 1){
                    groups.push(group);
                }
                group = [];
            }
            count--;
        }

        return groups;
    };

    // WebKit�n�u���E�U�ł� 0.5pt �̘g�����\������Ȃ����߁A1pt �ɒu������B
    if(navigator.userAgent.indexOf('AppleWebKit/') > -1){
        var borderReplace = function(){
            var borders = ["borderTopWidth", "borderBottomWidth", "borderLeftWidth", "borderRightWidth"];
            for(var i = 0; i < borders.length; i++){
                this.style[borders[i]] = this.style[borders[i]].replace(/0.5/g, '1');
            }
        };
        $(document.styleSheets[0].cssRules).each(borderReplace);
        $('td').each(borderReplace);
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
        '      <a class="product" href="http://hp.vector.co.jp/authors/VA049605/excel_incremental_search.html" target="_blank">Excel�C���N�������^���T�[�` ver2.0.11</a>',
        '  </div>',
        '</div>',
    ];
    $(document.body).prepend(bar.join(""));

    var oldValue;
    $('#keyword').bind('keyup', oldValue, function(){
        var value = $('#keyword').val().trim();
        if(oldValue !== value){
            oldValue = value;
            $('#keyword').trigger('search');
        }
    });

    // �w�b�_���������s
    // �i�w�b�_ = 1�s�ځB�������A1�s�ڂ���������Ă���ꍇ�A��������Ă���S���̍s���w�b�_�Ƃ���j
    var tbody = $('div > table > tbody');
    var header = $('tr:first td', tbody).map(function(){ return this.rowSpan; }).max();
    var rows = $($('> tr:gt(' + (header - 1) + ')', tbody).get().reverse());;
    
    // ��������Ă���s���O���[�v��
    var groups = getGroups(rows);
    
    $('#keyword').quicksearch(rows, {
        delay: 1500,
        bind: 'search',
        onBefore: function(results) {
            $(results).unhighlight();       //�n�C���C�g����
            
            var keyword =  $("#keyword").val().trim();
            this.delay = Math.max(500, 3000 / Math.max(1, keyword.length / 2));
        },
        onAfter: function (results) {
            var keyword = $("#keyword").val().split(/[ �@]/);
            $(results).highlight(keyword);

            // �Z���̌���������ꍇ�A���̍s�͂܂Ƃ߂ĕ\������
            for(var i = 0; i < groups.length; i++){
                var group = $(groups[i]);
                if(group.is(":visible")){
                    group.each(this.show);
                }
            }
        },
        show: function () {
            this.classList.remove("hide");
            if($.browser.msie){
                $("shape", this).css("display", "");
                $("td", this).css("display", "");
            }
        },
        hide: function () {
            this.classList.add("hide");
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
        // �L�[���[�h�����͂���Ă��Ȃ��Ƃ���URL�́u �`.html# �v�ƂȂ�B
        // �����URL�Ƃ��Đݒ肷��ƁA�����Ńy�[�W�̐擪�փX�N���[�����Ă��܂��B
        // ���ꂾ�Ǝg���ɂ����̂ŁA�ݒ��ɃX�N���[���ʒu��߂��B
        var top = document.body.scrollTop;
        var left = document.body.scrollLeft;
        location.replace("#" + encodeURIComponent($("#keyword").val()));
        document.body.scrollTop = top;
        document.body.scrollLeft = left;
    });
    
    if(location.hash){
        $("#keyword").val(decodeURIComponent(location.hash.substring(1))).trigger('keyup');
    }
});