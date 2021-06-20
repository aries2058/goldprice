$(function(){
    if(_user != null){
        _.each(_user.roleSet, function(v){
            if(v == "ADMIN"){
                $('#menu-admin').show();
            }
        })
    }
})