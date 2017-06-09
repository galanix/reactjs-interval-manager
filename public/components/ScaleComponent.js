import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeMax } from '../action';
import { scaleReady } from '../action';
import SliderComponent from './SliderComponent';
import ItemComponent from './ItemComponent';


class Scale extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onScaleReady();
    }

    render() {
        var items = [];
        for(let i = 1; i <= this.props.scale_size; i++) {
            items.push(
                <ItemComponent key={i} index={i} />
            );
        }
        return (
            <section id="main">
         <div id="scale">
             {items}

         </div>
         { this.props.scale_ready ? <SliderComponent  /> : "" }
     </section>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewMax: (data) => {
        dispatch(changeMax({new_max: data}));
    },
    onScaleReady: (data) => {
        dispatch(scaleReady({scale_ready: true}));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const ScaleComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scale);

export default ScaleComponent;