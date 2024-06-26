<!--Code partly from: https://www.chartjs.org/docs/latest/getting-started/ and adapted with https://www.youtube.com/watch?v=JvYK-X2Tf8E
to implement onMount-->
<!--Link for HTML Canvas: https://www.w3schools.com/html/html5_canvas.asp-->
<!-- For more information on the help we recieved for the front-end and back-end, please see the README. -->
<script lang="ts">
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { db } from '$lib/firebase'; // Import Firebase db instance
	import { collection, getDocs } from 'firebase/firestore';
	import type { User } from 'firebase/auth';
	import { authStore } from '$lib/assets/gym/gym';

  let currentUser : User | null
  authStore.subscribe((value) => { // Ensures that the logged in user has their data tied to them
    currentUser = value.user
  })

  let benchData: number[] = []; // Initialize benchData array
  let benchDate: string[] = []; // Initialize benchDate array
  
// Function to fetch data from Firebase
  // Lines 30 - 34 were developed by A.I. and helped us correctly store an array type in the data being fetched.
  // Line 35 - 37 and 116 was suggested by A.I. to help diaplay the graph.
// Change to where only last 24 indexes of the array are taken
async function fetchBench() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users')); // Assuming 'users' is your collection name
    querySnapshot.forEach((doc) => {
      if (doc.id === currentUser?.uid) {
        const data = doc.data().benchInput; // Input of max bench
        const time = doc.data().benchTimeInput; // Input date of bench
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
        labels: benchDate, // x-axis label for date
        datasets: [
          {
            label: 'Max Weight',
            data: benchData, // Data that is stored on the chart
            backgroundColor: 'rgba(255,205,0,1)',
            borderColor: '#FFCD00',
            borderWidth: 2,
            pointBorderColor: "#f8f1e5"
          },
        ],
      },
      options: {
        responsive: true, // allows hovering to show the actual number on the data point
        maintainAspectRatio: true, 
        scales: {
          y: {
            beginAtZero: true, // Starts the y-axis at 0
            // Takes the max in the data array and adds 50 to scale normally
            suggestedMax: Math.max(...benchData) + 50,
            grid: {
              color: '#121212',
              tickColor: '#f8f1e5'
            },
            ticks: {
              color: '#f8f1e5',
            }
          },
          x: {
            offset: true, // Starts the graph line in the middle and expands out as points are added
            grid: {
              color: '#121212',
              tickColor: '#f8f1e5'
            },
            ticks: {
              color: '#f8f1e5',
            }
          },
        },
        plugins: {
          legend: {
            position: "top", // Places line label at the top
            labels: {
              color: '#f8f1e5'
            }
          }
        }
      },
    });
  });
</script>

<!--Adds title and line above chart while connecting it to the canvas -->
<div class="col-8 ring-offset-2">
  <div class="card">
      <div class="card-body">
        <h5 class= "text-cream text-left"> Bench Press Progress </h5>
        <hr>
        <canvas bind:this={canvas}></canvas> 
      </div>
  </div>
</div>