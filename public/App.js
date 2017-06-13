import React from 'react';
import { connect } from 'react-redux';
import { endDraging } from './action';
import  MinComponent from './components/MinComponent';
import  MaxComponent from './components/MaxComponent';
import  IntervalForm from './components/IntervalForm';
import  ScaleComponent from './components/ScaleComponent';
import  IntervalList from './components/IntervalList';

class App extends React.Component{

    constructor(props){
        super(props);

        this.dragEndHandler = this.dragEndHandler.bind(this);
    }

    dragEndHandler(e) {
        e.nativeEvent.preventDefault();
        this.props.onEnd();
    }

    render(){
       return(
            <div className="components_wrap"
                 onDragEnd={this.dragEndHandler} >
                 <h1>React Redux Slider</h1>
                <MinComponent />
                <MaxComponent />
                <IntervalForm />
                <IntervalList />
                <ScaleComponent />
            </div>
       )

    }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onEnd: () => {
        dispatch(endDraging());
    }
  }
}

const mapStateToProps = (state) => {
  return state;
}

const CombineApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default CombineApp;