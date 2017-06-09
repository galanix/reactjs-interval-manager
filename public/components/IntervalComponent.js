import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { dragMiddle } from '../action';


class GreenInterval extends React.Component {
    constructor(props) {
        super(props);

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
    }

    dragStartHandler(e) {
        e.nativeEvent.dataTransfer.setData('text/html',null);
        var toScale = +this.props.scales[+this.props.index].to;
        if(toScale < this.props.items.length) {
            var beforeScale = this.props.scales[this.props.index].from
            var data = {
                toScale: this.props.items[toScale].rect.right,
                beforeScale: this.props.items[beforeScale].rect.right,
                difference: e.target.parentNode.getBoundingClientRect().right - e.nativeEvent.clientX,
                clientX: e.nativeEvent.clientX,
                index: this.props.index,
                cur_drag: e.target.className
            }
            this.props.onDragMiddle(data);
        }
    }

    dragOverHandler(e) {
        e.nativeEvent.preventDefault();
    }

    render() {
        return (
            <div className="slider_wrap" style={{width: this.props.sliderWidth, marginLeft: this.props.marginItem}}>
                 <span className="left" 
                    draggable="true" 
                    onDragStart={this.dragStartHandler}
                    onDragOver={this.dragOverHandler}
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
    onDragMiddle: (data) => {
        dispatch(dragMiddle(data));
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