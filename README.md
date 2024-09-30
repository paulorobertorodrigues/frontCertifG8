#Certificado Component
Este componente React é responsável pela gestão de certificados de autenticidade. Ele permite que o usuário crie, atualize, pesquise, e apague certificados, além de gerar um PDF para cada certificado registrado.

Importações
React, { useState }: Para criar componentes e gerenciar o estado.
axios: Para fazer requisições HTTP ao backend.
SweetAlert2 (Swal): Para mostrar alertas amigáveis ao usuário.
useNavigate: Para redirecionamento dentro da aplicação.
bootstrap: Para usar estilos prontos do Bootstrap.
VITE_API_URL: Importa a URL da API configurada no arquivo .env.
Interfaces
Empregado: Define a estrutura dos dados de cada empregado, com os seguintes campos:
id: Número identificador único.
data: Data de criação do documento.
revisao: Número da revisão do documento.
codigo: Código do documento.
validade: Data de validade do documento.
responsavel: Nome do responsável técnico pelo documento.
registro: Número do registro profissional (CREA).
Estados
data, revisao, codigo, validade, responsavel, registro: Armazenam as informações dos campos do formulário.
id: Usado para identificar o empregado a ser editado ou deletado.
editar: Booleano que define se o formulário está no modo de edição ou criação.
empregadosList: Lista de empregados carregados da API.
searchTerm: Termo de busca usado para filtrar os empregados.
filteredEmpregados: Lista de empregados filtrados com base no termo de busca.
Funções Principais
add:

Cadastra um novo certificado.
Verifica se o código já existe e se todos os campos obrigatórios foram preenchidos.
Faz uma requisição POST para criar o certificado e atualiza a lista de empregados.
Mostra mensagens de sucesso ou erro usando Swal.
update:

Atualiza as informações de um certificado existente.
Faz uma requisição PUT e atualiza a lista de empregados.
deleteEmple:

Deleta um certificado baseado no id.
Usa Swal para confirmar a exclusão antes de enviar a requisição DELETE.
limparCampo:

Reseta os campos do formulário para o estado inicial.
editarEmpregado:

Preenche os campos do formulário com os dados do certificado selecionado para edição.
getEmpregados:

Faz uma requisição GET para carregar todos os certificados da API e os armazena no estado empregadosList.
search:

Filtra os empregados com base no código informado no campo de busca.
Layout
Formulário: Um conjunto de campos para entrada de dados, como data de elaboração, revisão, código, validade, responsável e registro.
Botões:
Registrar: Para adicionar novos certificados.
Editar: Para modificar um certificado existente.
Cancelar: Para cancelar uma edição em andamento.
Pesquisar: Para buscar certificados com base no código.
PDF: Redireciona para uma página que gera um PDF com as informações do certificado.
Tabela
Exibe os certificados cadastrados em uma tabela, com as seguintes colunas:

Data
Revisão
Código
Validade
Responsável
Registro
Ações (Editar, Deletar, Gerar PDF)
Considerações
O componente interage com a API via Axios para realizar as operações CRUD (Create, Read, Update, Delete).
O SweetAlert2 é usado para melhorar a experiência do usuário, mostrando mensagens amigáveis e alertas.
A navegação para a página de geração de PDF é feita usando useNavigate do React Router.
Este código está bem estruturado para ser reutilizável, com validações e alertas amigáveis que ajudam a prevenir erros.

#Componente Login
O componente Login é responsável por gerenciar a autenticação do usuário no sistema. Ele fornece uma interface para que o usuário insira seu e-mail e senha e, em seguida, faz uma requisição à API para verificar as credenciais.

