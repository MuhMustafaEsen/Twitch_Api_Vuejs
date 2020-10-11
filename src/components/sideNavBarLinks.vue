<template>
    <div id="topsideNavBarLinkContainer">
     <div id="mySidenav" class="sidenav">
         <div v-for='topGame in listOfGames' :key='topGame.gameID'>
            <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
             <a class="topGameDescription" href="#">
               - {{ topGame.gameName }}
            </a>
           </div>
             
</div>
<span style="font-size:30px;cursor:pointer" v-on:click="openNav()">&#9776; Open</span>


    </div>
</template>

<script>
export default {
    
 name:'sideNavBarLinks', 
 
data:function (){   
return {
    listOfGames:[],
}
},
methods:
{
    fetchGames:function()
    {
        let fetchLink = 'https://api.twitch.tv/helix/games/top?first=64';

        fetch(fetchLink,{
            method:'get',
            headers: new Headers(
                {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Authorization':'Bearer bfhld5z0whlefszhnx5jscn1h3u6k7',
                    'client-ID':'nn6q9q00mkmrau2trksgt7ygbxwv4x',      
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
                let datalistOfGames = [];
                for(var key in data.data)
                {

                    datalistOfGames.push(
                        {
                    gameID : data.data[key].id,
                    gameName : data.data[key].name,
                    gameBoxArtURL : data.data[key].box_art_url.replace('{width}','213').replace('{height}','285'),
                        });
                }
                this.listOfGames = [...this.listOfGames,...datalistOfGames]
                console.log(this.listOfGames)
            }
        );
    },
    openNav:function () {
    document.getElementById("mySidenav").style.width = "12%";
},
    closeNav:function () {
   document.getElementById("mySidenav").style.width = "0";
}
},
mounted(){
    this.fetchGames();
    
}
}
</script>

<style>
#topNavBarlinksContainer
{
margin-bottom: 15px;
}
#topNavBarlinksContainer a 
{
    font-size: 25px;
    padding: 10px;
}

.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(250, 206, 156);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  text-align:center;
}

.sidenav a {
  padding: 4px 4px 4px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  color: black;
  display: block;
  transition: 0.3s;

}

.sidenav a:hover{
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}


@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>