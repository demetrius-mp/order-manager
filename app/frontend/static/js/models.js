const apiRoot = 'http://127.0.0.1:8000/api/v1/'

class Item {
    constructor(id, name, price, price_combo) {
        this.id = id
        this.name = name
        this.price = price
        this.price_combo = price_combo ? price_combo : price
    }

    static getAll(success=undefined, error=undefined) {
        getAll(
            apiRoot + "items",
            success, error
        )
    }
}

class Order {
    static create(customer, success=undefined, error=undefined) {
        post(
            apiRoot + "orders",
            {customer: customer},
            success, error
        )
    }

    static update(id, fields, success=undefined, error=undefined) {
        patch(
            apiRoot + "orders/" + id,
            fields,
            success, error
        )
    }

    static deleteById(id, success=undefined, error=undefined) {
        delete_(
            apiRoot + "orders/" + id,
            success, error
        )
    }

    static getById(id, success=undefined, error=undefined) {
        return getById(
            apiRoot + "orders/" + id,
            success, error
        )
    }

    static getAll(success=undefined, error=undefined) {
        getAll(
            apiRoot + "orders",
            success, error
        )
    }

    static getByState(done=false, success=undefined, error=undefined) {
        const state_filter = done ? 'done=true' : 'done=false'
        return getAll(
            apiRoot + "orders?" + state_filter,
            success, error
        )
    }
}

class OrderItem {

    static getAllByOrderId(orderId, success=undefined, error=undefined) {
        getAll(
            apiRoot + "orders/" + orderId + "/items",
            success, error
        )
    }

    static deleteById(orderId, orderItemId, success=undefined, error=undefined) {
        delete_(
            apiRoot + "orders/" + orderId + "/items/" + orderItemId,
            success, error
        )
    }

    static put(json, orderId, orderItemId=undefined, success=undefined, error=undefined) {
        const urlHelper = orderItemId ? '/' + orderItemId : ''
        const url = apiRoot + "orders/" + orderId + "/items" + urlHelper
        put(
            url,
            json,
            success, error
        )
    }
}