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
        { from: 1, to: 4},
    ],
    drag_mid: {
        from: 0,
        to: 0
    }
    
}

function intervalApp(state, action){

    if(typeof state === "undefined"){
        return initialState;
    }
    switch(action.type){
        case "NEW_MIN" :
            return Object.assign( {}, state, { min: action.new_min});
            break;
        case "NEW_MAX" :
            return Object.assign( {}, state, { max: action.new_max});
            break;
        case "ONE_INTERVAL":
            return Object.assign( {}, state, { 
                one_interval_size: action.size,
                item_size: action.item_size});
            break;
        case "PUSH_ITEM_RECT":
            return Object.assign( {}, state, { 
                items: [
                    ...state.items,
                    action.data
                    ]
                });
            break;
        case "SCALE_READY":
            return Object.assign( {}, state, { 
                scale_ready: action.data,
                });
            break;
        case "ADD_INTERVAL":

            if(+action.data.from == 0 || +action.data.to == 0){
                alert("Проверьте поля интервала, в полях интервала не может быть 0");
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

                        console.log(+action.data.from);
                        console.log(+state.scales[i].from);
                        console.log(+action.data.to);
                        console.log(+state.scales[i].to);

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
            break;
        case "DELETE_INTERVAL":
            return Object.assign( {}, state, { 
                scales: [
                    ...state.scales.slice(0, +action.data),
                    ...state.scales.slice(+action.data + 1)
                ]
                });
            break;    
    }

}

export default intervalApp;