document.addEventListener('DOMContentLoaded', function() {
  const spinBtn = document.getElementById('spinbtn');
  const wheel = document.getElementById('wheel');
  const numSlices = 6;  // Number of prize slices
  const sliceDegrees = 360 / numSlices;  // Each slice spans 60 degrees

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];  // Extracts just the date part (YYYY-MM-DD)

  // Load game state from localStorage
  const prizeWon = localStorage.getItem('prizeWon');
  const lastPlayedDate = localStorage.getItem('lastPlayedDate');

  // If the prize is already won or the player has already played today, show the tryagain page
  if (prizeWon === 'true' || lastPlayedDate === today) {
    window.location.href = 'tryagain.html';
  }

  spinBtn.addEventListener('click', function() {
    // Random spin duration between 1500ms and 3000ms
    const spinDuration = Math.floor(Math.random() * 2000) + 3000; 
    const randomDegree = Math.floor(Math.random() * 360);
    const finalDegree = randomDegree + (360 * 3);  // 3 full rotations

    wheel.style.transition = `transform ${spinDuration}ms ease-out`;
    wheel.style.transform = `rotate(${finalDegree}deg)`;

    setTimeout(function() {
      // After the spin ends, calculate which slice landed on
      const landingDegree = finalDegree % 360;
      const landingSlice = Math.floor(landingDegree / sliceDegrees);

      const prizeSliceIndex1 = 2;  // Slice 4 (first prize) is indexed at 2
      const prizeSliceIndex2 = 5;  // Slice 6 (second prize) is indexed at 5

      if (landingSlice === prizeSliceIndex1) {
        // Player landed on Slice 4 (first prize)
        localStorage.setItem('prizeWon', 'true');
        localStorage.setItem('prizeType', 'first');
        localStorage.setItem('hasPlayed', 'true');
        localStorage.setItem('lastPlayedDate', today); // Save the current date
        window.location.href = 'firstcongrats.html';
      } else if (landingSlice === prizeSliceIndex2) {
        // Player landed on Slice 6 (second prize)
        localStorage.setItem('prizeWon', 'true');
        localStorage.setItem('prizeType', 'second');
        localStorage.setItem('hasPlayed', 'true');
        localStorage.setItem('lastPlayedDate', today); // Save the current date
        window.location.href = 'secondcongrats.html';
      } else {
        // Player landed on any other slice (no prize)
        localStorage.setItem('hasPlayed', 'true');
        localStorage.setItem('lastPlayedDate', today); // Save the current date
        window.location.href = 'tryagain.html';
      }
    }, spinDuration);
  });
});

