export function changeMin(data) {
    return {
        type: "NEW_MIN",
        new_min: data.new_min
    }
}

export function changeMax(data) {
    return {
        type: "NEW_MAX",
        new_max: data.new_max
    }
}

export function setOneIntervalSize(data) {
    return {
        type: "ONE_INTERVAL",
        size: data.size,
        item_size: data.item_size
    }
}

export function pushItemRect(data) {
    return {
        type: "PUSH_ITEM_RECT",
        data: data
    }
}

export function scaleReady(data) {
    return {
        type: "SCALE_READY",
        data: data.scale_ready
    }
}

export function addInterval(data) {
    return {
        type: "ADD_INTERVAL",
        data: data
    }
}

export function dragMiddle(data) {
    return {
        type: "MIDDLE_DRAG_START",
        data: data
    }
}

export function dragOver(data) {
    return {
        type: "MIDDLE_DRAG_OVER",
        data: data
    }
}

export function endDraging() {
    return {
        type: "DRAG_END",
    }
}

export function deleteInterval(data) {
    return {
        type: "DELETE_INTERVAL",
        data: data
    }
}
