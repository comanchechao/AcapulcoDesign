// Generated by @hypernym/nuxt-gsap
import { defineNuxtPlugin } from '#app';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
const plugin = defineNuxtPlugin(() => {
  if(process.client) {
  gsap.registerPlugin(ScrollTrigger,MotionPathPlugin);
  
  
}
  return {
    provide: {
      gsap,
      ScrollTrigger,
MotionPathPlugin
    }
  }
})
export default plugin;