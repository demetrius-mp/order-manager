class OrderItemCard {

    static add($orderItemsList, orderItem) {
        const combo = orderItem.combo ? 'Combo' : ''
        const notes = orderItem.notes ? `<div style="white-space: pre-line"><strong>Observação:</strong><br>${orderItem.notes}</div>` : ''
        const html = `<li id="${orderItem.id}" class="list-group-item">${orderItem.amount}x: ${combo} ${orderItem.item.name} ${notes}</li>`
        $orderItemsList.append(html)
    }

    static update($orderItemsList, orderItem) {
        const combo = orderItem.combo ? 'Combo' : ''
        const notes = orderItem.notes ? `<div style="white-space: pre-line"><strong>Observação:</strong><br>${orderItem.notes}</div>` : ''
        $orderItemsList.find(`#${orderItem.id}`).html(`${orderItem.amount}x: ${combo} ${orderItem.item.name} ${notes}`)
    }

    static delete($orderItemsList, orderItem) {
        $orderItemsList.find(`#${orderItem}`).remove()
    }
}

class OrderItemModal {
    static add($items, orderItem = null, items) {
        const itemSuggestions = items.map(
            e => `<option value="${e.name}">${e.name}</option>`
        ).join('')
        if (!orderItem) {
            orderItem = {
                id: '',
                amount: 1,
                notes: '',
                combo: false,
                item: {
                    name: '',
                    price: '',
                    price_combo: ''
                }
            }
        }
        const html = `
        <div ${orderItem.id ? `id=${orderItem.id}` : ''} class="item">
            <div class="row">
                <div class="col-7">
                    <label for="nome-item" class="col col-form-label">Item:</label>
                    <input autocomplete="off" value="${orderItem.item.name}" type="text" class="nome-item form-control" name="nome-item" list="sugestoes">
                    <datalist id="sugestoes">
                        ${itemSuggestions}
                    </datalist>
                </div>
                <div class="col-2 ps-0">
                    <label for="quantidade" class="col col-form-label">Qtd.:</label>
                    <input value="${orderItem.amount}" type="number" class="quantidade form-control" name="quantidade">
                </div>
                <div class="col-3 ps-0">
                    <label for="valor" class="col col-form-label">Valor:</label>
                    <input value="${orderItem.combo ? orderItem.item.price_combo : orderItem.item.price}" type="number" class="valor form-control" name="valor">
                </div>
            </div>
            <div>
                <label for="observacoes" class="col-form-label">Observações:</label>
                <textarea class="form-control observacoes" name="observacoes">${orderItem.notes}</textarea>
            </div>
            <div class="form-check mt-2">
                <input ${orderItem.combo ? 'checked' : ''} class="form-check-input combo" type="checkbox" name="combo">
                <label class="form-check-label" for="combo">
                    Combo
                </label>
            </div>
            <div class="d-flex justify-content-between mt-3">
                <button type="button" class="excluir-item btn btn-outline-danger">Excluir</button>
                <button type="button" class="salvar-item btn btn-outline-primary">Salvar</button>
            </div>
            <hr>
        </div>
        `
        const $item = $($.parseHTML(html))
        const $observacoes = $item.find('textarea[name="observacoes"]')
        $items.append($item)
        setTimeout(function () {
            const scrollHeight = $observacoes.prop('scrollHeight')
            $observacoes.height(scrollHeight)
        }, 500)
    }

    static delete($item) {
        $item.remove()
    }
}

class OrderCard {

    static render_buttons(order) {
        if (order.done) {
            return `
            <li id="${order.id}" class="list-group-item d-flex justify-content-center">
                <button type="button" class="btn btn-primary abrir-pedido">Abrir</button>
            </li>
            `
        } else {
            return `
            <li id="${order.id}" class="list-group-item d-flex justify-content-between">
                <button type="button" class="btn btn-primary editar-itens">Editar</button>
                <button type="button" class="btn btn-danger fechar-pedido">Fechar</button>
            </li>
            `
        }
    }

    static add($orders, order) {
        const html = `
        <div id="pedido_${order.id}" class="col-sm-auto" style="min-width: 230px">
            <div class="card border-dark mb-3">
                <div class="card-header justify-content-between d-flex">
                    <div class="text-left me-2">
                        <p class="mt-1 mb-0">
                            <a class="text-decoration-none" href="">#${order.id} - ${order.customer}</a>
                        </p>
                    </div>
                    <div class="text-right">
                        <a id="${order.id}" class="text-decoration-none text-dark excluir-pedido" style="cursor: pointer">
                            <i style="font-size: 1.3rem" class="bi bi-trash-fill"></i>
                        </a>
                    </div>
                </div>
                <ul class="list-group list-group-flush border-bottom">
                    <div id="lista-de-itens"></div>
                    <div>${this.render_buttons(order)}</div>
                </ul>
            </div>
        </div>
        `
        $orders.append(html)
        const $items_list = $orders.find('#pedido_' + order.id).find('#lista-de-itens')
        order.items.forEach(item => OrderItemCard.add($items_list, item))
    }

    static delete($pedidos, id_pedido) {
        $pedidos.find(`#pedido_${id_pedido}`).remove()
    }
}