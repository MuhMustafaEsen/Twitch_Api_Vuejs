<template>

   <div id="GetTopStreamersContainer">
       <topNavBarLinks></topNavBarLinks>
       <div class="topNavContain">
       <h1>Populer Yayincilarin Listesi</h1>
        
       <div id="topStreamers">
           <div class="topStreamer" v-for='topStreamer in listOfTopStreamers' :key='topStreamer.id'>
                <a href="">
                    <div class="topStreamerLink">
                        <div class="topStreamerThumnailContainer">
                            <img class="topStreamerThumbnail" :src="`${topStreamer.thumbnail_url}`" alt=""> 
                        </div>
                        <div class="topStreamerDescription">
                            <span class="streamTitle">
                                <strong>{{topStreamer.stream_title}}</strong>
                            </span>
                            <span class="userName">
                                <strong>Yayinci ismi = {{topStreamer.user_name}}</strong>
                            </span>
                            <span class="streamViewCount">
                                <strong>İzlenme Sayisi = {{topStreamer.viewer_count}}</strong>
                            </span>
                        </div>
                    </div>
                </a>
</div>
           </div>
       </div>
       </div> 
</template>
<script>
//M:\VUEjs\TwitchVue\node_modules
import topNavBarLinks from '../components/topNavBarLinks';

export default {
name:'GetTopStreamers',    
components:{
    topNavBarLinks, 
},
data  :function() {
    return{
        listOfTopStreamers: [],
    }
},
methods:{
    //oauth:fturgq17enifgq6f5lrkhlzr446y0t chat
    //31094548
    getmember :function()
    {
        
        let fetchLink = 'https://api.twitch.tv/kraken/clips/top?limit=10&channel=azelzagaming';
fetch(fetchLink,{
            method:'get',
            headers: new Headers(
                {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization':'Bearer bfhld5z0whlefszhnx5jscn1h3u6k7',
                    'client-ID':'nn6q9q00mkmrau2trksgt7ygbxwv4x'
                } )
        })
        .then(
            function(response)
            {
                console.log(response.json());
            }
        )
    },
    fetchTopStreamers:function()
    {
        let fetchLink = 'https://api.twitch.tv/helix/streams?first=30';

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
            }
        )
        .then(
            data => {
                console.log(data);
                let dataListOfTopStreamers = [];
                for(var key in data.data){
                    dataListOfTopStreamers.push(
                        {
                            id : data.data[key].id,
                            user_id : data.data[key].user_id,
                            user_name : data.data[key].user_name,
                            game_id : data.data[key].game_id,
                            stream_title : data.data[key].title,
                            viewer_count : data.data[key].viewer_count,
                            thumbnail_url : data.data[key].thumbnail_url.replace('{width}','440').replace('{height}','248'),
                           
                        });
                }
                this.listOfTopStreamers = [...this.listOfTopStreamers,...dataListOfTopStreamers];
            }
        );
    }
},
mounted (){
    this.fetchTopStreamers();
}
}
</script>

<style>
#GetTopStreamersContainer{
     background-color: rgb(62, 185, 185);
}

#topStreamers
{
display: flex;
flex-wrap: wrap;
padding-top: 20px;
background-color:  rgb(250, 206, 156);

}
.topStreamer
{
    flex-basis: 100%;
    overflow: hidden;
    padding: 7px;
    margin-bottom: 7px;
}
.topStreamer a {
    text-decoration: none;
}
.topStreamerThumbnail
{
    width: 100%;
}
.topStreamerDescription .userName
{
    text-decoration: underline;
}
.topStreamerDescription .streamTitle
{
    color: #000;
}
.topStreamerDescription span
{
display: block;

}
@media only screen and (min-width:700px)
{
    #topStreamers .topStreamer
    {
        flex-basis: 50%;
    } 
}
@media only screen and (min-width:1000px)
{
    #topStreamers .topStreamer
    {
        flex-basis: 33.33333333333%;
    } 
}
@media only screen and (min-width:1300px)
{
    #topStreamers .topStreamer
    {
        flex-basis: 25%;
    } 
}
@media only screen and (min-width:1600px)
{
    #topStreamers .topStreamer
    {
        flex-basis: 20%;
    } 
}

</style>