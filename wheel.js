document.addEventListener('DOMContentLoaded', function() {
  // Add event listener to the spin button
  const spinBtn = document.getElementById('spinbtn');
  const wheel = document.getElementById('wheel');
  const numSlices = 6;  // Number of prize slices
  const sliceDegrees = 360 / numSlices;  // Each slice spans 60 degrees (360/6)

  spinBtn.addEventListener('click', function() {
      // Random spin duration between 1500ms and 3000ms (faster speed)
      const spinDuration = Math.floor(Math.random() * 5000) + 5000; // Spins between 1 and 2 seconds

      // Random degree for starting the spin (between 0 and 360 degrees)
      const randomDegree = Math.floor(Math.random() * 360);

      // Total degrees for the spin (3 full rotations + random starting position)
      const finalDegree = randomDegree + (360 * 3); // 3 full rotations (360 * 3)

      // Apply the rotation with a smooth transition
      wheel.style.transition = `transform ${spinDuration}ms ease-out`;
      wheel.style.transform = `rotate(${finalDegree}deg)`;

      // After the spin ends, calculate which slice landed on
      setTimeout(function() {
          // Get the angle of the final rotation modulo 360 to get a value between 0 and 359
          const landingDegree = finalDegree % 360;

          // Determine which slice was landed on by dividing the degree by the size of each slice
          const landingSlice = Math.floor(landingDegree / sliceDegrees);

          // Determine the URL based on the landing slice (Prize 4 is at slice index 3)
          let prizeUrl;
          switch (landingSlice) {
              case 3: // If the wheel lands on Slice 4
                  prizeUrl = "prize.html";
                  break;
              default: // If the wheel lands on any other slice (Prize 1, 2, 3, 5, or 6)
                  prizeUrl = "tryagain.html";
                  break;
          }

          // Redirect to the appropriate URL
          window.location.href = prizeUrl;

      }, spinDuration); // Timeout matches the spin duration
  });
});



