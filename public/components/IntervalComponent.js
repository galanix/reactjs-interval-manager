import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { setOneIntervalSize } from '../action';

class GreenInterval extends React.Component {
    constructor(props) {
        super(props);

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    dragStartHandler(e) {
        e.nativeEvent.preventDefault();
        console.log(this.props.items[this.props.index].rect);
        console.log(this.props.scales[this.props.index]);
        console.log(e.nativeEvent.clientX);
        console.log(e.target.parentNode.getBoundingClientRect());
        console.log(this.props.items[this.props.index+1].rect);
        
       /*switch(e.target.className) {
            case "middle":
                onDragMiddle();
        }*/
        //this.props.
        e.nativeEvent.dataTransfer.setData('text/html',null);
        
        //console.log(e.nativeEvent);
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

    render() {
        return (
            <div className="slider_wrap" style={{width: this.props.sliderWidth, marginLeft: this.props.marginItem}}>
                 <span className="left" 
                    draggable="true" 
                    onDragStart={this.dragStartHandler}
                 >
                 </span>
                 <span className="middle" 
                    draggable="true" 
                    onDragStart={this.dragStartHandler}
                   
                 >
                 </span>
                 <span className="right"   
                    draggable="true" 
                    onDragStart={this.dragStartHandler}
                   
                 >
                 </span>
             </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDragStart: (data) => {
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

const IntervalComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(GreenInterval);

export default IntervalComponent;