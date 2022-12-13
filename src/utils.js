function getSeasonTextById(seasonId) {
    let text = "";
    switch (seasonId) {
        case 1:
            text = "зима";
            break;
        case 2:
            text = "весна";
            break;
        case 3:
            text = "лето";
            break;
        case 4:
            text = "осень";
            break;
    }
    return text;
}
function getDayTextById(broadcast) {
    let text = "";
    switch (broadcast) {
        case 1:
            text = "понедельник";
            break;
        case 2:
            text = "вторник";
            break;
        case 3:
            text = "среда";
            break;
        case 4:
            text = "четверг";
            break;
        case 5:
            text = "пятница";
            break;
        case 6:
            text = "суббота";
            break;
        case 7:
            text = "воскресенье";
            break;
    }
    return text;
}

export {getDayTextById, getSeasonTextById}