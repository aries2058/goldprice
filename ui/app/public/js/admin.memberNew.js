var sttPage = 1;
var perPage = 30;
$(function(){
    getNewMemberList();
})

function getNewMemberList(){
    $.ajax({
        url: 'http://mnisdh.synology.me:7070/goldprice/api/auth/getNewMemberList',
        success: function(res){
            console.log(res)
            var tmp = _.template($('#tmpl-list').html());
            $('#list').html(tmp({data: res}))
            $('.item').click(function(){
                if(!$(this).next().hasClass('on')){
                    $('.file-area.on').removeClass('on')
                    $(this).next().addClass('on')
                }
            })
        }
    })
}
function getMemberList(){
    $.ajax({
        url: 'http://mnisdh.synology.me:7070/goldprice/api/auth/getMemberList',
        data: {
            sttPage : sttPage,
            perPage : perPage,
            searchVal: $('#searchVal').val(),
            confirm: $('#confirm').val()
        },
        success: function(res){
            console.log(res)
        }
    })
}