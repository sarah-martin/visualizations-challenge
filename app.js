function buildPlot() {
    // Read json data
    d3.json("samples.json").then(function(data) {
        console.log(data);
        
        // Set variables by pulling from data
        var sampleValues = data.samples[0].sample_values;
        var topSampleValues = data.samples[0].sample_values.slice(0,10).reverse();

        var ids = data.samples[0].otu_ids;
        var topIds = data.samples[0].otu_ids.slice(0,10).reverse();
        var topIdLabels = topIds.map(d => "OTU" + d);

        var labels = data.samples[0].otu_labels;
        var topLabels = data.samples[0].otu_labels.slice(0,10).reverse();

        // Build the BAR CHART
        var trace1 = {
            x: topSampleValues,
            y: topIdLabels,
            type: "bar",
            text: topLabels,
            orientation: "h"
        };

        var data1 = [trace1];
        var layout1 = {
            title: "Patient's Top 10 OTUs",
        };

        Plotly.react("bar", data1, layout1);

        // Build the BUBBLE CHART
        var trace2 = {
            x: ids,
            y: sampleValues,
            mode: "markers",
            text: labels,
            marker: {
                color: ids,
                size: sampleValues
            }
        };

        var data2 = [trace2];
        var layout2 = {
            title: "Patient OTUs",
            xaxis: {title: "OTU IDs"},
        };

        Plotly.react("bubble", data2, layout2);

    })};

    buildPlot();