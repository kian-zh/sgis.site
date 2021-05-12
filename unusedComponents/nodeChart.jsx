import G6 from '@antv/g6'
import React from 'react';
import ReactDOM from 'react-dom';

class NodeChart extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      ref: React.createRef(),
      graph: null,
      data: {
        "id": "Modeling Methods",
        "children": [
          {
            "id": "Classification",
            "children": [
              {
                "id": "Logistic regression"
              },
              {
                "id": "Linear discriminant analysis"
              },
              {
                "id": "Rules"
              },
              {
                "id": "Decision trees"
              },
              {
                "id": "Naive Bayes"
              },
              {
                "id": "K nearest neighbor"
              },
              {
                "id": "Probabilistic neural network"
              },
              {
                "id": "Support vector machine"
              }
            ]
          },
          {
            "id": "Consensus",
            "children": [
              {
                "id": "Models diversity",
                "children": [
                  {
                    "id": "Different initializations"
                  },
                  {
                    "id": "Different parameter choices"
                  },
                  {
                    "id": "Different architectures"
                  },
                  {
                    "id": "Different modeling methods"
                  },
                  {
                    "id": "Different training sets"
                  },
                  {
                    "id": "Different feature sets"
                  }
                ]
              },
              {
                "id": "Methods",
                "children": [
                  {
                    "id": "Classifier selection"
                  },
                  {
                    "id": "Classifier fusion"
                  }
                ]
              },
              {
                "id": "Common",
                "children": [
                  {
                    "id": "Bagging"
                  },
                  {
                    "id": "Boosting"
                  },
                  {
                    "id": "AdaBoost"
                  }
                ]
              }
            ]
          },
          {
            "id": "Regression",
            "children": [
              {
                "id": "Multiple linear regression"
              },
              {
                "id": "Partial least squares"
              },
              {
                "id": "Multi-layer feedforward neural network"
              },
              {
                "id": "General regression neural network"
              },
              {
                "id": "Support vector regression"
              }
            ]
          }
        ]
      }
    }
  }
  
  componentDidMount() {
      const graph = new G6.TreeGraph({
        container: ReactDOM.findDOMNode(this.state.ref.current),
        width: 1200,
        height: 800,
        modes: {
          default: [
            {
              type: 'collapse-expand',
              onChange: function onChange(item, collapsed) {
                const data = item.get('model').data;
                data.collapsed = collapsed;
                return true;
              },
            },
            'drag-canvas',
            'zoom-canvas',
          ],
        },
        defaultNode: {
          size: 26,
          anchorPoints: [
            [0, 0.5],
            [1, 0.5],
          ],
          style: {
            fill: '#C6E5FF',
            stroke: '#5B8FF9',
          },
        },
        defaultEdge: {
          type: 'cubic-horizontal',
          style: {
            stroke: '#A3B1BF',
          },
        },
        layout: {
          type: 'mindmap',
          direction: 'H',
          getHeight: () => {
            return 16;
          },
          getWidth: () => {
            return 16;
          },
          getVGap: () => {
            return 10;
          },
          getHGap: () => {
            return 50;
          },
        },
      });
      graph.data(this.state.data)
      graph.render()
      graph.fitView();
      this.setState({graph: graph})
  }

  render() {
    return(
      <div ref={this.state.ref}></div>
    )
  }
}

export default NodeChart;