import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setOneIntervalSize } from '../action';
import { dragOver } from '../action';
import IntervalComponent from './IntervalComponent';


class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.renderScale = this.renderScale.bind(this);

    }

    dragStartHandler(e) {
        e.nativeEvent.preventDefault();
        e.nativeEvent.dataTransfer.setData('text/html',null);
    }

    dropHandler(e) {
        e.nativeEvent.preventDefault();
    }

    dragOverHandler(e) {
        e.nativeEvent.preventDefault();
        this.props.onDragOver({ clientX: e.nativeEvent.clientX});
    }

    renderScale(item, index) {
        var num = +item.from;
        var marginItem = 
                this.props.items[num-1].rect.left
                - this.props.items[0].rect.left

        var sliderWidth = 
           this.props.items[item.to-1].rect.left
           + this.props.items[item.to-1].rect.width
           - this.props.items[0].rect.left - marginItem;

        
        return (
            <IntervalComponent key={index} index={index} sliderWidth={sliderWidth} marginItem={marginItem} />
        )
    }

    render() {
        return (
            <div id="slider" 
                onDragOver={this.dragOverHandler}
                onDrop={this.dropHandler}
            >

            {this.props.scales.map(this.renderScale)}

         </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSliderMount: (data) => {
        dispatch(setOneIntervalSize(data));
    },
    onDragOver: (data) => {
        dispatch(dragOver(data));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const SliderComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Slider);

export default SliderComponent;