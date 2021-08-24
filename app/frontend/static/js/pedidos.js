const $modal_confirmacao = $('#modal-confirmacao')
const $modal_adicionar_pedido = $('#modal-adicionar-pedido')
const $modal_adicionar_item = $('#modal-editar-itens')
const $pedidos = $('#pedidos')

// autosizing for textarea inputs
$(document).on('input', 'textarea', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
})

const items = []
Item.getAll(
    (data, textStatus, jqXHR) => {
        data.forEach(e => {
            items.push(e)
        })
    },
    (jqXHR, textStatus, errorThrown) => {
        tata.error("Falha de comunicação", "Verifique o servidor da API", {
            position: 'br',
            duration: 6000
        })
    }
)

$('#filtros').on('click', '.btn', function () {
    $(this).addClass('active').siblings().removeClass('active')
    $pedidos.empty()

    const done = $(this).attr('data-done')
    if (done === undefined) {
        Order.getAll(
            (data, textStatus, jqXHR) =>
                data.forEach(e => OrderCard.add($pedidos, e))
        )
    }
    else {
        Order.getByState(
            done === 'true',
            (data, textStatus, jqXHR) =>
                data.forEach(e => OrderCard.add($pedidos, e))
        )
    }
})

$('button[data-done="false"]').click()

$('#criar-pedido').on('click', function () {
    $modal_adicionar_pedido.modal('show')

    const $modalfooter = $modal_adicionar_pedido.find('.modal-footer')

    $modalfooter.off()

    $modalfooter.on('click', '#confirmar', function () {
        const cliente = $('#cliente').val()
        if (cliente === '') {
            alert('Você deve adicionar o nome do cliente.')
            return
        }
        Order.create(
            cliente,
            (data, textStatus, jqXHR) => {
                tata.success('Sucesso', 'Pedido criado com sucesso!', {
                    position: 'br',
                    duration: 2000
                })
                $modal_adicionar_pedido.modal('hide');
                $('#filtros').find(`[data-done='false']`).click()
            }
        )
    })
})

$pedidos.on('click', '.excluir-pedido', function () {
    const order_id = $(this).attr('id')
    $modal_confirmacao.find('.modal-title').text('Excluir pedido')
    $modal_confirmacao.find('.modal-body').text(`Tem certeza de que deseja excluir este pedido?`)
    $modal_confirmacao.modal('show')

    const $modalfooter = $modal_confirmacao.find('.modal-footer')
    const $cancelar = $modalfooter.find('#cancelar')
    const $confirmar = $modalfooter.find('#confirmar')

    $cancelar.text('Cancelar').removeClass('btn-secondary').addClass('btn-danger')
    $confirmar.text('Confirmar').removeClass('btn-danger').addClass('btn-primary')

    $modalfooter.off()

    $modalfooter.on('click', '#confirmar', function () {
        Order.deleteById(
            order_id,
            (data, textStatus, jqXHR) => {
                tata.info('Sucesso', 'Pedido excluído com sucesso.', {
                    position: 'br',
                    duration: 2000
                })
                OrderCard.delete($pedidos, order_id)
            },
            (jqXHR, textStatus, errorThrown) => {
                tata.warn('Falha', 'Pedido não encontrado.', {
                    position: 'br',
                    duration: 2000
                })
            }
        )
    })
})

$pedidos.on('click', '.fechar-pedido', function () {
    const id_pedido = $(this).parent().attr('id')
    $modal_confirmacao.find('.modal-title').text('Fechar pedido')

    Order.getById(
        id_pedido,
        (data, textStatus, jqXHR) => {
            let total_value = 0
            for (const i of data.items) {
                total_value += i.combo ? i.amount * i.item.price_combo : i.amount * i.item.price
            }
            $modal_confirmacao.find('.modal-body').text(`Confirmar fechamento do pedido em R$${total_value}?`)
        }
    )

    $modal_confirmacao.modal('show')
    const $modalfooter = $modal_confirmacao.find('.modal-footer')
    const $cancelar = $modalfooter.find('#cancelar')
    const $confirmar = $modalfooter.find('#confirmar')

    $cancelar.text('Cancelar').removeClass('btn-secondary').addClass('btn-danger')
    $confirmar.text('Confirmar').removeClass('btn-danger').addClass('btn-primary')

    $modalfooter.off()

    $modalfooter.on('click', '#confirmar', function () {
        Order.update(
            id_pedido,
            { done: true },
            (data, textStatus, jqXHR) => {
                tata.success('Sucesso', 'Pedido fechado com sucesso!', {
                    position: 'br',
                    duration: 2000
                })
                $('#filtros').find('.active').click()
            }
        )
    })
})

