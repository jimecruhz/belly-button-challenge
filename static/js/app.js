const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

function demoInfo(sample) {
  d3.json(url).then((data) => {
      let metadata = data.metadata.find(obj => obj.id == sample);
      let demoPanel = d3.select("#sample-metadata");

      // Clear previous metadata
      demoPanel.html("");

      // Loop through each key-value pair and append to panel
      Object.entries(metadata).forEach(([key, value]) => {
          demoPanel.append("h6").text(`${key}: ${value}`);
      });
  });
}


function buildBarChart(sample) {
    d3.json(url).then((data) => {
        let sampleData = data.samples.find(obj => obj.id === sample);
        let otu_ids = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
        let sample_values = sampleData.sample_values.slice(0, 10).reverse();
        let otu_labels = sampleData.otu_labels.slice(0, 10).reverse();

        let trace = {
            x: sample_values,
            y: otu_ids,
            text: otu_labels,
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: `Top 10 OTUs for Sample ${sample}`,
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU IDs" }
        };

        Plotly.newPlot("bar", [trace], layout);
    });
}

function buildBubbleChart(sample) {
    d3.json(url).then((data) => {
        let sampleData = data.samples.find(obj => obj.id === sample);
        
        let trace = {
            x: sampleData.otu_ids,
            y: sampleData.sample_values,
            text: sampleData.otu_labels,
            mode: "markers",
            marker: {
                size: sampleData.sample_values,
                color: sampleData.otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: `OTU Bubble Chart for Sample ${sample}`,
            xaxis: { title: "OTU ID" },
            yaxis: { title: "Sample Values" },
            height: 500
        };

        Plotly.newPlot("bubble", [trace], layout);
    });
}

function initialize() {
    d3.json(url).then((data) => {
        var select = d3.select("#selDataset");
        let sampleNames = data.names;

        if (sampleNames && sampleNames.length > 0) {
            sampleNames.forEach((sample) => {
                select.append("option").text(sample).property("value", sample);
            });

            let firstSample = sampleNames[0];
            demoInfo(firstSample);
            buildBarChart(firstSample);
            buildBubbleChart(firstSample);
        }
    });
}

function optionChanged(newSample) {
    demoInfo(newSample);
    buildBarChart(newSample);
    buildBubbleChart(newSample);
}

initialize();

function buildBubbleChart(sample) {
  d3.json(url).then((data) => {
      let sampleData = data.samples.find(obj => obj.id === sample);
      
      let trace = {
          x: sampleData.otu_ids,          // x-axis: otu_ids
          y: sampleData.sample_values,    // y-axis: sample_values
          text: sampleData.otu_labels,    // Hover text: otu_labels
          mode: "markers",
          marker: {
              size: sampleData.sample_values,  // Marker size: sample_values
              color: sampleData.otu_ids,       // Marker color: otu_ids
              colorscale: "Earth"              // Color scale for better visibility
          }
      };

      let layout = {
          title: `OTU Bubble Chart for Sample ${sample}`,
          xaxis: { title: "OTU ID" },
          yaxis: { title: "Sample Values" },
          height: 500
      };

      Plotly.newPlot("bubble", [trace], layout);
  });
}

