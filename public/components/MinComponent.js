import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeMin } from '../action';


class Min extends React.Component {
    constructor(props) {
        super(props);

        this.newMinHandler = this.newMinHandler.bind(this);

    }

    newMinHandler(e) {
        this.props.onNewMin(e.target.value);
    }

    render() {
        return(
            <div className="option min_component">
                <label>Minimum</label>
                <input type="number" value={this.props.min} onChange={this.newMinHandler} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewMin: (data) => {
        dispatch(changeMin({new_min: data}));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const MinComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Min);

export default MinComponent;