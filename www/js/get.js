function feed_init(){
    navigator.notification.alert("called", app.alertCallback);
    
    $.getJSON(SERVER_URL+"public_lib/get_init",function(data){
        
        no_of_notif = data.length;
        
        $('#notif_display').html('');
        
        for(i=0; i < no_of_notif ; i++){
            $('#notif_display').append('<li><a class="" id="notif" href="#post" data-transition="slide" onclick="get_post('+data[i].post_id+')"><h2>'+ data[i].dnn_post_title +'</h2><p>'+moment(data[i].dnn_post_date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p></a></li>');
        }
    
        first = data[0].post_id ;
        last = data[no_of_notif - 1].post_id;
        
        $('#footer ul').append('<li><a onclick="load_more('+last+')" href="#"><h1>Load more</h1></a></li>');
        
        $('#notif_display').listview('refresh');
        $('#footer ul').listview('refresh');
        
    });
}