Importações
React, { useState }: Importa o React e a função useState para gerenciar o estado do componente.
axios: Para fazer requisições HTTP ao backend.
useNavigate: Para gerenciar a navegação entre diferentes páginas da aplicação.
style.css, App.css, Login.css: Arquivos de estilo que aplicam estilos específicos ao componente e à aplicação.
Variáveis e Estado
URL: Importa a URL da API configurada no arquivo .env.
values: Um estado que armazena as credenciais de login (e-mail e senha) do usuário.
error: Um estado que armazena mensagens de erro caso o login falhe.
navigate: Função do React Router para redirecionar o usuário após um login bem-sucedido.
Comportamento
axios.defaults.withCredentials: Configura o axios para incluir cookies em todas as requisições, o que é útil para autenticações que dependem de cookies de sessão.
Função handleSubmit
Parâmetro: event: O evento do formulário.
Prevent Default: Impede que o formulário seja enviado de maneira tradicional, permitindo um tratamento personalizado.
Requisição POST: Faz uma requisição ao endpoint de login (/auth/adminlogin) da API com os valores de e-mail e senha.
Sucesso: Se a resposta da API indicar um status de login bem-sucedido (result.data.loginStatus), o usuário é redirecionado para a página de certificados (/certificado).
Erro: Se o login falhar, a mensagem de erro recebida é armazenada no estado error.
Layout
Estrutura: O componente renderiza uma interface responsiva e centralizada para o login.
Mensagem de Erro: Exibe qualquer mensagem de erro recebida ao tentar fazer login.
Logo: Exibe a imagem do logotipo da empresa na parte superior do formulário.
Formulário: Contém campos de entrada para o e-mail e a senha.
Campo de E-mail: Um campo de texto que aceita endereços de e-mail.
Campo de Senha: Um campo de texto que oculta a entrada do usuário.
Botão de Login: Um botão que, quando clicado, chama a função handleSubmit para processar o login.
Considerações
Validações: Não há validações adicionais nos campos de entrada além das nativas do HTML.
Experiência do Usuário: O componente apresenta uma mensagem de erro clara em caso de falha de autenticação, melhorando a experiência do usuário.
Responsividade: O uso de classes do Bootstrap garante que o layout se ajuste bem a diferentes tamanhos de tela.
Resumo
O componente Login é um formulário simples e eficaz para autenticação de usuários. Ele gerencia o estado das entradas do usuário e lida com a comunicação com a API para verificar as credenciais, fornecendo feedback em caso de sucesso ou erro.


#Componente PDFPage
O componente PDFPage permite a visualização e download de um certificado em formato PDF. Ele exibe detalhes do certificado e inclui um QR code que leva à URL atual da página.

Importações
React: Importa o React para criar o componente.
useLocation, useParams: Hooks do React Router para acessar a localização atual e os parâmetros da URL.
bootstrap/dist/css/bootstrap.min.css: Importa o CSS do Bootstrap para estilos.
html2pdf.js: Biblioteca para gerar PDFs a partir de elementos HTML.
QRCodeCanvas: Componente para gerar um QR code.
logoG8, certifiedLogo: Imagens utilizadas no certificado.
Função PDFPage
A função principal do componente que renderiza a interface e manipula a geração do PDF.

Variáveis e Estado
location: Usado para acessar o estado passado pela navegação anterior, que contém as informações do certificado.
id: Captura o ID ou código da URL.
data, revisao, codigo, validade, responsavel, registro: Variáveis extraídas do estado de location, que armazenam as informações necessárias para preencher o certificado.
Função generatePDF
Objetivo: Gera um PDF com base no conteúdo exibido na página.
Elementos: Captura o elemento HTML com o ID todo que contém todas as informações do certificado.
Botão: O botão de download é ocultado durante a geração do PDF para melhorar a experiência do usuário.
Configurações do PDF: Define margens, nome do arquivo, qualidade da imagem e formatação do PDF usando a biblioteca html2pdf.
Salvamento: Após a geração do PDF, o botão é exibido novamente.
URL Atual
currentUrl: Armazena a URL atual da página, que será codificada em QR code.
Estrutura do Layout
Container Principal: Um div com a classe container que serve como contêiner para o conteúdo do certificado.
Card: Utiliza um card do Bootstrap para estruturar o layout do certificado.
Cabeçalho: Contém o logotipo e o QR code para a URL atual.
Título: Um título que indica que se trata de um "Certificado de Autenticidade".
Dados do Certificado: Exibe as informações do certificado em uma série de divs e p com formatação de tabela.
Data da Elaboração
Revisão do Documento
Código do Documento
Validade
Responsável Técnico
Registro Profissional
Informações da Empresa: Inclui detalhes da empresa que emitiu o certificado, como nome, CNPJ, site e e-mail, acompanhados de logotipo.
Botão de Download
Um botão que chama a função generatePDF para baixar o PDF do certificado.
Resumo
O componente PDFPage é responsável por exibir um certificado de autenticidade e gerar um PDF com suas informações. Ele utiliza html2pdf para capturar o conteúdo HTML e converter em PDF, além de incorporar um QR code que aponta para a URL atual da página. O layout é estilizado com Bootstrap, garantindo uma apresentação adequada e responsiva.


