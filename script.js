$(document).ready(function() {
    function carregarUsuarios() {
        $.ajax({
            url: 'http://localhost:8080/usuario/todos',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                var tbody = $('#usuarios tbody');
                tbody.empty();
                $.each(data, function(index, usuario) {
                    var tr = $('<tr></tr>');
                    tr.append('<td>' + usuario.nome + '</td>');
                    tr.append('<td>' + usuario.email + '</td>');

                    tr.append('<td><button class="delete-btn" data-id="' + usuario.id + '">Deletar</button></td>');
                    tbody.append(tr);
                });

                $('.delete-btn').on('click', function() {
                    var id = $(this).data('id');
                    deletarUsuario(id);
                });
            },
            error: function(xhr, status, error) {
                console.error('Erro ao carregar dados:', status, error);
            }
        });
    }


    function deletarUsuario(id) {
        $.ajax({
            url: 'http://localhost:8080/usuario/' + id,
            method: 'DELETE',
            success: function() {
                alert('Usuário deletado com sucesso');
                carregarUsuarios();
            },
            error: function(xhr, status, error) {
                console.error('Erro ao deletar usuário:', status, error);
            }
        });
    }

    function criarUsuario(usuario) {
        $.ajax({
            url: 'http://localhost:8080/usuario',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(usuario),
            success: function() {
                alert('Usuário criado com sucesso');
                $('#novo-usuario-form').hide();
                carregarUsuarios();
            },
            error: function(xhr, status, error) {
                console.error('Erro ao criar usuário:', status, error);
            }
        });
    }


    $('#novo-usuario-btn').on('click', function() {
        $('#novo-usuario-form').toggle();
    });


    $('#form-novo-usuario').on('submit', function(event) {
        event.preventDefault();

        var novoUsuario = {
            nome: $('#nome').val(),
            email: $('#email').val(),
            senha: $('#senha').val()
        };

        criarUsuario(novoUsuario);
    });


    $('#cancelar-btn').on('click', function() {
        $('#novo-usuario-form').hide();
    });
    carregarUsuarios();
});
