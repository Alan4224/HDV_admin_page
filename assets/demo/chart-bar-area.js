// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
function calculateAndDisplayDetail(data) { 
  const detailList = document.getElementById('detailList'); 
  detailList.innerHTML = ''; // Xóa nội dung cũ 
  const regions = [ 
    { name: "Miền Bắc", key: "Northern", color: "rgba(75, 192, 192, 1)" }, 
    { name: "Miền Trung", key: "Central", color: "rgba(54, 162, 235, 1)" }, 
    { name: "Miền Nam", key: "Southern", color: "rgba(255, 206, 86, 1)" } 
  ]; 
  const rank = ["nhất", "hai", "ba", "tư", "năm"];
  let i =0;
  data.forEach(item => { const totalSales = item.data.find(d => d.region === "TotalSale").sales; // Tạo phần tử li cho mỗi loại xe 
  const listItem = document.createElement('li'); 
  let detailText = `<b>${item.companyAndName} bán chạy thứ ${rank[i]}:</b>`;
  i+=1; 
  regions.forEach(region => { 
    const regionData = item.data.find(d => d.region === region.key); 
    const percentage = ((regionData.sales / totalSales) * 100).toFixed(2); 
    detailText += `<br>&nbsp;&nbsp;&nbsp;&nbsp;<b style="color:${region.color}">${region.name}</b> bán <b>${regionData.sales}</b> xe, chiếm <b>${percentage}%</b> tổng số xe bán được của loại xe.`; }); 
  listItem.innerHTML = detailText; detailList.appendChild(listItem); });
}let myBarChart;
  // URL của API không có tham số tháng
  const apiUrl = 'https://car-management-1.onrender.com/sale/saleplace';

  // Gửi yêu cầu tới API và vẽ biểu đồ
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const space = data.map(item => "xxxxxxxxxxxxx");
      const labels = data.map(item => item.image);
      const regions = ["Northern", "Central", "Southern"];

      const datasets = regions.map(region => ({
        label: region,
        data: data.map(item => item.data.find(d => d.region === region).sales),
        backgroundColor: {
          "Northern": "rgba(75, 192, 192, 0.6)",
          "Central": "rgba(54, 162, 235, 0.6)",
          "Southern": "rgba(255, 206, 86, 0.6)"
        }[region],
        borderColor: {
          "Northern": "rgba(75, 192, 192, 1)",
          "Central": "rgba(54, 162, 235, 1)",
          "Southern": "rgba(255, 206, 86, 1)"
        }[region],
        borderWidth: 1
      }));

      const ctx = document.getElementById("myBarChartcopy").getContext("2d");

      // Xóa biểu đồ cũ nếu tồn tại
      if (myBarChart) {
        myBarChart.destroy();
      }

      // Vẽ biểu đồ cột ngang mới
      myBarChart = new Chart(ctx, {
        type: 'horizontalBar',  // Thay đổi loại biểu đồ thành horizontalBar
        data: {
          labels: space,
          datasets: datasets
        },
        options: {
          responsive: true,
          layout: {
            padding: {
              left: 100  // Thêm lề vào bên trái để tạo không gian cho các hình ảnh
            }
          },
          scales: {
            xAxes: [{
              stacked: true,
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: true
              }
            }],
            yAxes: [{
              stacked: true,
              gridLines: {
                display: false
              },
              ticks: {
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                callback: function(value, index, values) {
                  return '';  // Chúng ta sẽ vẽ hình ảnh thay vì giá trị
                }
              }
            }],
          },
          legend: {
            display: true
          },
          tooltips: {
            enabled: true,
            callbacks: {
              label: function(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const datasetLabel = dataset.label || '';
                const value = dataset.data[tooltipItem.index];
                return `${datasetLabel}: ${value}`;
              }
            }
          },
          animation: {
            onComplete: function() {
              const chartInstance = this.chart;
              const ctx = chartInstance.ctx;

              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              const yScale = this.scales['y-axis-0'];
              const xScale = this.scales['x-axis-0'];

              // Duyệt qua từng nhãn và vẽ hình ảnh
              labels.forEach((label, index) => {
                const x = xScale.getPixelForValue(0) - 120;  // Điều chỉnh x cho các thanh ngang
                const y = yScale.getPixelForTick(index) - 40;  // Điều chỉnh y để căn giữa ảnh
                const img = new Image();
                img.src = label;

                img.onload = function() {
                  ctx.drawImage(img, x, y, 100, 80);  // Điều chỉnh kích thước và vị trí của hình ảnh
                };
              });
            }
          }
        }
      });
      calculateAndDisplayDetail(data);
    })
    .catch(error => {
      console.error('Lỗi khi lấy dữ liệu từ API:', error);
    });
