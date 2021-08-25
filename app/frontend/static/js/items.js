const $modalConfirm = $('#modal-confirm')
const $modalItem = $('#modal-item')
const $items = $('#items')
const $newItem = $('#new-item')

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
        if (data.length === 0) {
            $criarPedido.prop("disabled", true)
            $pedidos.append("<h1><a href='/items' class='text-decoration-none'>Cadastre um item</a> antes de adicionar novos pedidos.</h1>")
        }
    },
    (jqXHR, textStatus, errorThrown) => {
        tata.error("Falha de comunicação", "Verifique o servidor da API", {
            position: 'br',
            duration: 6000
        })
    }
)