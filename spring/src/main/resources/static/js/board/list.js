var sttPage = 0
$(function (){
   getList()

   $(document).on('click', '.link', function (){
       window.open(_host + '/board/detail?id='+$(this).data('bid')+'&typ=' + $('#typ').val());
   })
})
function getList(){
    $.ajax({
        url: _host + '/board/getList',
        data: {
            typ: $('#typ').val(),
            sttPage: sttPage,
            perPage: 50
        },
        success: function (res){
            console.log(res)
            var tmp = _.template($('#tmpl-list').html());
            $('#list').append(tmp({data: res}))
        }
    })
}