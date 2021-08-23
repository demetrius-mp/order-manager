function getAll(url, success=undefined, error=undefined) {
    $.ajax({
        type: "GET",
        url: url,
        timeout: 1000,
        success: (data, textStatus, jqXHR) => {
            success ? success(data, textStatus, jqXHR) : null
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(jqXHR, textStatus, errorThrown) : null
        }
    })
}

function getById(url, success=undefined, error=undefined) {
    $.ajax({
        type: "GET",
        url: url,
        success: (data, textStatus, jqXHR) => {
            success ? success(data, textStatus, jqXHR) : null
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(jqXHR, textStatus, errorThrown) : null
        }
    })
}

function patch(url, json, success=undefined, error=undefined) {
    $.ajax({
        type: "PATCH",
        url: url,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (data, textStatus, jqXHR) => {
            success ? success(data, textStatus, jqXHR) : null
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(jqXHR, textStatus, errorThrown) : null
        }
    })
}

function post(url, json, success=undefined, error=undefined) {
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (data, textStatus, jqXHR) => {
            success ? success(data, textStatus, jqXHR) : null
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(jqXHR, textStatus, errorThrown) : null
        }
    })
}

function put(url, json, success=undefined, error=undefined) {
    $.ajax({
        type: "PUT",
        url: url,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(json),
        success: (data, textStatus, jqXHR) => {
            success ? success(data, textStatus, jqXHR) : null
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(jqXHR, textStatus, errorThrown) : null
        }
    })
}

function delete_(url, success=undefined, error=undefined) {
    $.ajax({
        type: "DELETE",
        url: url,
        success: (data, textStatus, jqXHR) => {
            success ? success(data, textStatus, jqXHR) : null
        },
        error: (jqXHR, textStatus, errorThrown) => {
            error ? error(jqXHR, textStatus, errorThrown) : null
        }
    })
}