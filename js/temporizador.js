(function($) {
    $.fn.temporizador = function(opcoes){
        // padrão assumido caso opcoes esteja vazio
        const opcoesFinais = $.extend({
            mensagem: 'Em breve!',
            horario: '23:59:59'
        }, opcoes)

        function criarSpan(classe, valor){
            return $(`<span class="${classe}">`).html(valor)
        }

        const diaDezena = criarSpan('digito', "0")
        const diaUnidade = criarSpan('digito', "0")
        const horaDezena = criarSpan('digito', "0")
        const horaUnidade = criarSpan('digito', "0")
        const minutoDezena = criarSpan('digito', "0")
        const minutoUnidade = criarSpan('digito', "0")
        const segundoDezena = criarSpan('digito', "0")
        const segundoUnidade = criarSpan('digito', "0")

        const separadorHora = criarSpan('separador', ":")
        const separadorMinuto = criarSpan('separador', ":")
        const mensagem = $('<div class="mensagem">').html(opcoesFinais.mensagem)

        $(this).addClass('temporizador')
        $(this).append(horaDezena, horaUnidade, separadorHora, minutoDezena, minutoUnidade, separadorMinuto, segundoDezena, segundoUnidade, mensagem)

        const regex = new RegExp(/(\d\d):(\d\d):(\d\d)/)
        const horarioAlvo = regex.exec(opcoesFinais.horario)

        let temporizador = setInterval(() => {
            const agora = new Date()
            const alvo = new Date()
            alvo.setHours(horarioAlvo[1])
            alvo.setMinutes(horarioAlvo[2])
            alvo.setSeconds(horarioAlvo[3])

            const diferencaEmMili = alvo.getTime() - agora.getTime()

            if(diferencaEmMili >= 0){

                // toISOString mostra o tempo certo no formato sem considerar timezone, e o regex retira apenas o necessário
                const diferenca = regex.exec(new Date(diferencaEmMili).toISOString())

                horaDezena.html(diferenca[1][0])
                horaUnidade.html(diferenca[1][1])
                minutoDezena.html(diferenca[2][0])
                minutoUnidade.html(diferenca[2][1])
                segundoDezena.html(diferenca[3][0])
                segundoUnidade.html(diferenca[3][1])
            } else {
                clearInterval(temporizador)
            }
        }, 1000);

        return this
    }
})(jQuery)

