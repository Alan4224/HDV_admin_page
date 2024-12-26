// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

const areaapiUrl = 'https://car-management-1.onrender.com/sale/allmonth';

// Hàm lấy dữ liệu từ API và vẽ biểu đồ
function drawAreaChart() {
    fetch(areaapiUrl)
        .then(response => response.json())
        .then(data => {
            // Chuyển đổi dữ liệu từ API thành các giá trị cho biểu đồ
            const labels = data.map(item => `Tháng ${item.month}`);
            const totalSales = data.map(item => item.totalSale);

            var ctx = document.getElementById("monthAreaChart");
            var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Doanh số",
                        lineTension: 0.3,
                        backgroundColor: "rgba(2,117,216,0.2)",
                        borderColor: "rgba(2,117,216,1)",
                        pointRadius: 5,
                        pointBackgroundColor: "rgba(2,117,216,1)",
                        pointBorderColor: "rgba(255,255,255,0.8)",
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(2,117,216,1)",
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: totalSales,
                    }],
                },
                options: {
                    scales: {
                        xAxes: [{
                            time: {
                                unit: 'month'
                            },
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                maxTicksLimit: 6
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                                max: 200000,
                                maxTicksLimit: 5
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, .125)",
                            }
                        }],
                    },
                    legend: {
                        display: false
                    }
                }
            });
        })
        .catch(error => {
            console.error('Lỗi khi lấy dữ liệu từ API:', error);
        });
}

// Gọi hàm vẽ biểu đồ khi trang được tải
drawAreaChart();
