
<template>
    <div id="streamersForGameContainer">
        <topNavBarLinks></topNavBarLinks>
        <h1>
         {{ $route.params.game_name }} Oyunu Yayıncıları
        </h1>
        <div id="topStreamersForGame">
            <div class="topStreamerForGame" v-for='topStreamerForGame in listOfTopStreamersForGame' :key='topStreamerForGame.id'>
                <a :href="`../streamer/${topStreamerForGame.user_name}?streamerID=${topStreamerForGame.user_id}`"  class="topStreamersForGameLink">
            <div class="topStreamerForGameThumbnailContainer">
                <img :src="`${topStreamerForGame.stream_thumbnail_url}`" alt="" class="topStreamerForGameThumbnail">
            </div>
            <div class="topStreamerForGameDescription">
                <div class="username">{{topStreamerForGame.user_name}}</div>
                <div class="viewCount">İzlenme Sayisi : {{  topStreamerForGame.stream_viewer_count  }}</div>
            
            </div>
                </a>
            </div>

        </div>
    </div>
</template>
<script>
import topNavBarLinks from '../components/topNavBarLinks';
export default {
    props:{
        stream_viewer_count:String,
    },
    name: 'StreamersForGame',
    components: {
        topNavBarLinks,
    },
data:function()
{
    return{
    listOfTopStreamersForGame : [],
}
},
methods:
{
   
fetchTopStreamsForGame : function()
{
    let fetchLink = 'https://api.twitch.tv/helix/streams?first=30&game_id=' + this.$route.query.gameID;

    fetch(fetchLink,{
        method :'get',
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
        }
    )
    .then(data => 
    {
        console.log(data)
        let dataListOfTopStreamersForGame = [];
        
        for(var key in data.data){
                dataListOfTopStreamersForGame.push(
                    {
                        id:data.data[key].id,
                        user_id:data.data[key].user_id,
                        user_name:data.data[key].user_name,
                        title:data.data[key].title,
                        stream_thumbnail_url:data.data[key].thumbnail_url.replace('{width}','440').replace('{height}','248'),
                        stream_viewer_count:data.data[key].viewer_count,
                       
                    });
        }
        this.listOfTopStreamersForGame =  [...this.listOfTopStreamersForGame,...dataListOfTopStreamersForGame]
    });
}
},
mounted ()
{
    this.fetchTopStreamsForGame();
    
}
}
</script>
<style>
#streamersForGameContainer{
    background-color:rgb(62, 185, 185);
}
#topStreamersForGame{
    display: flex;
    flex-wrap: wrap;
    background-color: rgb(250, 206, 156);
    padding-top: 15px;
}
.topStreamerForGame{
    flex-basis: 100%;
    padding: 7px;
    margin-bottom: 7px;
}
.topStreamerForGameThumbnail {
    width: 100%;
}
@media only screen and (min-width: 600px) {
    .topStreamerForGame {
         flex-basis: 50%;   
    }  
}
@media only screen and (min-width: 900px) {
    .topStreamerForGame {
         flex-basis: 33.33333333%;   
    }  
}
@media only screen and (min-width: 1200px) {
    .topStreamerForGame {
         flex-basis: 25%;   
    }  
}
@media only screen and (min-width: 1500px) {
    .topStreamerForGame {
         flex-basis: 20%;   
    }  
}

</style>