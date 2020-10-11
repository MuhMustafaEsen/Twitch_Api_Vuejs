<template>

    <div class="topNavBarContainer">
     <div class="topNavBar">
         <img class="logo" src="../assets/twitch96.png"/>
       <topNavBarLinks></topNavBarLinks>
       <h1>Populer Oyunlarin Listesi</h1>
      <div class="col-md-2 aa" style="float:left">
          <sideNavBarLinks></sideNavBarLinks>
      </div>
      </div>
      
<div class="col-md-24 maina">
<div class="container">
  <div class="row">
       <div class="col-md-3" v-for='topGame in listOfTopGames' :key='topGame.gameID'>
              <a href="" v-on:click="goToGameStreamersPage(topGame.gameID,topGame.gameName)">
                  <div class="topGameThumbnailContainer">
                  <img class="topGameThumbnail" :src="`${topGame.gameBoxArtURL}`" alt="">
              </div>
              <div class="topGameDescription">
                  {{ topGame.gameName }}
              </div>
              </a> 
           </div>  
 
  </div>
  </div> 
</div>
    </div>
</template>
<script>

import topNavBarLinks from '../components/topNavBarLinks';
import sideNavBarLinks from '../components/sideNavBarLinks';

export default {
name:'GetTopGames',    
data:function (){
return {
    listOfTopGames:[],
}
},
components:{
    topNavBarLinks, 
    sideNavBarLinks,
},
methods:
{
    fetchTopGames:function()
    {
        let fetchLink = 'https://api.twitch.tv/helix/games/top?first=32';

        fetch(fetchLink,{
            method:'get',
            headers: new Headers(
                {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization':'Bearer bfhld5z0whlefszhnx5jscn1h3u6k7',
                    'client-ID':'nn6q9q00mkmrau2trksgt7ygbxwv4x',
                    /* 
                    buradan cliente idmize karşı bi Authorization id üretiyoruz ve uretilen bu id ile kimliklendiriliyoruz.
                    https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=nn6q9q00mkmrau2trksgt7ygbxwv4x&redirect_uri=http://localhost&scope=viewing_activity_read
                    */
                    
                    
                }
            )
        })
        .then(
            function(response)
            {
                return response.json();
            }
        ).then(
            data => {
                console.log(data);
                let datalistOfTopGames = [];
                for(var key in data.data)
                {

                    datalistOfTopGames.push(
                        {
                    gameID : data.data[key].id,
                    gameName : data.data[key].name,
                    gameBoxArtURL : data.data[key].box_art_url.replace('{width}','213').replace('{height}','285'),
                        });
                }
                this.listOfTopGames = [...this.listOfTopGames,...datalistOfTopGames]
                
            }
        );
    },
    goToGameStreamersPage:function(gameID,gameName)
    {
        this.$router.push(
            {
                name:'StreamersForGame',
                params:
                {
                    game_name:gameName,
                },
                query:
                {
                    gameID:gameID,
                },
            }

        );
    }
},
mounted(){
    this.fetchTopGames();
}
}
</script>

<style>
.topNavBarContainer{
    background-color: rgb(62, 185, 185);
}

.logo{
    padding-top: 8px;  
    padding-left: 10px;
    float: left;

}
.aa{
    background-color: rgb(250, 206, 156);
    margin-top: 15px;
    height: 50px;
}
.topGameDescription{
    color:cornflowerblue
}
#topGames{
 display: flex;
 flex-wrap: wrap;
}
.topGame
{
    flex-basis: 100%;  
    padding: 7px;
    margin-bottom: 7px;
}
.maina
{
    padding: 15px;
    background-position: center;
    background-color: rgb(250, 206, 156);
    
width: 100%;
}
.maindata
{
width: 100%;
}
.game{
width: 25%;
float:left;
}
.container{
    flex-wrap: wrap;

}
</style>