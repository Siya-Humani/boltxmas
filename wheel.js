document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the spin button
    const spinBtn = document.getElementById('spinbtn');
    const wheel = document.getElementById('wheel');
    const numSlices = 6;  // Number of prize slices
    const sliceDegrees = 360 / numSlices;  // Each slice spans 60 degrees (360/6)
  
    // Function to check if the player can play today
    function canPlayToday() {
      const lastPlayed = localStorage.getItem('lastPlayedDate');
      const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
      return lastPlayed !== today;
    }


    // Function to check if a prize has already been claimed today
    function hasClaimedPrize(prize) {
      const claimedPrizes = JSON.parse(localStorage.getItem('claimedPrizes')) || {};
      return claimedPrizes[prize] === true;
    }
  
    // Function to mark a prize as claimed
    function claimPrize(prize) {
      let claimedPrizes = JSON.parse(localStorage.getItem('claimedPrizes')) || {};
      claimedPrizes[prize] = true;
      localStorage.setItem('claimedPrizes', JSON.stringify(claimedPrizes));
    }
  
    spinBtn.addEventListener('click', function() {
      if (!canPlayToday()) {
        alert("You've already played today. Come back tomorrow!");
        return; // Prevent further actions if player already played today
      }
  
      // Random spin duration between 1500ms and 3000ms (faster speed)
      const spinDuration = Math.floor(Math.random() * 5000) + 5000; // Spins between 1 and 2 seconds
  
      // Random degree for starting the spin (between 0 and 360 degrees)
      const randomDegree = Math.floor(Math.random() * 360);
  
      // Total degrees for the spin (3 full rotations + random starting position)
      const finalDegree = randomDegree + (360 * 3); // 3 full rotations (360 * 3)
  
      // Apply the rotation with a smooth transition
      wheel.style.transition = transform ${spinDuration}ms ease-out;
      wheel.style.transform = rotate(${finalDegree}deg);
  
      // After the spin ends, calculate which slice landed on
      setTimeout(function() {
        // Get the angle of the final rotation modulo 360 to get a value between 0 and 359
        const landingDegree = finalDegree % 360;
  
        // Determine which slice was landed on by dividing the degree by the size of each slice
        const landingSlice = Math.floor(landingDegree / sliceDegrees);
  
        // Determine the prize URL based on the landing slice (Prize 3 is at slice index 2, Prize 1 at slice index 0)
        let prizeUrl;
        switch (landingSlice) {
          case 0: // If the wheel lands on Prize 1
            if (hasClaimedPrize(1)) {
              alert("Prize 1 has already been claimed today. Try again tomorrow!");
              return; // Prevent multiple claims of Prize 1
            }
            prizeUrl = "merch.html"; // Redirect to Prize 1 page
            claimPrize(1); // Mark Prize 1 as claimed
            break;
          case 2: // If the wheel lands on Prize 3
            if (hasClaimedPrize(3)) {
              alert("Prize 3 has already been claimed today. Try again tomorrow!");
              return; // Prevent multiple claims of Prize 3
            }
            prizeUrl = "merch.html"; // Redirect to Prize 3 page
            claimPrize(3); // Mark Prize 3 as claimed
            break;
          default:
            prizeUrl = "tryagain.html"; // Redirect to try again page for other prizes
            break;
        }
  
        // Set the last played date
        setLastPlayedDate();
  
        // Redirect to the appropriate URL
        window.location.href = prizeUrl;
  
      }, spinDuration); // Timeout matches the spin duration
    });
  });

  


