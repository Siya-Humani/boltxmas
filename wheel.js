document.addEventListener('DOMContentLoaded', function() {
  const spinBtn = document.getElementById('spinbtn');
  const wheel = document.getElementById('wheel');
  const numSlices = 6;  // Number of prize slices
  const sliceDegrees = 360 / numSlices;  // Each slice spans 60 degrees
  
  // Load game state from localStorage
  const prizeWon = localStorage.getItem('prizeWon');
  const hasPlayed = localStorage.getItem('hasPlayed');

  // If prize is won, or player has already played, show tryagain page
  if (prizeWon === 'true') {
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

      const prizeSliceIndex1 = 2;  // Slice 4 (first prize) is indexed at 3
      const prizeSliceIndex2 = 5;  // Slice 6 (second prize) is indexed at 5
      
      if (landingSlice === prizeSliceIndex1) {
        // Player landed on Slice 4 (first prize)
        localStorage.setItem('prizeWon', 'true');
        localStorage.setItem('prizeType', 'first'); // Optional: Store which prize was won
        localStorage.setItem('hasPlayed', 'true');
        window.location.href = 'firstcongrats.html';  // Redirect to the first prize congrats page
      } else if (landingSlice === prizeSliceIndex2) {
        // Player landed on Slice 6 (second prize)
        localStorage.setItem('prizeWon', 'true');
        localStorage.setItem('prizeType', 'second'); // Optional: Store which prize was won
        localStorage.setItem('hasPlayed', 'true');
        window.location.href = 'secondcongrats.html';  // Redirect to the second prize congrats page
      } else {
        // Player landed on any other slice (no prize)
        localStorage.setItem('hasPlayed', 'true');
        window.location.href = 'tryagain.html';  // Redirect to try again page
      }
      
    }, spinDuration);
  });
});