#Função reportWebVitals
A função reportWebVitals é responsável por coletar métricas de desempenho da aplicação e, opcionalmente, enviar essas métricas para uma função callback fornecida. Essa função utiliza a biblioteca web-vitals para medir indicadores cruciais de desempenho da web.

Parâmetros
onPerfEntry (opcional): Uma função de callback que será chamada com os dados de desempenho. Se fornecida, deve ser do tipo (metric: any) => void.
Lógica da Função
Verificação de onPerfEntry:

A função primeiro verifica se onPerfEntry foi fornecida e se é uma função. Caso contrário, não executa nada.
Importação da Biblioteca web-vitals:

A função utiliza uma importação dinâmica para carregar a biblioteca web-vitals. Isso é feito para otimizar o desempenho, garantindo que a biblioteca só seja carregada quando necessário.
Medição de Métricas:

Após a importação bem-sucedida, a função extrai os seguintes métodos da biblioteca:
getCLS: Cumulative Layout Shift - mede a mudança cumulativa do layout da página.
getFID: First Input Delay - mede o tempo entre a primeira interação do usuário e o momento em que o navegador começa a processar a resposta.
getFCP: First Contentful Paint - mede o tempo até que o primeiro conteúdo seja pintado na tela.
getLCP: Largest Contentful Paint - mede o tempo até que o maior elemento de conteúdo visível seja pintado.
getTTFB: Time to First Byte - mede o tempo até que o primeiro byte da resposta do servidor seja recebido.
Chamada das Métricas:

Cada uma das funções de métrica é chamada, passando onPerfEntry como argumento. Isso permite que os resultados de cada métrica sejam enviados para a função de callback.
Exportação
A função reportWebVitals é exportada como padrão para que possa ser importada e utilizada em outros módulos da aplicação.
Resumo
A função reportWebVitals permite a coleta de métricas de desempenho da aplicação utilizando a biblioteca web-vitals. Ela verifica se uma função de callback foi fornecida e, se assim for, chama essa função com as métricas coletadas, que são importantes para entender e melhorar a experiência do usuário em uma aplicação web. Essa abordagem ajuda os desenvolvedores a monitorar e otimizar o desempenho da aplicação em tempo real


#Componente App
O componente App é o ponto de entrada da aplicação. Ele configura o roteamento usando react-router-dom e define quais componentes devem ser renderizados em diferentes caminhos da URL.

Importações
import './App.css': Importa o arquivo CSS que contém estilos específicos para o componente App.
import 'bootstrap/dist/css/bootstrap.min.css': Importa o CSS do Bootstrap para estilização e layout responsivo.
import Login from './Components/Login': Importa o componente Login, que é exibido na página inicial.
import { BrowserRouter, Routes, Route } from 'react-router-dom': Importa os componentes necessários do react-router-dom para habilitar o roteamento da aplicação.
import Certificado from './Components/Certificado': Importa o componente Certificado, que será exibido em uma rota específica.
import PDFPage from './Components/PDFPage': Importa o componente PDFPage, que exibe uma página com um PDF gerado a partir de um código.
Função App
A função App retorna a estrutura de roteamento da aplicação dentro do componente BrowserRouter, que habilita a navegação de uma página para outra sem recarregar a página inteira.
Renderização
<BrowserRouter>: Envolve as rotas, permitindo o uso do sistema de roteamento do React.

