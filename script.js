// Captura o formulário e a lista onde as ordens serão exibidas
const ordemForm = document.getElementById('ordem-form');
const ordensLista = document.getElementById('ordens-lista');

// Função para adicionar uma nova ordem à lista
ordemForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  // Captura os valores dos campos do formulário
  const descricao = document.getElementById('descricao').value;
  const cliente = document.getElementById('cliente').value;
  const dataInicio = document.getElementById('data-inicio').value;

  // Verifica se todos os campos foram preenchidos
  if (descricao && cliente && dataInicio) {
    // Cria o item da ordem
    const novaOrdem = document.createElement('li');
    novaOrdem.innerHTML = `
      <strong>Descrição:</strong> ${descricao} <br>
      <strong>Cliente:</strong> ${cliente} <br>
      <strong>Data de Início:</strong> ${dataInicio}
    `;
    
    // Adiciona o item na lista
    ordensLista.appendChild(novaOrdem);

    // Gera o PDF com as informações da ordem de serviço
    gerarPDF(descricao, cliente, dataInicio);

    // Limpa os campos do formulário após a submissão
    ordemForm.reset();
  } else {
    alert('Por favor, preencha todos os campos!');
  }
});

// Função para gerar o PDF
function gerarPDF(descricao, cliente, dataInicio) {
    // Criando o documento PDF com jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    // Definindo a fonte do documento (opcional, mas recomendado para um design melhor)
    doc.setFont("helvetica");
    doc.setFontSize(14);
  
    // Título do PDF
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40); // Cor do texto
    doc.text("Ordem de Serviço", 105, 20, { align: "center" });
  
    // Nome da empresa "Tecnogrup"
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 255); // Cor azul para o nome da empresa
    doc.text("Tecnogrup", 105, 30, { align: "center" });
  
    // Adicionando uma linha de divisão que vai de um lado ao outro
    doc.setDrawColor(0, 0, 0); // Cor da linha (preta)
    doc.setLineWidth(0.5); // Largura da linha
    doc.line(10, 35, 200, 35); // Linha da esquerda para a direita
  
    // Informações da ordem de serviço (centralizadas)
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Cor do texto
  
    // Alinhamento centralizado
    doc.text(`Descrição: ${descricao}`, 105, 50, { align: "center" });
    doc.text(`Cliente: ${cliente}`, 105, 60, { align: "center" });
    doc.text(`Data de Início: ${dataInicio}`, 105, 70, { align: "center" });
  
    // Adicionando outra linha de divisão
    doc.line(10, 75, 200, 75); // Linha da esquerda para a direita
  
    // Rodapé (se necessário)
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150); // Cor para o rodapé
    doc.text("Gerado por Sistema de Ordem de Serviço", 105, 280, { align: "center" });
  
    // Salvar o PDF com o nome 'ordem_servico.pdf'
    doc.save('ordem_servico.pdf');
  }
  