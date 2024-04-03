<script>
    import { Line } from 'svelte-chartjs';
    import 'chart.js/auto';
    import { data } from './GymData.js';
  
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
  
  <Line data={data} width={100} height={50} options={{ maintainAspectRatio: false}} />