<Routes>: Contém todas as definições de rota da aplicação.

Definições de Rota:

Rota para Login:
path='/': A URL base da aplicação.
element={<Login />}: Renderiza o componente Login quando a URL corresponde a '/'.
Rota para Certificado:
path='/certificado': URL que renderiza a página de certificado.
element={<Certificado />}: Renderiza o componente Certificado quando a URL corresponde a '/certificado'.
Rota para PDFPage:
path="/pdf/:codigo": URL que aceita um parâmetro dinâmico chamado codigo.
element={<PDFPage />}: Renderiza o componente PDFPage quando a URL corresponde ao formato /pdf/:codigo.
Exportação
O componente App é exportado como padrão, tornando-o disponível para ser importado em outros módulos, como o ponto de entrada da aplicação (normalmente em index.js).
Resumo
O componente App configura o roteamento da aplicação React, permitindo a navegação entre diferentes componentes, como a página de login, a página de certificado e a página PDF. Utiliza a biblioteca react-router-dom para gerenciar as rotas e renderizar os componentes adequadamente com base na URL acessada. A estrutura modular e a importação do Bootstrap ajudam na estilização e responsividade da aplicação.

Declarações de Módulo TypeScript
Este código contém declarações de módulo que informam ao TypeScript sobre a existência de módulos que não possuem definições de tipo apropriadas. Isso permite que você use essas bibliotecas sem que o TypeScript exiba erros relacionados à falta de tipos.

Declaração do Módulo html2pdf.js
typescript
Copiar código
declare module 'html2pdf.js' {
    const html2pdf: any;
    export default html2pdf;
}
declare module 'html2pdf.js': Esta linha indica ao TypeScript que há um módulo chamado html2pdf.js. Este módulo é uma biblioteca JavaScript que permite converter elementos HTML em arquivos PDF.

const html2pdf: any;: Declara uma constante chamada html2pdf que é do tipo any. Usar any permite que você utilize a biblioteca sem especificar tipos, mas isso também significa que você perde os benefícios da verificação de tipo do TypeScript.

export default html2pdf;: Exporta a constante html2pdf como padrão, tornando-a disponível para importação em outros arquivos. Isso permite que você utilize a biblioteca em seu código, mesmo sem definições de tipo específicas.

Declaração do Módulo ./App
typescript
Copiar código
declare module './App' {
    const content: any;
    export default content;
}
declare module './App': Esta linha indica ao TypeScript que há um módulo que corresponde ao arquivo App. Este módulo refere-se ao componente principal da aplicação.

const content: any;: Declara uma constante chamada content que é do tipo any. Isso permite que você importe o módulo App sem especificar um tipo exato.

export default content;: Exporta a constante content como padrão, permitindo que o conteúdo do módulo App seja importado em outros arquivos.

Resumo
Essas declarações de módulo são usadas em TypeScript para permitir a importação de bibliotecas e módulos que não possuem definições de tipo. Ao declarar os módulos, você evita erros de compilação, permitindo a integração de bibliotecas externas, como html2pdf.js e o componente principal da aplicação (./App). Usar any para os tipos permite flexibilidade, mas é importante ter em mente que isso pode levar à falta de verificação de tipo, o que pode resultar em erros em tempo de execução.

#Código de Inicialização da Aplicação React
Este código é responsável por renderizar a aplicação React no DOM. Ele utiliza o método createRoot da biblioteca react-dom para configurar a renderização, além de envolver o componente principal da aplicação (App) em um modo estrito para ajudar a identificar problemas potenciais.

Importações
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { StrictMode } from 'react';: Importa o componente StrictMode do React. O StrictMode é uma ferramenta que ajuda a identificar problemas potenciais em uma aplicação, como componentes desatualizados ou práticas inseguras.

import { createRoot } from 'react-dom/client';: Importa a função createRoot da biblioteca react-dom/client, que é usada para inicializar a renderização de uma aplicação React a partir de uma raiz do DOM.

import App from './App';: Importa o componente principal da aplicação, que normalmente contém a estrutura principal e a lógica da aplicação.

