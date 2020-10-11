<template>

   <div id="streamer">
       <div class="streamerNavBar">
       <topNavBarLinks></topNavBarLinks>

       <h1>{{this.streamTitle}}</h1>
        </div>
        <div class="streamerEmbed">
          <div id="twitch-embed"></div>
          <div class="container">
              <div class="row">
                  <div class="col-md-6">
                       <div class="streamInfoContainer">
                       
                        <h3>Oyun adi => {{this.gameName}}
                        
                      </h3>
                        <h4>Yayin Dili => {{this.language}} 
                        
                      </h4>
                        
                      </div>
                  </div>
                  <div class="col-md-6">
            <div class="streamInfoContainer">
                <h3 class="streamerName">Yayinci => {{ $route.params.streamer_user_name }}</h3>
                <h4 class="viewerCount"> Görüntülenme sayisi =>  {{streamViewerCount}} </h4>
            </div>
                  </div>
                  
              </div>
          </div>
           

       </div>
          <div id="twitch_embed_script_link"></div>
       </div> 
       
</template>


 <script src="https://embed.twitch.tv/embed/v1.js"></script>
 
<script>

import topNavBarLinks from '../components/topNavBarLinks';
import $ from 'jquery'
export default {
    
name:'Streamer',    
data:function (){
return {
    streamID :0,
    streamerName:'',
    gameID:'',
    gameName:'',
    streamTitle:'',
    streamViewerCount:0,
    thumbnailUrl:'',
    language:'',
    //listOfTopGames:[],
}
},
components:{
    topNavBarLinks, 
},
methods:
{
   
    fetchStreamInformation:function()
    {
        let fetchLink = 'https://api.twitch.tv/helix/channels?broadcaster_id=' + this.$route.query.streamerID;

        fetch(fetchLink,{
            method:'get',
            headers: new Headers(
                {
                    'Authorization':'Bearer bfhld5z0whlefszhnx5jscn1h3u6k7',
                    'client-ID':'nn6q9q00mkmrau2trksgt7ygbxwv4x',
                } )
        })
        .then(
            function(response)
            {
                return response.json();
                console.log(response);
            }
        )
        .then(data=> 
        {
            //console.log(data);
            this.streamID=data.data[0].broadcaster_id;         
            this.streamerName=data.data[0].broadcaster_name;
            this.gameID=data.data[0].game_id;
            this.gameName=data.data[0].game_name;
            this.streamTitle=data.data[0].title;
            
            //this.streamID=data.data[0],
        });
    },
    insertTwitchEmbedScript : function()
    {
        let twitchEmbedDiv = document.querySelector('#twitch_embed_script_link');
        let twitch_embed_script = document.createElement('script');
        twitch_embed_script.setAttribute('src','https://embed.twitch.tv/embed/v1.js');

        twitchEmbedDiv.appendChild(twitch_embed_script);
    },
    runTwitchEmbed:function()
    {
       console.log(this.$route.params.streamer_user_name); 
        var embed =new Twitch.Embed("twitch-embed", {
        width: 854,
        height: 480,
        channel: this.$route.params.streamer_user_name,
        layout:'vide-with-chat',
      });

      embed.addEventListener(Twitch.Embed.VIDEO_READY,()=>{
          var player = embed.getPlayer();
           player.setVolume(0.5);      
         // player.play();
      });
    },
    fetchStreamViewerCount:function()
    {
        // https://api.twitch.tv/helix/users iikinci bir method ile kullanıcı fotosu
        fetch('https://api.twitch.tv/helix/streams?user_id=' + this.$route.query.streamerID,{
            method : 'get',
            headers : new Headers(
                {
                    'Authorization':'Bearer bfhld5z0whlefszhnx5jscn1h3u6k7',
                    'client-ID':'nn6q9q00mkmrau2trksgt7ygbxwv4x',
                })
                
        })
                .then(
                    function(response)
                    {
                        return response.json();
                    }
                )
                .then(data=>
                {
                    // console.log(data);
                    this.streamViewerCount = data.data[0].viewer_count;
                    this.thumbnailUrl=data.data[0].thumbnail_url.replace('{width}','150').replace('{height}','150');
                 this.language=data.data[0].language;
                })
    }
},
mounted(){
    var that= this;
    this.fetchStreamInformation();
    this.insertTwitchEmbedScript();
    setTimeout(function(){that.runTwitchEmbed();
     $('[data-test-selector="chat-scrollable-area__message-container"]').on("mouseup",function ( event ) 
    {
        alert("");
    });},500)
    
    this.fetchStreamViewerCount();
   
    }
    }
</script>

<style>
.streamerEmbed{
  background-color: rgb(250, 206, 156);
}
.streamerNavBar{
    background-color: rgb(62, 185, 185);
}
.streamInfoContainer{
   
    padding-left: 100px;
    text-align: left;
    
}
.streamInfoContainer .streamerName ,
.streamInfoContainer .viewerCount 
{
font-weight: 100;
}
</style>