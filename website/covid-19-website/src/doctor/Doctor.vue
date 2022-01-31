<template>
  <div class="doctor">
    
  </div>
</template>

<script>
//import userAccount from '../components/UserAccount'
export default { 
    
  name: 'Doctor',
  components: {
      //userAccount

  },
  data(){

      return {
          nav : [{

          }]
      }

  },

}
</script>

<style>
.doctor{

    background-image: url('../assets/doctorImage2.jpg')  ;
    background-repeat: no-repeat;
    background-size: cover;
	
  /* Set up proportionate scaling */
    min-height: 100%;
    min-width: 100%;
	
  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
    
  
}

</style>