import './index.css';: Importa o arquivo CSS para estilização global da aplicação.

Inicialização e Renderização
javascript
Copiar código
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
createRoot(document.getElementById('root')!):

Utiliza a função createRoot para criar uma nova raiz React. O método document.getElementById('root') procura um elemento no DOM com o ID root.
O operador ! após getElementById é um operador de asserção de não nulidade (non-null assertion operator), indicando ao TypeScript que você tem certeza de que o elemento existe. Isso pode prevenir erros se o elemento não estiver presente, mas deve ser usado com cautela.
.render(...): Chama o método render na raiz criada para renderizar o conteúdo React.

<StrictMode>: O componente StrictMode é usado para envolver a aplicação, ativando verificações adicionais em tempo de desenvolvimento, como a identificação de componentes não seguros e práticas desatualizadas.

<App />: Renderiza o componente principal App dentro do StrictMode. Esse componente representa a estrutura e a lógica principal da aplicação.

Resumo
Este código configura e renderiza uma aplicação React no DOM, garantindo que a aplicação seja executada em um modo estrito para ajudar a identificar problemas de desenvolvimento. O uso de createRoot melhora a experiência de renderização e permite a implementação de recursos de React 18, como a concorrência e a suspensão. O componente App serve como ponto de entrada da aplicação, enquanto o arquivo CSS fornece a estilização necessária.

#@types
Declaração do Módulo qrcode.react
Este código define um módulo TypeScript para o pacote qrcode.react, que é uma biblioteca que permite gerar códigos QR como componentes React. A declaração do módulo especifica as propriedades esperadas para o componente QRCodeCanvas.

Declaração do Módulo
typescript
Copiar código
declare module 'qrcode.react' {
declare module 'qrcode.react': Inicia a declaração de um módulo para o pacote qrcode.react. Isso permite que o TypeScript reconheça o módulo e suas exportações.
Importação de Componentes
typescript
Copiar código
import { Component } from 'react';
import { Component } from 'react';: Importa a classe Component do React, que é a base para todos os componentes de classe em uma aplicação React.
Interface QRCodeProps
typescript
Copiar código
export interface QRCodeProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    includeMargin?: boolean;
    renderAs?: 'canvas' | 'svg';
}
export interface QRCodeProps: Declara uma interface chamada QRCodeProps, que define as propriedades que podem ser passadas para o componente QRCodeCanvas.
Propriedades da Interface
value: string;: O valor que será codificado no código QR. Esta propriedade é obrigatória.

size?: number;: O tamanho do código QR, em pixels. Esta propriedade é opcional.

bgColor?: string;: A cor de fundo do código QR. Esta propriedade é opcional.

fgColor?: string;: A cor do código QR. Esta propriedade é opcional.

level?: 'L' | 'M' | 'Q' | 'H';: O nível de correção de erros do código QR. Os níveis possíveis são:

'L': 7% de correção de erros.
'M': 15% de correção de erros.
'Q': 25% de correção de erros.
'H': 30% de correção de erros.
Esta propriedade é opcional.

includeMargin?: boolean;: Indica se deve incluir uma margem ao redor do código QR. Esta propriedade é opcional.

renderAs?: 'canvas' | 'svg';: Define o formato de renderização do código QR. Os formatos possíveis são 'canvas' ou 'svg'. Esta propriedade é opcional.

Classe QRCodeCanvas
typescript
Copiar código
export default class QRCodeCanvas extends Component<QRCodeProps> {}
export default class QRCodeCanvas: Declara uma classe chamada QRCodeCanvas, que é exportada como a exportação padrão do módulo. Esta classe estende a classe Component do React e aceita as propriedades definidas na interface QRCodeProps.
Resumo
Esta declaração de módulo fornece suporte TypeScript para o pacote qrcode.react, permitindo que os desenvolvedores utilizem o componente QRCodeCanvas em suas aplicações React com tipagem adequada. A interface QRCodeProps define as propriedades que podem ser passadas para o componente, tornando a utilização do código QR mais flexível e personalizada.

