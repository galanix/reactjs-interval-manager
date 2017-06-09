const SCALE_SIZE = 24;

const initialState = {
    min: 1,
    max: 10,
    one_interval_size: 0,
    item_size: 0,
    scale_size: SCALE_SIZE,
    scale_ready: false,
    items: [],
    scales: [
        { from: 18, to: 20},
    ],
    cur_drag: "",
    drag_mid: {

    }
    
}

function intervalApp(state, action){

    if(typeof state === "undefined"){
        return initialState;
    }
    switch(action.type){
        case "NEW_MIN" :
            return Object.assign( {}, state, { min: action.new_min});
            
        case "NEW_MAX" :
            return Object.assign( {}, state, { max: action.new_max});
            
        case "ONE_INTERVAL":
            return Object.assign( {}, state, { 
                one_interval_size: action.size,
                item_size: action.item_size});
            
        case "PUSH_ITEM_RECT":
            return Object.assign( {}, state, { 
                items: [
                    ...state.items,
                    action.data
                    ]
                });
            
        case "SCALE_READY":
            return Object.assign( {}, state, { 
                scale_ready: action.data,
                });
            
        case "ADD_INTERVAL":

            if(+action.data.from == 0 || +action.data.to == 0){
                alert("Проверьте поля интервала, в полях интервала не может быть 0");
                return state;
            }
            else if(+action.data.from < 0 && +action.data.from < 0) {
                alert("Проверьте поля интервала, в полях интервала не может быть меньше 0");
                return state;
            }
            else if(+action.data.from >= +action.data.to){
                alert("Проверьте поля интервала, значение первого поля не может быть больше или равняться второму");
                return state;
            }
            else if(+state.min > +state.max){
                alert("Проверьте поля интервала, значение первого поля не может быть больше второго");
                return state;
            }
            else if(+action.data.to >= 25){
                alert("Проверьте поля интервала, значение второго поля не може превышать максимальное число на шкале");
                return state;
            }
            else if((+action.data.to - (+action.data.from)) > state.max){
                alert("Проверьте поля интервала, ваш интервал превышает максимально допустимое значение");
                return state;
            }
            else if((+action.data.to - (+action.data.from)) < state.min){
                alert("Проверьте поля интервала, ваш интервал меньше минимального значения");
                return state;
            }
            else{

                let all_good = true;

                for(var i = 0; state.scales.length > i; i++){

                    if(+action.data.from > +state.scales[i].from && +action.data.from < +state.scales[i].to){
                        all_good = false;
                        break;

                    }
                    else if(+action.data.to > +state.scales[i].from && +action.data.to < +state.scales[i].to){

                        all_good = false;
                        break;

                    }
                    else if(+action.data.from < +state.scales[i].from && +action.data.to > +state.scales[i].to){

                        all_good = false;
                        break;

                    }
                    else if(+action.data.from == +state.scales[i].from && +action.data.to == +state.scales[i].to){

                        all_good = false;
                        break;

                    }
                    else{
                        all_good = true;
                    }
                    
                }

                if(all_good){
                   return Object.assign( {}, state, { 
                    scales: [
                        ...state.scales,
                        action.data
                        ]
                    });
                }
                else{
                    alert("Такой диапазон уже занят");
                    return state;
                } 

            }
            
        case "MIDDLE_DRAG_START":
            return Object.assign( {}, state, { 
                drag_mid: action.data,
                cur_drag: action.data.cur_drag
                });
            
        case "MIDDLE_DRAG_OVER":
            if(state.cur_drag == "middle") {
                if(action.data.clientX + state.drag_mid.difference >= state.drag_mid.toScale && state.scales[state.drag_mid.index].to < state.items.length){
                    var to = state.scales[state.drag_mid.index].to >= state.items.length ?
                     state.scales[state.drag_mid.index].to : 
                     state.scales[state.drag_mid.index].to+1;
                    
                    var from = state.scales[state.drag_mid.index].to >= state.items.length ?
                     state.scales[state.drag_mid.index].from : 
                     state.scales[state.drag_mid.index].from+1;


                    var newScales = [
                        ...state.scales.slice(0,state.drag_mid.index),
                        {
                            from: from,
                            to: to,
                        },
                        ...state.scales.slice(state.drag_mid.index+1),
                    ];

                    var dragDrag = Object.assign({}, state.drag_mid, {
                            toScale: state.items[state.scales[state.drag_mid.index].to].rect.right,
                            beforeScale: state.items[state.scales[state.drag_mid.index].from].rect.right,
                            difference: state.drag_mid.difference,
                            clientX: action.data.clientX,
                            index: state.drag_mid.index  
                    })
                    return Object.assign( {}, state, { 
                        scales: newScales,
                        drag_mid: dragDrag
                    });
                } else if(action.data.clientX + state.drag_mid.difference <= state.drag_mid.beforeScale){
                    if(state.scales[state.drag_mid.index].to >= state.items.length) {
                        var to = state.items.length-1;
                    } else {
                        var to = state.scales[state.drag_mid.index].from <= 1 ?
                            state.scales[state.drag_mid.index].to : 
                            state.scales[state.drag_mid.index].to-1;
                    }
                    
                    var from = state.scales[state.drag_mid.index].from <= 1 ?
                     state.scales[state.drag_mid.index].from : 
                     state.scales[state.drag_mid.index].from-1;

                    var newScales = [
                        ...state.scales.slice(0,state.drag_mid.index),
                        {
                            from: from,
                            to: to,
                        },
                        ...state.scales.slice(state.drag_mid.index+1),
                    ];

                    var dragDrag = Object.assign({}, state.drag_mid, {
                            toScale: state.items[to].rect.right,
                            beforeScale: state.items[from].rect.right,
                            difference: state.drag_mid.difference,
                            clientX: action.data.clientX,
                            index: state.drag_mid.index  
                    })
                    return Object.assign( {}, state, { 
                        scales: newScales,
                        drag_mid: dragDrag
                    });
                }
            } 
            else if(state.cur_drag == "left") {
                if(action.data.clientX + state.drag_mid.difference <= state.drag_mid.beforeScale){
                    if(state.scales[state.drag_mid.index].to >= state.items.length) {
                        var to = state.items.length-1;
                    } else {
                        var to = state.scales[state.drag_mid.index].to;
                    }
                    
                    var from = state.scales[state.drag_mid.index].from <= 1 ?
                     state.scales[state.drag_mid.index].from : 
                     state.scales[state.drag_mid.index].from-1;

                    var newScales = [
                        ...state.scales.slice(0,state.drag_mid.index),
                        {
                            from: from,
                            to: to,
                        },
                        ...state.scales.slice(state.drag_mid.index+1),
                    ];

                    var dragDrag = Object.assign({}, state.drag_mid, {
                            toScale: state.items[to].rect.right,
                            beforeScale: state.items[from].rect.right,
                            difference: state.drag_mid.difference,
                            clientX: action.data.clientX,
                            index: state.drag_mid.index  
                    })
                    return Object.assign( {}, state, { 
                        scales: newScales,
                        drag_mid: dragDrag
                    });
                }
            } else if(state.cur_drag == "right") {
                if(action.data.clientX + state.drag_mid.difference >= state.drag_mid.toScale && state.scales[state.drag_mid.index].to < state.items.length){
                    var to = state.scales[state.drag_mid.index].to >= state.items.length ?
                     state.scales[state.drag_mid.index].to : 
                     state.scales[state.drag_mid.index].to+1;
                    
                    var from = state.scales[state.drag_mid.index].from; 
                    
                    var newScales = [
                        ...state.scales.slice(0,state.drag_mid.index),
                        {
                            from: from,
                            to: to,
                        },
                        ...state.scales.slice(state.drag_mid.index+1),
                    ];

                    var dragDrag = Object.assign({}, state.drag_mid, {
                            toScale: state.items[state.scales[state.drag_mid.index].to].rect.right,
                            beforeScale: state.items[state.scales[state.drag_mid.index].from].rect.right,
                            difference: state.drag_mid.difference,
                            clientX: action.data.clientX,
                            index: state.drag_mid.index  
                    })
                    return Object.assign( {}, state, { 
                        scales: newScales,
                        drag_mid: dragDrag
                    });
                }
            }
            return state;
            
        case "DRAG_END":
            return Object.assign( {}, state, { 
                cur_drag: "",

                });
            
        case "DELETE_INTERVAL":
            return Object.assign( {}, state, { 
                scales: [
                    ...state.scales.slice(0, +action.data),
                    ...state.scales.slice(+action.data + 1)
                ]
                });
              
    }

}

export default intervalApp;