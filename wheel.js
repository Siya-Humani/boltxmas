document.addEventListener('DOMContentLoaded', function() {
  const spinBtn = document.getElementById('spinbtn');
  const wheel = document.getElementById('wheel');
  const numSlices = 6;  // Number of prize slices
  const sliceDegrees = 360 / numSlices;  // Each slice spans 60 degrees

  spinBtn.addEventListener('click', function() {
    // Random spin duration between 1500ms and 3000ms
    const spinDuration = Math.floor(Math.random() * 2000) + 3000;
    const randomDegree = Math.floor(Math.random() * 360);
    const finalDegree = randomDegree + (360 * 3);  // 3 full rotations

    // Set the transition for the spin
    wheel.style.transition = `transform ${spinDuration}ms ease-out`;
    wheel.style.transform = `rotate(${finalDegree}deg)`;

    // After spin, listen for the end of the transition
    wheel.addEventListener('transitionend', function() {
      // Calculate the landing slice
      const landingDegree = finalDegree % 360;
      const landingSlice = Math.floor(landingDegree / sliceDegrees);

      const prizeSliceIndex1 = 2;  // Slice 4 (first prize) is indexed at 2
  
      if (landingSlice === prizeSliceIndex1) {
        // Player landed on Slice 4 (first prize)
        localStorage.setItem('prizeWon', 'true');
        localStorage.setItem('prizeType', 'first');
        window.location.href = 'firstcongrats.html';
      } else {
        // Player landed on any other slice (no prize)
        localStorage.setItem('prizeWon', 'false');
        window.location.href = 'tryagain.html';
      }
    });
  });
});

