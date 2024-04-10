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

  let chartData: number[] = []; // Initialize chartData array

// Function to fetch data from Firebase
// Lines 27 - 31 were developed by A.I. and helped us correctly store an array type in the data being fetched.
// Line 71 was suggested by A.I. to help diaplay the graph.
async function fetchData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'users')); // Assuming 'users' is your collection name
    querySnapshot.forEach((doc) => {
      if (doc.id === currentUser?.uid) {
        const data = doc.data().testInput; // Assuming 'testInput' is the field where your data is stored
        if (Array.isArray(data)) {
          chartData.push(...data); // Push data into chartData array
        } else {
          console.error('Invalid data format:', data);
        }
      }
    });
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
  }
}

  let canvas: HTMLCanvasElement;
  onMount(async () => {
    await fetchData(); // Fetch data from Firebase before initializing the chart
    const ctx = canvas.getContext('2d');
    // Line below was given by AI to fix an error with ctx possibly having a null value
    if (!ctx) return;
    new Chart(ctx, {
      // Need to edit later for styling
      type: 'line',
      data: {
        labels: Array.from({ length: chartData.length }, (_, i) => i + 1), // Generate labels based on data length
        datasets: [
          {
            label: '# of Votes',
            data: chartData,
            backgroundColor: 'rgba(255,159,64,1)',
            borderColor: 'rgba(255,159,64,1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  });
</script>

<canvas bind:this={canvas}></canvas> 