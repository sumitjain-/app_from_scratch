function load_more_html(){
    return '<li data-theme="'+CURRENT_THEME+'"><a onclick="load_more()" href="#"><h1>Load more</h1></a></li>';
}

function feed_html(f_id,f_title,f_date){
    return '<li data-theme="'+CURRENT_THEME+'"><a class="" id="notif" href="#post" data-transition="slide" onclick="get_post('+f_id+')"><h4>'+f_title+'</h4><p>'+moment(f_date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p></a></li>';
}

function feed_init(){
    
    $.getJSON(SERVER_URL+"public_lib/get_init",function(data){
        
        no_of_notif = data.length;
        
        $('#notif_display').html('');
        
        for(i=0; i < no_of_notif ; i++){
            $('#notif_display').append(feed_html(data[i].post_id,data[i].dnn_post_title,data[i].dnn_post_date));
        }
    
        FEED_FIRST = data[0].post_id ;
        FEED_LAST = data[no_of_notif - 1].post_id;
        
        $('#footer ul').append(load_more_html());
        
        $('#notif_display').listview('refresh');
        $('#footer ul').listview('refresh');
        
    });
}

function new_feed(){
    
    $.getJSON(SERVER_URL+'public_lib/new_feed/'+FEED_FIRST, function(data){
        
        no_of_notif = data.length ;
        if(data.length == 0 ){
            alert("No new feeds");
        }else{
        for(i=0; i < no_of_notif ; i++){
            $('#notif_display').prepend('<li data-theme="'+CURRENT_THEME+'"><a class="" id="notif" href="#post" data-transition="slide" onclick="get_post('+data[i].post_id+')"><h4>'+ data[i].dnn_post_title +'</h4><p>'+moment(data[i].dnn_post_date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p></a></li>');
            }
            
            FEED_FIRST = data[0].post_id ;
            $('#notif_display').listview('refresh');
        }
              
    });
    
}

function load_more(){
    console.log(FEED_LAST);
    $.getJSON(SERVER_URL+'public_lib/get_next_10/'+FEED_LAST, function(data){
    
        $('#loadMore').remove();
        $('#notif_display').listview('refresh');
        
        no_of_notif = data.length ;
        
        for(i = 0 ; i < no_of_notif ; i++ ){
            $('#notif_display').append('<li data-theme="'+CURRENT_THEME+'"><a class="" id="notif" href="#post" data-transition="slide" onclick="get_post('+data[i].post_id+')"><h4>'+ data[i].dnn_post_title +'</h4><p>'+moment(data[i].dnn_post_date, "DD-MM-YYYY").format("Do MMM YYYY")+'</p></a></li>');
        }
        
        if(no_of_notif != 0){
            FEED_LAST = data[no_of_notif - 1].post_id;
        }
        
        if(FEED_LAST == 167 ){
            $('#footer ul').empty();
            $('#footer ul').append('<li data-theme="b"><h1>No more posts.. </h1></li>');
        }else{
            
            $('#footer ul').append(load_more_html());
        
        }
        $('#notif_display').listview('refresh');
        $('#footer ul').listview('refresh');

    });
    
}

function get_post(postId){
                
    $(".post_headline").html("Loading...");
    $(".post_date").html("Loading...");
    $(".post_content").html("Loading...");
    $(".post_feat_img").attr("src", "");    
                
    $.getJSON(SERVER_URL+'public_lib/get_news/'+postId, function(data){
        var post_date = data[0].dnn_post_date;
        $(".post_headline").html(data[0].dnn_post_title);
        $(".post_date").html("DNN Times | "+moment(data[0].dnn_post_date, "DD-MM-YYYY").format("Do MMM YYYY"));
        $(".post_content").html(data[0].dnn_post_place+": "+ data[0].dnn_post_content);
        if(data[0].dnn_post_feat_img == "" || data[0].dnn_post_feat_img == 'default.jpg'){
            $(".post_feat_img").attr("src", 'img/default.jpg');
        }else{
            $(".post_feat_img").attr("src", SERVER_URL+'img/thumbs/'+data[0].dnn_post_feat_img);    
        }
    }).error(function(){
        $(".post_headline").html("");
        $(".post_date").html("");
        $(".post_content").html("Something went wrong. Please try again later.");
    });
}