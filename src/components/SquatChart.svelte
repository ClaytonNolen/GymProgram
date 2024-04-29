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
    authStore.subscribe((value) => { // Ensures that the logged in user has their data tied to them
      currentUser = value.user
    })
  
    let squatData: number[] = []; // Initialize squatData array
    let squatDate: string[] = []; // Initialize squatDate array

  // Function to fetch data from Firebase
  // Lines 27 - 31 were developed by A.I. and helped us correctly store an array type in the data being fetched.
  // Line 78 was suggested by A.I. to help diaplay the graph.
  async function fetchSquat() {
    try {
      // Assuming 'users' is your collection name.
      const querySnapshot = await getDocs(collection(db, 'users'));
      // For each doc in the query snapshot...
      querySnapshot.forEach((doc) => {
        if (doc.id === currentUser?.uid) {
          const data = doc.data().squatInput; // Input of max squat weight.
          const time = doc.data().squatTimeInput; // Input date of squat
          if (Array.isArray(data)) {  // If array has data.
            squatData.push(...data); // Push data into squatData array
            squatDate.push(...time); // Push data into squatData array
          } else {
            console.error('Invalid data format:', data);
            console.error('Invalid data format:', time);
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
      await fetchSquat(); // Fetch data from Firebase before initializing the chart
      const ctx = canvas.getContext('2d');
      // Line below was given by AI to fix an error with ctx possibly having a null value
      if (!ctx) return;
        new Chart(ctx, {
        type: 'line',
        data: {
          labels: squatDate, // Generate labels based on data length
          datasets: [
            {
            label: 'Max Weight',
            data: squatData, // Data that is stored on the chart
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
              suggestedMax: Math.max(...squatData) + 50,
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
            position: "top",
            labels: {
              color: '#f8f1e5'
            }
            }
          }
        },
      });
    });
  </script>
  
  <!--Adds ttitle and line above chart while connecting it to the canvas -->
  <div class="col-8 ring-offset-2">
    <div class="card">
        <div class="card-body">
          <h5 class= "text-cream text-left"> Squat Progress </h5>
          <hr>
          <canvas bind:this={canvas}></canvas> 
        </div>
    </div>
  </div>
  
