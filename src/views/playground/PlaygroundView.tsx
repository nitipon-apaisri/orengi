import ReactEcharts from "echarts-for-react";
import transactionFormatter from "../../utils/transactionFormattor";
const PlaygroundView = () => {
    const options = {
        tooltip: {},
        legend: [
            // {
            //     data: mockData.categories.map(function (a) {
            //         return a.name;
            //     }),
            // },
        ],
        series: [
            {
                name: "Les Miserables",
                type: "graph",
                layout: "none",
                edgeLabel: {
                    show: false,
                },
                data: transactionFormatter().nodes,
                links: transactionFormatter().links,

                // categories: mockData.categories,
                roam: true,
                label: {
                    show: true,
                    position: "bottom",
                    formatter: "{b}",
                },
                labelLayout: {
                    hideOverlap: true,
                },
                scaleLimit: {
                    min: 0.4,
                    max: 2,
                },
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        width: 5,
                    },
                },
            },
        ],
    };
    return (
        <div>
            <ReactEcharts option={options} style={{ height: 800 }} />
        </div>
    );
};

export default PlaygroundView;
