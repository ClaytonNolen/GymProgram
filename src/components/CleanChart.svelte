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
    authStore.subscribe((value) => {
      currentUser = value.user
    })
  
    let cleanData: number[] = []; // Initialize cleanData array
    let cleanDate: number[] = [];

  // Function to fetch data from Firebase
  // Lines 29 - 34 were developed by A.I. and helped us correctly store an array type in the data being fetched.
  // Line 35 - 37 and 113 was suggested by A.I. to help diaplay the graph.
  async function fetchClean() {
    try {
      const querySnapshot = await getDocs(collection(db, 'users')); // Assuming 'users' is your collection name
      querySnapshot.forEach((doc) => {
        if (doc.id === currentUser?.uid) {
          const data = doc.data().powerCleanInput; // Assuming 'powerCleanInput' is the field where your data is stored
          const time = doc.data().powerCleanTimeInput;
          if (Array.isArray(data)) {
            cleanData.push(...data); // Push data into cleanData array
            cleanDate.push(...time);
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
      await fetchClean(); // Fetch data from Firebase before initializing the chart
      const ctx = canvas.getContext('2d');
      // Line below was given by AI to fix an error with ctx possibly having a null value
      if (!ctx) return;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: cleanDate, // x-axis label for date
          datasets: [
            {
            label: 'Max Weight',
            data: cleanData,
            backgroundColor: 'rgba(255,205,0,1)',
            borderColor: '#FFCD00',
            borderWidth: 2,
            pointBorderColor: "#f8f1e5"
          },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          scales: {
            y: {
              beginAtZero: true,
              // Takes the max in the data array and adds 50 to scale normally
              suggestedMax: Math.max(...cleanData) + 50,
              grid: {
              color: '#121212',
              tickColor: '#f8f1e5'
            },
            ticks: {
              color: '#f8f1e5',
            }
          },
          x: {
            offset: true,
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
  
  <!--Adds title and line above chart while connecting it to the canvas -->
  <div class="col-8 ring-offset-2 my-5">
    <div class="card">
        <div class="card-body">
          <h5 class= "text-cream text-left"> Power Clean Progress </h5>
          <hr>
          <canvas class = "mt-4 mb-10" bind:this={canvas}></canvas> 
        </div>
    </div>
  </div>