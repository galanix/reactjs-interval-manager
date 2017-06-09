import React from 'react';
import { connect } from 'react-redux';
import  MinComponent from './components/MinComponent';
import  MaxComponent from './components/MaxComponent';
import  IntervalForm from './components/IntervalForm';
import  ScaleComponent from './components/ScaleComponent';
import  IntervalList from './components/IntervalList';

class CombineApp extends React.Component{

    constructor(props){
        super(props);

        this.consoleHandler = this.consoleHandler.bind(this);
    }

    consoleHandler(e){

        //console.log(e);
        
    }

    render(){
       return(
            <div className="components_wrap">
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

export default CombineApp;