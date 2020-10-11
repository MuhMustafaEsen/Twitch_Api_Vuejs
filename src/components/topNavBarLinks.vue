<template>
    <div id="topNavBarlinksContainer">
       <router-link to='/'>
           Populer Oyunlari Getir.
       </router-link> | 
       <router-link to='/GetTopStreamers'>
           Populer yayincilari getir.
       </router-link>
    </div>
</template>

<script>
export default {
 name:'topNavBarLinks'   
}
</script>

<style>
#topNavBarlinksContainer
{
    background-color: rgb(62, 185, 185);
margin-bottom: 15px;


}
#topNavBarlinksContainer a 
{
    font-size: 25px;
    padding: 10px;
   
}
</style>