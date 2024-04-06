
<!-- <script>
    import Chart from './components/Chart.svelte';
    // Video: https://www.youtube.com/watch?v=s7rk2b1ioVE explains how data can be added to a secific chart in 'Chart.svelte'
</script>

<main> 
    Code taken from https://codesandbox.io/p/devbox/blissful-rumple-khj7ue?file=%2FApp.svelte%3A5%2C7 for setting up line chart
    <Chart />
</main>
-->

<!--Code from: https://www.chartjs.org/docs/latest/getting-started/ -->
<!--Link for HTML Canvas: https://www.w3schools.com/html/html5_canvas.asp-->

  
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
  
