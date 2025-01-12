<script>
    import { onMount } from 'svelte';
    let assignments = [];
    let error = null;
    let loading = true;
  
    onMount(async () => {
      try {
        const res = await fetch('/api/assignments');
        const data = await res.json();
        if (data.success) {
          assignments = data.assignments;
        } else {
          error = data.error || 'Failed to fetch assignments.';
        }
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    });
  </script>
  
  {#if loading}
  <p class="text-center mt-10">Loading upcoming assignments...</p>
  {:else}
    {#if error}
      <p class="text-red-500 text-center mt-10">Error: {error}</p>
    {:else}
      <h1 class="text-2xl font-bold mb-4">Upcoming Assignments</h1>
      <ul class="space-y-4">
        {#each assignments as assignment}
          <li class="p-4 bg-white rounded shadow">
            <h2 class="text-xl font-semibold">{assignment.title}</h2>
            {#if assignment.description}
              <p class="text-gray-700 mt-2" innerHTML={assignment.description}></p>
            {/if}
            {#if assignment.all_dates?.length > 0}
              <p class="text-sm text-gray-500 mt-2">
                Due: {assignment.all_dates[0].due_at}
              </p>
            {/if}
          </li>
        {/each}
      </ul>
    {/if}
  {/if}