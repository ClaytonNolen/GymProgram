 <!-- <script>
    import { Line } from 'svelte-chartjs';
    import 'chart.js/auto';
    import { data } from './data.js';
  
    import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale,
    } from 'chart.js';
  
    ChartJS.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      LinearScale,
      PointElement,
      CategoryScale
    );
  </script>
  -->
  <!--<Line data={data} options={{ responsive: true}} />-->

  <script lang="ts">
    import {onMount} from 'svelte';
    import Chart from 'chart.js/auto';
    
    let chartData = [12, 19, 3, 5, 2, 3];
    let labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
    let canvas: HTMLCanvasElement;

    onMount(async ()=> {
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
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
    <canvas id="myChart" width = "100" height="100" bind:this={canvas}></canvas>
</div>
  