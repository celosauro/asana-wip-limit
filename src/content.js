const COLOR_RED = '#FC636B'
const COLOR_YELLOW = '#FFB900'

function getBoardColumns() {
    return document.querySelectorAll('.BoardBody-columnDraggableItemWrapper')
}

function getHeaderName(column) {
    return column.querySelector('.BoardColumnHeader-name').innerHTML || ''
}

function totalColumnCards(column) {
    return column.querySelectorAll('.BoardCard').length
}

function getWipLimit(headerName) {
    let wipRegex = (/\[\d+\]/g)
    let wipLimit = wipRegex.exec(headerName)

    if (wipLimit) {
        return wipLimit[0].replace(/\D+/g, '')
    }

    return null
}

function hasWipLimit(headerName) {
    return Boolean(getWipLimit(headerName))
}

function changeColumnBackgroundColor(column, color) {
    column.style.backgroundColor = color
}

function initWipLimit(column) {
   
    let headerName = getHeaderName(column)
    let totalCards = totalColumnCards(column)

    if (hasWipLimit(headerName) && totalCards == getWipLimit(headerName)) {
        changeColumnBackgroundColor(column, COLOR_YELLOW)
    }
    
    if (hasWipLimit(headerName) && totalCards > getWipLimit(headerName)) {
        changeColumnBackgroundColor(column, COLOR_RED)
    }
}

function loopColumns() {
    let columns = getBoardColumns()
    columns.forEach(function(column) {
        initWipLimit(column)
    })
}

function initObserver() {
    
    let observerConfig = {childList: true, subtree: true}
    let observer = new MutationObserver(function() {
        loopColumns()
    });
    
    let boardColumns = document.querySelectorAll('.BoardBody-column')
    for (i = 0; i < boardColumns.length; i++) {
        observer.observe(boardColumns[i], observerConfig);
    }
}

initObserver()