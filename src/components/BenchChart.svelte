<!--Code partly from: https://www.chartjs.org/docs/latest/getting-started/ and adapted with https://www.youtube.com/watch?v=JvYK-X2Tf8E
to implement onMount-->
<!--Link for HTML Canvas: https://www.w3schools.com/html/html5_canvas.asp-->
<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { db } from '$lib/firebase'; // Import Firebase db instance
	import { collection, getDocs } from 'firebase/firestore';
	import type { User } from 'firebase/auth';
	import { authStore } from '$lib/assets/gym/gym';

  let currentUser : User | null
  authStore.subscribe((value) => {
    currentUser = value.user
  })

  let benchData: number[] = []; // Initialize benchData array
  let benchDate: string [] = [];
  
// Function to fetch data from Firebase
// Lines 27 - 31 were developed by A.I. and helped us correctly store an array type in the data being fetched.
// Line 78 was suggested by A.I. to help diaplay the graph.
// Change to where only last 24 indexes of the array are taken
async function fetchBench() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users')); // Assuming 'users' is your collection name
    querySnapshot.forEach((doc) => {
      if (doc.id === currentUser?.uid) {
        const data = doc.data().benchInput; // Assuming 'benchInput' is the field where your data is stored
        const time = doc.data().benchTimeInput;
        if (Array.isArray(data)) {
          benchData.push(...data); // Push data into benchData array.
          benchDate.push(...time); // Push data into benchDate array.
        } else {
          console.error('Invalid data format:', data);
          console.error('Invalid date format:', time);
        }
      }    
    });
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
}

// Code for title card for chart and legend position from https://www.youtube.com/watch?v=NySBh_DIRlg
  let canvas: HTMLCanvasElement;
  onMount(async () => {
    await fetchBench(); // Fetch data from Firebase before initializing the chart
    const ctx = canvas.getContext('2d');
    // Line below was given by AI to fix an error with ctx possibly having a null value
    if (!ctx) return;
    new Chart(ctx, {
      // Need to edit later for styling
      type: 'line',
      data: {
        labels: benchDate, // Generate labels based on data length
        // labels: Array.from({ length: benchData.length }, (_, i) => i + 1), // Generate labels based on data length
        datasets: [
          {
            label: 'Max Weight',
            data: benchData,
            backgroundColor: 'rgba(255,205,0,1)',
            borderColor: 'rgba(255,159,64,1)',
            borderWidth: 2,
            pointBorderColor: "white"
          },
        ],
      },
      options: {
      
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            offset: true,
          }
        },
        plugins: {
          legend: {
            position: "bottom"
          }
        }
      },
    });
  });
</script>

<!--Adds ttitle and line above chart while connecting it to the canvas -->
<div class="col-8 ring-offset-2 my-5">
  <div class="card">
      <div class="card-body">
        <h5 class= "text-white"> Bench Press Progress </h5>
        <hr>
        <canvas bind:this={canvas}></canvas> 
      </div>
  </div>
</div>