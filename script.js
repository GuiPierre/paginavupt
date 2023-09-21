
// Função para alternar a visibilidade das opções do multiselect
function toggleOptions(event) {
    event.stopPropagation();
    const container = event.currentTarget;
    const options = container.querySelector('.multiselect-options');
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
    container.classList.toggle('active');
}

// Função para marcar ou desmarcar todas as opções em um multiselect
function toggleAllOptions(checkbox) {
    const container = checkbox.closest('.multiselect-container');
    const allCheckboxes = container.querySelectorAll('.multiselect-options input[type="checkbox"]');
    
    for (const optionCheckbox of allCheckboxes) {
        optionCheckbox.checked = checkbox.checked;
    }

    const selectedTextElement = container.querySelector('.selected-options');
    if (checkbox.checked) {
        selectedTextElement.textContent = 'TODOS';
    } else {
        updateSelectedOptionsText(container);
    }
}

// Função para atualizar o texto exibido com base nas opções selecionadas
function updateSelectedOptionsText(container) {
    const selectedOptions = container.querySelectorAll('.multiselect-options input[type="checkbox"]:not(#todos):checked');
    const selectedTextElement = container.querySelector('.selected-options');

    if (selectedOptions.length === 0 || selectedOptions.length === selectedOptions.length - 1 || selectedOptions.length >=7) {
        selectedTextElement.textContent = 'TODOS';
    } else {
        selectedTextElement.textContent = selectedOptions.length + ' selecionados';
    }
}

// Função para atualizar as seleções
function updateSelections() {
    const container = event.currentTarget.closest('.multiselect-container');
    updateSelectedOptionsText(container);
}

// Ouvinte de evento para fechar a lista de opções quando clicar fora dela
document.addEventListener('click', function (event) {
    const multiselectContainers = document.querySelectorAll('.multiselect-container');
    for (const container of multiselectContainers) {
        const options = container.querySelector('.multiselect-options');
        if (options && !options.contains(event.target)) {
            options.style.display = 'none';
            container.classList.remove('active');
        }
    }
});

// Ouvinte de evento para fechar a lista de opções quando pressionar a tecla "Esc"
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const multiselectContainers = document.querySelectorAll('.multiselect-container');
        for (const container of multiselectContainers) {
            const options = container.querySelector('.multiselect-options');
            if (options.style.display === 'block') {
                options.style.display = 'none';
                container.classList.remove('active');
            }
        }
    }
});