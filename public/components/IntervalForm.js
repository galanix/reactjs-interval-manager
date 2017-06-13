import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addInterval } from '../action';

class Interval extends React.Component {

    constructor(props) {
        super(props);

        this.addButtonHandler = this.addButtonHandler.bind(this);
        this.inputFromHandler = this.inputFromHandler.bind(this);
        this.inputToHandler = this.inputToHandler.bind(this);

        this.state = {
            from: 0,
            to: 0
        };
    }

    addButtonHandler() {
        this.props.onAdd(this.state);
    }

    inputFromHandler(e) {
        this.setState({
            from: e.target.value
        })
    }

    inputToHandler(e) {
        this.setState({
            to: e.target.value
        })
    }

    render() {
        return (
            <div className="add_new_interval_wrap">
                <div className="option from">
                    <label>From:</label>
                    <input onChange={this.inputFromHandler} name="from" value={this.state.from} type="number" />
                </div>
                <div className="option to">
                    <label>To:</label>
                    <input onChange={this.inputToHandler} name="to" value={this.state.to} type="number" />
                </div>
                <button onClick={this.addButtonHandler}>Add Interval</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (data) => {
        dispatch(addInterval(data));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const IntervalForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(Interval);

export default IntervalForm;