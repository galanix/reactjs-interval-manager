import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeMax } from '../action';


class Max extends React.Component {
    constructor(props) {
        super(props);

        this.newMaxHandler = this.newMaxHandler.bind(this);

    }

    newMaxHandler(e) {
        this.props.onNewMax(e.target.value);
    }

    render() {
        return(

            <div className="option max_component">
                <label>Maximum</label>
                <input type="number" value={this.props.max} onChange={this.newMaxHandler} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onNewMax: (data) => {
        dispatch(changeMax({new_max: data}));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const MaxComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(Max);

export default MaxComponent;