$pedidos.on('click', '.abrir-pedido', function () {
    const id_pedido = $(this).parent().attr('id')
    Order.update(
        id_pedido,
        { done: false },
        (data, textStatus, jqXHR) => {
            tata.success('Sucesso', 'Pedido reaberto com sucesso!', {
                position: 'br',
                duration: 2000
            })
            $('#filtros').find('.active').click()
            OrderCard.delete($pedidos, id_pedido)
        }
    )
})

$pedidos.on('click', '.editar-itens', function () {
    const id_pedido = $(this).parent().attr('id')
    $modal_adicionar_item.modal('show')

    const $itens = $modal_adicionar_item.find('#itens')
    const $lista_de_itens = $('#pedido_' + id_pedido).find('#lista-de-itens')

    $itens.empty()
    OrderItem.getAllByOrderId(
        id_pedido,
        (data, textStatus, jqXHR) => {
            data.forEach(e => {
                OrderItemModal.add($itens, e, items)
            })
            OrderItemModal.add($itens, null, items)
        }
    )

    $itens.off().on('click', '.excluir-item', function () {
        const orderItemId = $(this).parent().parent().attr('id')
        if (orderItemId !== undefined) {
            OrderItem.deleteById(
                id_pedido, orderItemId,
                (data, textStatus, jqXHR) => {
                    tata.info('Sucesso', 'Item excluído com sucesso.', {
                        position: 'br',
                        duration: 2000
                    })
                    OrderItemCard.delete($lista_de_itens, orderItemId)
                }
            )
        }
        OrderItemModal.delete($(this).parent().parent())

    }).on('click', '.salvar-item', function () {
        const $item = $(this).parent().parent()

        const itemName = $item.find('input[name="nome-item"]').val()
        const item = items.find(e => e.name === itemName)

        if (!itemName) {
            alert('Preencha o nome do item.')
            return
        }

        const amount = parseInt($item.find('input[name="quantidade"]').val())
        if (isNaN(amount) || amount < 1) {
            alert('Os campos quantidade e valor devem ser maiores que 1 e 0, respectivamente.')
            return
        }

        const orderItemJSON = {
            id: undefined,
            item_id: item.id,
            amount: amount,
            notes: $item.find('textarea[name="observacoes"]').val(),
            combo: $item.find('input[name="combo"]').is(':checked'),
            item: undefined
        }

        const orderItemId = $item.attr('id')
        OrderItem.put(
            orderItemJSON, id_pedido, orderItemId,
            (data, textStatus, jqXHR) => {
                tata.success('Sucesso', 'Item atualizado com sucesso', {
                    position: 'br',
                    duration: 2000
                })
                orderItemJSON.item = item
                if (orderItemId) {
                    orderItemJSON.id = orderItemId
                    OrderItemCard.update($lista_de_itens, orderItemJSON)
                }
                else {
                    orderItemJSON.id = data.id
                    OrderItemCard.add($lista_de_itens, orderItemJSON)
                }
                $item.attr('id', orderItemJSON.id)
            }
        )
    }).on('input', 'input[name="nome-item"]', function () {
        const itemName = $(this).val()
        const $item = $(this).parent().parent().parent()
        const combo = $item.find('input[name="combo"]').is(':checked')
        const item = items.find(e => e.name === itemName)
        const value = combo ? item.price_combo : item.price
        $item.find('input[name="valor"]').val(value)

    }).on('change', 'input[name="combo"]', function () {
        const combo = $(this).is(':checked')
        const $item = $(this).parent().parent()
        const itemName = $item.find('input[name="nome-item"]').val()
        const item = items.find(e => e.name === itemName)
        const value = combo ? item.price_combo : item.price
        $item.find('input[name="valor"]').val(value)
    })

    $modal_adicionar_item.off().on('click', '.novo-item', function () {
        OrderItemModal.add($itens, null, items)
    })
})