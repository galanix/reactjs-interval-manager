import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushItemRect } from '../action';
import { deleteInterval } from '../action';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.renderScale = this.renderScale.bind(this);
        this.deleteIntervalHandler = this.deleteIntervalHandler.bind(this);

    }

    deleteIntervalHandler(e) {
        this.props.onDelete(e.target.parentNode.querySelector('td[data-interval]').getAttribute('data-interval'));
    }

    renderScale(item, index) {
        return (
            <tr key={index}>
                <td data-interval={index}>{index+1} </ td>
                <td>{item.from} </ td>
                <td>{item.to} </ td>
                <td className="delete" onClick={this.deleteIntervalHandler}>X</td>
            </tr>
        )
    }

    render() {
        return (
            <table cellSpacing="1" className="interval_list">
                <thead>
                    <tr>
                        <td>Interval</td>
                        <td>From</td>
                        <td>To</td>
                        <td>Delete</td>
                    </tr>
                </thead>
                <tbody>
                    {this.props.scales.map(this.renderScale)}    
                </tbody>
            </table>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDelete: (data) => {
        dispatch(deleteInterval(data));
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const IntervalList = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default IntervalList;