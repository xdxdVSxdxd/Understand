
var currentCategory = "";
var currentID = "";

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("onClickAd", this.onClickAd, false);
        document.addEventListener("onReceiveAd", this.onReceiveAd, false);
        document.addEventListener("onFailedToReceiveAd", this.onFailedToReceiveAd, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // inizia a fare cose
        if(id=='deviceready'){
            if ( window.plugins && window.plugins.iAd ) {
                window.plugins.iAd.createBannerView({
                                                    'bannerAtTop': false,
                                                    'overlap': false,
                                                    'offsetTopBar' : false
                                                    }, function() {
                                                        window.plugins.iAd.showAd( true );
                                                    }, function(){
                                                        alert( "failed to create ad view" );
                                                    });
            } else {
                alert('iAd plugin not available/ready.');
            }
            this.fetchContent();
        }
    },
    onClickAd: function() {
        // count click
    },
    onReceiveAd: function() {
        // do whatever you want
    },
    onFailedToReceiveAd: function( ret ) {
        // alert( ret.error );
        // no need to handle it, sometimes ad just not loaded in time, but iad will try reload,
        // once it's loaded, it will be displayed.
    },
    fetchContent: function(){

        $("div#refreshing").fadeIn("slow",function(){
            //fetch content from web
            var urlo = "http://artisopensource.net/understand/getIndex.php";
            if(currentCategory!=""){
                urlo = "http://artisopensource.net/understand/getIndex.php?category=" + currentCategory;
            }
            if(currentID!=""){
                urlo = "http://artisopensource.net/understand/getIndex.php?pid=" + currentID;
            }
            $.getJSON(urlo, function(data) {
              //alert("success");
              
              //console.log(data);
              
              $("div#refreshing").fadeOut("slow");
              
              
              $("div#content").html("");
              var con = "";
              for(var i = 0; i<data.length; i++){
                con = con + "<div class='contentitem'>";

                if(data[i].image!=""){
                    con = con + "<a href='javascript:turnon(" + data[i].ID + ");'><div class='contentimage'><img src='"  + data[i].image +  "' class='posthumb' border='0' /></div></a>";    
                }
                
                con = con + "<a href='javascript:turnon(" + data[i].ID + ");'><div class='contenttitle' id='conttitle" + data[i].ID + "'>"  + data[i].title +  "</div></a>";
                con = con + "<div class='contentexcerpt' id='contexcerpt" + data[i].ID + "'>"  + data[i].excerpt +  "</div>";

                if(data[i].content && data[i].content!=""){

                    var cc = data[i].content;

                    cc = cc.replace(/(?:\r\n|\r|\n)/g, '<br />');

                    con = con + "<div class='contentcontent' >"  + cc +  "</div>";                    
                }

                con = con + "<div class='categorycontainer'>";
                for(var j =0 ; j<data[i].categories.length; j++){
                    con = con + "<a href='javascript:setCategory(\"" + data[i].categories[j].id + "\");'><div class='categorylink'>" + data[i].categories[j].name + "</div></a>"
                }
                con = con + "</div>";

                con = con + "<div class='commands'>";


                if(data[i].content && data[i].content!=""){
                    con = con + "<a href='javascript:clearPost();' class='commandlink'><i class='icon-left-big'></i></a>";
                }



                //window.plugins.socialsharing.share(\"" + data[i].title + " via @xdxd_vs_xdxd\", null, \"" + data[i].image + "\", \"" + data[i].link + "\");


                con = con + "<a href='#' onclick='window.plugins.socialsharing.shareViaTwitter(\"" + data[i].title + " via @understandapp\", null, \"" + data[i].link + "\");' class='commandlink'><i class='icon-twitter'></i></a>";
                con = con + "<a href='#' onclick='window.plugins.socialsharing.shareViaFacebook(\"" + data[i].title + " via @understandapp\", \"" + data[i].image + "\", \"" + data[i].link + "\"  , function() {console.log(\"share ok\")}, function(errormsg){alert(errormsg)} );' class='commandlink'><i class='icon-facebook-squared'></i></a>";

                con = con + "<a href='#' data-rel='external' onclick='window.open(\"" + data[i].link + "\", \"_system\", \"location=no\");' class='commandlink'><i class='icon-link'></i></a>";

                if(!data[i].content || data[i].content==""){
                    con = con + "<a href='javascript:openPost(" + data[i].ID + ");' class='commandlink'><i class='icon-right-big'></i></a>";
                }

                con = con + "</div>";

                con = con + "</div>";
              }

              $("div#content").html(con);
              

            })
            .success(function() { 
                //alert("second success"); 
            })
            .error(function() { 
                alert("There was an error getting the latest content. Maybe you're not connected to the network? (refresh to try again)"); 
                $("div#refreshing").fadeOut("slow");
            })
            .complete(function() { 
                //alert("complete"); 
            });    
        });

        
    }
};

    function turnon(ID){
        //$("div#conttitle" + ID).toggle("slow");
        $("div#contexcerpt" + ID).toggle("slow");
    }

    function reload(){
        currentCategory = "";
        currentID = '';
        app.fetchContent();
    }

    function setCategory(ID){
        currentCategory = ID;
        app.fetchContent();
    }

    function clearCategory(){
        currentCategory = "";
        app.fetchContent();
    }

    function openPost(ID){
        currentID = ID;
        app.fetchContent();
    }

    function clearPost(ID){
        currentID = '';
        app.fetchContent();
    }
