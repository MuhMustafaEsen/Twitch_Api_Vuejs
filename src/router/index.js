import Vue from 'vue'
import VueRouter from 'vue-router'
import GetTopGames from '../views/GetTopGames.vue';
import GetTopStreamers from '../views/GetTopStreamers.vue';
import StreamersForGame from '../views/StreamersForGame.vue';
import Streamer from '../views/Streamer.vue';
import StreamerChannel from '../views/StreamerChannel.vue';
import { BootstrapVue } from 'bootstrap-vue';

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'GetTopGames',
    component: GetTopGames,
  },
  {
    path: '/GetTopStreamers',
    name: 'GetTopStreamers',
    component: GetTopStreamers,

  },
  {
    path:'/StreamersForGame/:game_name',
    name:'StreamersForGame',
    component: StreamersForGame,
  },
  {
    path:'/Streamer/:streamer_user_name',
    name:'Streamer',
    component:Streamer,
  },
  {
    path:'/StreamerChannel/',
    name:'StreamerChannel',
    component:StreamerChannel,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
