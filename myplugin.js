// myPlugin.js
const myPlugin = {
    id: 'myCustomPlugin',  // Unique ID for the plugin
    
    beforeDraw: function(chart) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
  
      // Set the text style for the label
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = 'blue';
      
      // Draw custom text on the chart
      ctx.fillText('Hello from my custom plugin!', chartArea.left + 10, chartArea.top + 30);
  
      // Restore the previous state
      ctx.restore();
    },
  };
  