// ==UserScript==
// @name         Farm‑Test com UI
// @namespace    http://seu-site-ou-namespace/
// @version      1.0
// @description  Script de farm com janela de opções embutida
// @match        https://*.tribalwars.com.br/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 1. Aguarda jQuery carregado
    function whenReady(fn) {
        if (window.$) return fn();
        setTimeout(() => whenReady(fn), 100);
    }

    whenReady(init);

    function init() {
        console.log('[Farm‑Test] iniciado');

        // 2. Injeta botão de configurações junto ao link do quickbar
        const btnSelector = '#quickbar_linkFarm‑Test';
        const $btn = $(btnSelector);
        if ($btn.length) {
            const $optToggle = $('<a href="#" title="Configurar Farm‑Test">⚙</a>')
                .css({marginLeft:'5px', cursor:'pointer', color:'#3a3'})
                .click(e => {
                    e.preventDefault();
                    showOptions();
                });
            $btn.after($optToggle);
        }

        // 3. Função para mostrar o modal de opções
        function showOptions() {
            if ($('#ft-modal').length) return; // não duplicar

            const tpl = `
              <div id="ft-modal" style="
                position:fixed;
                top:80px;
                left:50%;
                transform:translateX(-50%);
                background:#f5f0e0;
                border:2px solid #333;
                padding:20px;
                z-index:10000;
                box-shadow:0 0 10px rgba(0,0,0,0.5);
                font-family:Arial, sans-serif;
              ">
                <h2 style="margin-top:0">Farm‑Test Options</h2>
                <label>Máx. de campos por aldeia:
                  <input id="ft-maxFields" type="number" value="25" style="width:50px">
                </label><br><br>
                <label>Intervalo mínimo (min):
                  <input id="ft-interval" type="number" value="10" style="width:50px">
                </label><br><br>
                <label><input id="ft-partial" type="checkbox" checked> Incluir aldeias com perdas parciais</label><br>
                <label><input id="ft-full" type="checkbox" checked> Enviar B‑farm se loot cheio</label><br><br>
                <button id="ft-run" style="margin-right:10px">Iniciar Farm</button>
                <button id="ft-close">Fechar</button>
              </div>`;

            $('body').append(tpl);

            $('#ft-close').click(() => $('#ft-modal').remove());
            $('#ft-run').click(runFarm);
        }

        // 4. Função principal de farm (exemplo)
        function runFarm() {
            const maxFields = parseInt($('#ft-maxFields').val(),10);
            const interval  = parseInt($('#ft-interval').val(),10);
            const partial   = $('#ft-partial').is(':checked');
            const full      = $('#ft-full').is(':checked');

            console.log('[Farm‑Test] runFarm:', { maxFields, interval, partial, full });
            $('#ft-modal').remove();

            // === AQUI VOCÊ IMPLEMENTA SUA LÓGICA ===
            // Exemplo simples: varre relatórios recentes e pluga na função de envio
            const reports = getReports();     // sua função que coleta relatórios
            const targets = planFarms(reports, { maxFields, partial, full });
            sendTroops(targets, interval);
        }

        // STUBS para exemplificar (substitua pela sua lógica real):
        function getReports() {
            // buscar relatórios DOM, filtrar loot disponível, etc.
            console.log('[Farm‑Test] coletando relatórios...');
            return []; 
        }
        function planFarms(reports, opts) {
            console.log('[Farm‑Test] planejando farms com opts', opts);
            return []; 
        }
        function sendTroops(targets, interval) {
            console.log('[Farm‑Test] enviando tropas para', targets, 'a cada', interval, 'min');
            // chamar a API interna do jogo ou simular cliques
        }
    }
})();
