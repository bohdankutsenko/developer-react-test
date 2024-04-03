import { useEffect } from "react";
import {
  Box,
  Paper,
  TableContainer,
} from "@mui/material";
import { HeatmapProps } from "./Heatmap.props";

var Highcharts = require('highcharts/highmaps');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

export const HighchartsWidget = (props: HeatmapProps) => {
  const { tableData, tableHeaders } = props;
  
  useEffect(() => {
    const value = tableData.map((x) => x.slice(1));
    const data:any = [];
    for (let j = 0; j < value[0].length; j++) {
      for (let i = 0; i < value.length; i++) {
        data.push([j, i, value[i][j]]);
      }
    }
    // Create the chart inside useEffect to ensure DOM is ready
    Highcharts.chart('container', {
      chart: {
        type: 'heatmap',
        backgroundColor: '#f7f7f7',
        marginTop: 40,
        marginBottom: 80,
        plotBorderWidth: 1
      },

      title: {
        text: 'Versions',
        style: {
          fontSize: '1em'
        }
      },

      xAxis: {
        categories: tableHeaders.slice(1)
      },

      yAxis: {
        categories: tableData.map((x) => x.slice(0, 1)),
        title: null,
        reversed:false
      },

      accessibility: {
        point: {
          descriptionFormat: '{(add index 1)}. ' +
            '{series.xAxis.categories.(x)} sales ' +
            '{series.yAxis.categories.(y)}, {value}.'
        }
      },

      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: Highcharts.getOptions().colors[7]
      },

      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },

      tooltip: {
        format: '<b>{series.xAxis.categories.(point.x)}</b> sold<br>' +
          '<b>{point.value}</b> items on <br>' +
          '<b>{series.yAxis.categories.(point.y)}</b>'
      },

      series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        data: data,
        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }],

      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            yAxis: {
              labels: {
                format: '{substr value 0 1}'
              }
            }
          }
        }]
      }
    });
  }, [tableHeaders, tableData]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <div id="container" className="container"></div>
      </TableContainer>
    </Box>
  );
};
