<template>
  <div> 
      <h1>{{$dayjs(date).format('MMMM, YYYY')}}</h1>
  </div>
</template>

<script>
export default {
    props:['date']
}
</script>

<style>

</style>