#Declaração do Módulo web-vitals
Este código define um módulo TypeScript para o pacote web-vitals, que é uma biblioteca que permite medir as principais métricas de desempenho da web, ajudando a avaliar a experiência do usuário em um site.

#Declaração do Módulo
declare module 'web-vitals' {
declare module 'web-vitals': Inicia a declaração de um módulo para o pacote web-vitals. Isso permite que o TypeScript reconheça o módulo e suas exportações.
Funções Exportadas
O módulo web-vitals exporta as seguintes funções, cada uma responsável por coletar uma métrica específica de desempenho da web:

typescript
Copiar código
export const getCLS: (onPerfEntry?: (metric: any) => void) => void;
getCLS: Obtém a métrica Cumulative Layout Shift (CLS), que mede a estabilidade visual da página. É uma métrica crucial para a experiência do usuário, pois reflete mudanças inesperadas no layout.
typescript
Copiar código
export const getFID: (onPerfEntry?: (metric: any) => void) => void;
getFID: Obtém a métrica First Input Delay (FID), que mede o tempo que leva para o navegador responder à primeira interação do usuário com a página, como cliques ou toques. Essa métrica ajuda a entender a interatividade da página.
typescript
Copiar código
export const getFCP: (onPerfEntry?: (metric: any) => void) => void;
getFCP: Obtém a métrica First Contentful Paint (FCP), que mede o tempo que leva para o primeiro conteúdo visual ser renderizado na tela. Essa métrica é importante para a percepção de velocidade do site pelo usuário.
typescript
Copiar código
export const getLCP: (onPerfEntry?: (metric: any) => void) => void;
getLCP: Obtém a métrica Largest Contentful Paint (LCP), que mede o tempo que leva para o maior elemento de conteúdo visível ser renderizado. Essa métrica é essencial para entender o tempo de carregamento percebido.
typescript
Copiar código
export const getTTFB: (onPerfEntry?: (metric: any) => void) => void;
getTTFB: Obtém a métrica Time to First Byte (TTFB), que mede o tempo que leva para o navegador receber o primeiro byte de resposta do servidor. Essa métrica é importante para avaliar a eficiência do servidor e da rede.
Resumo
Esta declaração de módulo fornece suporte TypeScript para o pacote web-vitals, permitindo que os desenvolvedores utilizem suas funções para medir e reportar métricas importantes de desempenho da web em suas aplicações. Cada função exportada coleta uma métrica específica, que é crucial para entender e melhorar a experiência do usuário em um site. As métricas coletadas podem ser utilizadas para monitorar o desempenho e otimizar a performance da aplicação web.

##Criado por Paulo Roberto Menezes Rodrigues para a empresa G8 Consultoria Assessoria Treinamentos!!!


Dependências de Produção
axios: ^1.7.7
bootstrap: ^5.3.3
bootstrap-icons: ^1.11.3
html2pdf.js: ^0.10.2
qrcode.react: ^4.0.1
react: ^18.3.1
react-dom: ^18.3.1
sweetalert2: ^11.6.13
web-vitals: ^4.2.3
Dependências de Desenvolvimento
@eslint/js: ^9.9.0
@types/node: ^22.7.4
@types/qrcode.react: ^1.0.5
@types/react: ^18.3.9
@types/react-dom: ^18.3.0
@types/react-router-dom: ^5.3.3
@vitejs/plugin-react-swc: ^3.5.0
eslint: ^9.9.0
eslint-plugin-react-hooks: ^5.1.0-rc.0
eslint-plugin-react-refresh: ^0.4.9
globals: ^15.9.0
react-router-dom: ^6.26.2
typescript: ^5.5.3
typescript-eslint: ^8.0.1
vite: ^5.4.1
Observações
Dependências de Produção: Necessárias para a execução do seu aplicativo em ambiente de produção.
Dependências de Desenvolvimento: Usadas durante o desenvolvimento, testes e linting, mas não são necessárias em produção.
O Vite é uma ferramenta de construção e desenvolvimento para aplicativos front-end que oferece um servidor de desenvolvimento rápido.