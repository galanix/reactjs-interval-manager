import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushItemRect } from '../action';

class Item extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.props.onItemRender({
            rect: document.querySelector('.item'+this.props.index).getBoundingClientRect(),
            index: this.props.index
        });
    }

    render() {
       return (
             <div key={this.props.index} className={"item item"+this.props.index} >{this.props.index}</div>
       );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onItemRender: (data) => {
        dispatch(pushItemRect(data));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const ItemComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);

export default ItemComponent;