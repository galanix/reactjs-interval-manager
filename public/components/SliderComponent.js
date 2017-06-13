import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setOneIntervalSize } from '../action';
import IntervalComponent from './IntervalComponent';


class Slider extends React.Component {
    constructor(props) {
        super(props);

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
        this.dragEnterHandler = this.dragEnterHandler.bind(this);
        this.dragHandler = this.dragHandler.bind(this);
        this.dragEndHandler = this.dragEndHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.renderScale = this.renderScale.bind(this);

    }

    dragStartHandler(e) {
        e.nativeEvent.preventDefault();
        console.log(e.target.className);
       /* switch(e.target.className) {
            case "middle":
                onDragMiddle();
        }*/
        //this.props.
        e.nativeEvent.dataTransfer.setData('text/html',null);
        
        console.log(e.nativeEvent);
    }

    dragEnterHandler(e) {
        console.log(e.nativeEvent);
    }

    dragLeaveHandler(e) {
        console.log(e.nativeEvent);
    }

    dragHandler(e) {
        console.log(e.nativeEvent);
    }

    dragEndHandler(e) {
        console.log(e.nativeEvent);
    }

    dropHandler(e) {
        e.nativeEvent.preventDefault();
        console.log(e.nativeEvent);
    }

    dragOverHandler(e) {
        e.nativeEvent.preventDefault();
        //console.log(e.nativeEvent);
    }

    componentDidMount() {

    }

    renderScale(item, index) {
        var marginItem = 
                this.props.items[item.from-1].rect.left
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
                onDragEnter={this.dragEnterHandler}
                onDragLeave={this.dragLeaveHandler}
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
    onDragMiddle: (data) => {
        dispatch(dragSlide(data));
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