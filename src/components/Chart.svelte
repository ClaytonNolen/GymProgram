<!--Code partly from: https://www.chartjs.org/docs/latest/getting-started/ and adapted with https://www.youtube.com/watch?v=JvYK-X2Tf8E
to implement onMount-->
<!--Link for HTML Canvas: https://www.w3schools.com/html/html5_canvas.asp-->

<script lang="ts">
  import {onMount} from 'svelte';
  import Chart from 'chart.js/auto';
  
  let chartData = [12, 19, 3, 5, 2, 3]; // Possibly where Firebase data
  let labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  let canvas: HTMLCanvasElement;

  onMount(async ()=> {
      const ctx = canvas.getContext('2d');
      // Line below was given by AI to fix an error with ctx possibly having a null value
      if (!ctx) return;

      new Chart(ctx, { // Need to edit later for styling
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
          label: '# of Votes',
          data: chartData,
          backgroundColor: 'rgba(255,159,64,1)',
          borderColor: 'rgba(255,159,64,1)',
          borderWidth: 1
          }]
      },
      options: {
          scales: {
          y: {
              beginAtZero: true
          }
          }
      }
  });
      }
  );

</script>

<div>
  <canvas id="myChart" style = "width = 500x; height= 500px;" bind:this={canvas}></canvas>
</div>