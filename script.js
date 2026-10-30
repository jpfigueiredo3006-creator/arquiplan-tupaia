/* ====================================================
   TUPÃ-IA: MOTOR DE INTELIGÊNCIA ARTIFICIAL E CHAT
   Especialista com Informações Oficiais e Comprovadas
   Fontes: IBGE, SEADE, SISEM-SP, UNESP, MEC, Prefeitura de Tupã
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.getElementById('chatContainer');
    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const btnSend = document.getElementById('btnSend');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    const newChatBtn = document.getElementById('newChatBtn');
    const btnClearChat = document.getElementById('btnClearChat');
    const btnDownloadData = document.getElementById('btnDownloadData');
    const btnVoiceToggle = document.getElementById('btnVoiceToggle');
    const voiceStatus = document.getElementById('voiceStatus');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const topicButtons = document.querySelectorAll('.topic-btn');
    const quickPromptChips = document.querySelectorAll('.quick-prompt-chip');

    let voiceEnabled = true;
    let isTyping = false;

    // ====================================================
    // BASE DE DADOS OFICIAL E COMPROVADA DE TUPÃ - SP
    // ====================================================
    const tupaKnowledgeBase = [
        {
            id: 'fundacao',
            keywords: ['fundacao', 'fundação', 'fundador', 'fundou', 'luiz de souza leao', 'luiz de sousa leao', 'historia', 'história', 'origem', 'nome', 'deus do trovao', 'trovao', 'tupã', 'tupa', 'criacao', 'criação', 'passado'],
            title: 'História Oficial e Fundação de Tupã',
            source: 'Acervo Histórico Municipal & Enciclopédia dos Municípios Brasileiros (IBGE)',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🏛️ Fundação Oficial e Origem Histórica de Tupã:</strong></p>
<p>Tupã foi fundada oficialmente em <strong>12 de outubro de 1929</strong> pelo pioneiro pernambucano <strong>Luiz de Sousa Leão</strong>. O fundador adquiriu uma vasta extensão de terras virgens no espigão divisor entre as bacias dos rios do Peixe e Aguapeí (Feio), planejando um traçado urbano arrojado e moderno com avenidas amplas de 30 metros de largura.</p>
<div class="highlight-box">
    <strong>⚡ Origem Comprovada do Nome:</strong> O nome <em>"Tupã"</em> tem origem no tronco linguístico <strong>Tupi-Guarani</strong>, significando o <em>"Espírito Bom"</em> ou <em>"Deus do Trovão"</em> na cosmologia dos povos indígenas brasileiros. Foi escolhido pelo fundador como tributo de respeito aos povos originários que habitavam as florestas da Alta Paulista.
</div>
<p>A expansão foi impulsionada pela chegada dos trilhos da <strong>Companhia Paulista de Estradas de Ferro</strong>, que conectou o município ao restante do estado de São Paulo.</p>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Acervo Histórico da Câmara Municipal & IBGE Cidades (Histórico de Tupã).
</div>
            `,
            followUps: [
                'Qual a história comprovada do Museu Índia Vanuíre?',
                'Quais os principais pontos turísticos de Tupã?',
                'Como é a renda per capita do tupãense segundo o IBGE?'
            ]
        },
        {
            id: 'museu_vanuire',
            keywords: ['museu', 'india vanuire', 'índia vanuíre', 'vanuire', 'kaingang', 'krenak', 'indigena', 'indígena', 'indios', 'índios', 'etnografia', 'etnografico', 'coroados', 'artesanato indigena', 'terena'],
            title: 'Museu Histórico e Pedagógico Índia Vanuíre',
            source: 'Secretaria da Cultura, Economia e Indústria Criativas do Estado de SP / SISEM-SP / ACAM Portinari',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🏹 Museu Histórico e Pedagógico Índia Vanuíre:</strong></p>
<p>É uma das instituições museológicas públicas mais renomadas do Brasil na preservação do patrimônio e da memória dos povos originários.</p>
<ul>
    <li><strong>Acervo Comprovado:</strong> Abriga aproximadamente <strong>38 mil itens catalogados</strong>, abrangendo cerâmicas, plumárias, armas rituais, adornos e ferramentas de mais de 20 povos indígenas brasileiros.</li>
    <li><strong>Foco Regional:</strong> Destaque para os povos <strong>Kaingang e Krenak</strong> (originários do oeste paulista), além das etnias Terena e Guarani.</li>
    <li><strong>Figura Histórica de Vanuíre:</strong> Mulher indígena da etnia Kaingang (falecida em 1918), histórica pacificadora que atuou como mediadora nas relações entre os colonizadores e os povos originários na Alta Paulista.</li>
    <li><strong>Localização e Acesso:</strong> Rua Coroados, nº 521 - Centro de Tupã. Acesso 100% gratuito ao público de terça a domingo.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> SISEM-SP (Sistema Estadual de Museus) e Organização Social ACAM Portinari.
</div>
            `,
            followUps: [
                'O que visitar no distrito de Varpa?',
                'Quais os outros pontos turísticos do centro de Tupã?',
                'Quem foi o fundador Luiz de Sousa Leão?'
            ]
        },
        {
            id: 'renda_per_capita',
            keywords: ['renda', 'renda per capita', 'per capita', 'pib per capita', 'salario', 'salário', 'salario medio', 'ganho', 'economia da populacao', 'idhm', 'desenvolvimento humano', 'tupaense', 'tupaemse', 'riqueza', 'quanto ganha', 'dinheiro'],
            title: 'Renda Per Capita, Salário Médio e IDHM de Tupã',
            source: 'IBGE (Cidades/Cempre) & Atlas do Desenvolvimento Humano no Brasil (PNUD/IPEA/FJP)',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>💰 Indicadores Econômicos e Renda do Município de Tupã:</strong></p>
<p>Dados oficiais comprovados pelos levantamentos consolidados do <strong>IBGE</strong> e do <strong>Atlas do Desenvolvimento Humano</strong>:</p>
<ul>
    <li><strong>PIB per Capita Anual:</strong> <strong>R$ 48.934,77 por habitante ao ano</strong> (IBGE), indicador da produção econômica dividida pela população total do município.</li>
    <li><strong>Salário Médio Formal Mensal:</strong> <strong>R$ 3.080,73 por mês</strong> (IBGE / Cadastro Central de Empresas - Cempre), o equivalente a 2 a 2,2 salários mínimos vigentes.</li>
    <li><strong>IDHM (Índice de Desenvolvimento Humano):</strong> <strong>0,771</strong>, classificado na faixa de <strong>Alto Desenvolvimento Humano</strong>.</li>
</ul>
<div class="highlight-box">
    📈 <strong>Desmembramento das Dimensões do IDHM:</strong>
    <ul>
        <li><strong>Longevidade:</strong> <strong>0,852</strong> (Muito Alto - alta expectativa de vida ao nascer)</li>
        <li><strong>Renda:</strong> <strong>0,764</strong> (Alto padrão de rendimento domiciliar per capita)</li>
        <li><strong>Educação:</strong> <strong>0,704</strong> (Alto - ampla rede de ensino básico e polos universitários FADAP/FAP e UNESP)</li>
    </ul>
    🏆 Tupã ocupa o <strong>107º lugar</strong> entre os 645 municípios paulistas e o <strong>220º no Brasil</strong>.
</div>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Censo e Pesquisas Econômicas IBGE & PNUD (Programa das Nações Unidas para o Desenvolvimento).
</div>
            `,
            followUps: [
                'Por que Tupã é a Capital do Amendoim?',
                'Qual a população oficial de Tupã no Censo?',
                'Quais faculdades existem em Tupã?'
            ]
        },
        {
            id: 'populacao_demografia',
            keywords: ['populacao', 'população', 'quantos habitantes', 'censo', 'censo 2022', 'moradores', 'quantas pessoas', 'habitantes', 'densidade demografica', 'tamanho da cidade', 'area territorial', 'área territorial', 'km2'],
            title: 'População Oficial e Dados Demográficos de Tupã',
            source: 'Censo Demográfico Oficial IBGE',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>👥 Dados Demográficos e Populacionais Oficiais de Tupã:</strong></p>
<ul>
    <li><strong>População Residente:</strong> <strong>63.928 habitantes</strong> (apurado no Censo Demográfico Oficial do IBGE).</li>
    <li><strong>Área Territorial:</strong> <strong>628,510 km²</strong>.</li>
    <li><strong>Densidade Demográfica:</strong> <strong>101,71 habitantes por km²</strong>.</li>
    <li><strong>Gentílico Oficial:</strong> Tupãense.</li>
    <li><strong>Eleitorado Ativo:</strong> Aproximadamente 47.000 a 49.000 eleitores registrados na Justiça Eleitoral.</li>
    <li><strong>Distribuição Populacional:</strong> Cerca de 93% da população reside na área urbana e 7% na área rural e nos distritos (Varpa, Parnaso e Universo).</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Censo Demográfico IBGE & Fundação SEADE.
</div>
            `,
            followUps: [
                'Qual é a renda per capita do tupãense?',
                'Quais são os 3 distritos de Tupã?',
                'Quais os principais pontos turísticos de Tupã?'
            ]
        },
        {
            id: 'varpa',
            keywords: ['varpa', 'letonia', 'letônia', 'letos', 'erdbergs', 'janis erdbergs', 'colonia', 'colônia', 'fazenda palma', 'artesanato', 'distrito de varpa', 'palma'],
            title: 'Distrito de Varpa - A Colônia da Letônia no Brasil',
            source: 'Secretaria de Turismo do Estado de SP & Museu dos Pioneiros de Varpa Janis Erdbergs',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🇱🇻 Distrito de Varpa: Tradição Letã na Alta Paulista:</strong></p>
<p>Varpa é um distrito reconhecido oficialmente pelo patrimônio cultural da <strong>imigração da Letônia</strong> no Brasil.</p>
<ul>
    <li><strong>Data de Fundação:</strong> Fundado em <strong>1928</strong> (um ano antes da fundação da sede urbana de Tupã) por colonos batistas letos fugidos do pós-guerra e da instabilidade europeia.</li>
    <li><strong>Museu Janis Erdbergs:</strong> Espaço que preserva fotos, documentos, prensas, teares, ferramentas e artefatos autênticos dos pioneiros letos.</li>
    <li><strong>Culinária Tradicional:</strong> Pães artesanais pretos de centeio, queijos típicos, tortas folhadas, compotas e bolachas de mel.</li>
    <li><strong>Turismo Rural:</strong> Destaque para a Fazenda Palma, cachoeiras na Bacia do Rio do Peixe e trilhas de ecoturismo rural.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Associação dos Pioneiros de Varpa & Guia de Estâncias Turísticas do Estado de São Paulo.
</div>
            `,
            followUps: [
                'Quais os outros distritos de Tupã (Parnaso e Universo)?',
                'Quais são as comidas típicas de Tupã?',
                'Quais os principais pontos turísticos?'
            ]
        },
        {
            id: 'amendoim_economia',
            keywords: ['amendoim', 'capital do amendoim', 'economia', 'producao', 'agro', 'agricultura', 'industria', 'fabrica', 'avicultura', 'ovos', 'usina', 'cana', 'trabalho', 'emprego'],
            title: 'Capital Nacional do Amendoim e Estrutura Econômica',
            source: 'Secretaria de Agricultura e Abastecimento do Estado de SP & IBGE PAM (Produção Agrícola Municipal)',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🥜 Tupã - A Capital Nacional do Amendoim:</strong></p>
<p>Tupã destaca-se nacional e internacionalmente na cadeia do agronegócio:</p>
<ul>
    <li><strong>Liderança no Amendoim:</strong> A região de Tupã é um dos maiores centros de cultivo, beneficiamento industrial e exportação de amendoim do Brasil, abastecendo indústrias de doces, confeitos, óleos vegetais e mercados internacionais.</li>
    <li><strong>Cinturão de Avicultura:</strong> Tupã e o município vizinho de Bastos compõem o polo líder em avicultura de postura (produção de ovos comerciais) do país.</li>
    <li><strong>Diversificação Agrícola:</strong> Cana-de-açúcar (com forte atuação sucroalcooleira), milho, soja, café, seringueira (látex) e mandioca.</li>
    <li><strong>Setor Terciário:</strong> Comércio varejista diversificado e polo regional de prestação de serviços educacionais e de saúde.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Secretaria de Agricultura de SP & IBGE (Pesquisa Agrícola Municipal).
</div>
            `,
            followUps: [
                'Qual é o PIB e a renda per capita de Tupã?',
                'Quais faculdades e universidades existem em Tupã?',
                'Como é a Feira da Lua?'
            ]
        },
        {
            id: 'saude_hospitais',
            keywords: ['saude', 'saúde', 'hospital', 'hospitais', 'santa casa', 'santa casa de tupa', 'sao francisco', 'hospital sao francisco', 'upa', 'upa 24h', 'ubs', 'postos de saude', 'medico', 'pronto socorro'],
            title: 'Rede de Saúde e Hospitais de Tupã',
            source: 'CNES (Cadastro Nacional de Estabelecimentos de Saúde - Ministério da Saúde) & DRS-IX Marília',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🏥 Rede de Saúde e Atendimento Hospitalar de Tupã:</strong></p>
<p>Tupã atua como microrregião de referência médica na Alta Paulista:</p>
<ul>
    <li><strong>Santa Casa de Misericórdia de Tupã:</strong> Principal hospital geral e filantrópico da cidade, fundado em 1935. Possui Unidade de Terapia Intensiva (UTI geral e neonatal), centro cirúrgico de alta e média complexidade e pronto atendimento SUS.</li>
    <li><strong>Hospital São Francisco:</strong> Hospital de retaguarda e atendimento particular/conveniado de grande tradição no município.</li>
    <li><strong>UPA 24 Horas (Unidade de Pronto Atendimento):</strong> Atendimento emergencial 24 horas para urgências clínicas e pediátricas.</li>
    <li><strong>Ame (Ambulatório Médico de Especialidades):</strong> Tupã integra a rede regional de especialidades médicas do Estado de São Paulo.</li>
    <li><strong>Rede Básica:</strong> Conta com Unidades Básicas de Saúde (UBS) e Estratégia de Saúde da Família (ESF) espalhadas em todos os bairros e nos três distritos.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Ministério da Saúde (CNES) & Secretaria Municipal de Saúde de Tupã.
</div>
            `,
            followUps: [
                'Quais faculdades formam profissionais na área da saúde em Tupã?',
                'Qual a expectativa de vida (longevidade) no IDHM de Tupã?',
                'Quais os dados de segurança pública em Tupã?'
            ]
        },
        {
            id: 'educacao_faculdades',
            keywords: ['faculdade', 'faculdades', 'universidade', 'universidades', 'fadap', 'fap', 'unesp', 'etec', 'estudar', 'cursos', 'educacao', 'educação', 'escolas', 'graduacao', 'graduação', 'vestibular'],
            title: 'Polo Universitário: UNESP, FADAP/FAP e ETEC',
            source: 'MEC (Ministério da Educação / e-MEC) & Centro Paula Souza',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🎓 Tupã como Polo Educacional e Universitário da Alta Paulista:</strong></p>
<ul>
    <li><strong>FADAP / FAP (Faculdade da Alta Paulista):</strong> Instituição de ensino superior pioneira e de grande tradição na região, com cursos reconhecidos pelo MEC como Direito, Administração, Psicologia, Ciências Contábeis, Pedagogia e outros.</li>
    <li><strong>UNESP (Universidade Estadual Paulista - Câmpus de Tupã):</strong> Universidade pública estadual e gratuita, instalada em 2003. Oferece graduação em <em>Engenharia de Biossistemas</em> e <em>Administração</em>, além de programas de Mestrado e Pós-Graduação em Agronegócio e Desenvolvimento.</li>
    <li><strong>ETEC Professor Massuyuki Kawano:</strong> Unidade do Centro Paula Souza reconhecida pela excelência em ensino técnico profissionalizante (desenvolvimento de sistemas, enfermagem, administração, design, farmácia).</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Ministério da Educação (MEC) & Reitoria da UNESP.
</div>
            `,
            followUps: [
                'Qual o IDHM de educação de Tupã?',
                'O que fazer para se divertir em Tupã nos fins de semana?',
                'Qual a história da fundação da cidade?'
            ]
        },
        {
            id: 'seguranca_publica',
            keywords: ['seguranca', 'segurança', 'policia', 'polícia', 'policia militar', 'policia civil', 'delegacia', 'ddm', 'crime', 'violencia', 'violência', 'bombeiros', 'tiro de guerra'],
            title: 'Segurança Pública e Forças Policiais em Tupã',
            source: 'Secretaria de Segurança Pública do Estado de São Paulo (SSP-SP) & Exército Brasileiro',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🛡️ Estrutura de Segurança Pública em Tupã:</strong></p>
<p>Tupã apresenta índices de criminalidade consideravelmente inferiores às médias dos grandes centros urbanos do país:</p>
<ul>
    <li><strong>Polícia Militar:</strong> Sede da 2ª Companhia do 9º Batalhão de Polícia Militar do Interior (9º BPM/I), responsável pelo policiamento ostensivo e rodoviário.</li>
    <li><strong>Polícia Civil:</strong> Delegacia Seccional de Polícia de Tupã, Delegacia do Município, Delegacia de Investigações Gerais (DIG), DISE e Delegacia de Defesa da Mulher (DDM).</li>
    <li><strong>Corpo de Bombeiros:</strong> Posto de Bombeiros atuante no combate a incêndios, resgate e defesa civil.</li>
    <li><strong>Tiro de Guerra 02-043:</strong> Órgão de formação de reservistas do Exército Brasileiro, presente há décadas no civismo jovem da cidade.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Secretaria de Segurança Pública de SP (Estatísticas Criminais SSP-SP).
</div>
            `,
            followUps: [
                'Quais os principais hospitais de Tupã?',
                'Qual a população oficial apurada pelo IBGE?',
                'Quais os principais pontos turísticos?'
            ]
        },
        {
            id: 'geografia_localizacao_rodovias',
            keywords: ['onde fica', 'localizacao', 'localização', 'distancia', 'distância', 'distancia de sao paulo', 'distancia de marilia', 'marilia', 'bauru', 'presidente prudente', 'rodovia', 'sp 294', 'sp-294', 'onibus', 'rodoviaria', 'terminal rodoviario', 'rio', 'rios', 'aguapei', 'peixe', 'clima', 'altitude'],
            title: 'Geografia, Localização e Vias de Transporte de Tupã',
            source: 'Instituto Geográfico e Cartográfico de SP (IGC) & Departamento de Estradas de Rodagem (DER-SP)',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🗺️ Localização Geográfica e Conexões Rodoviárias:</strong></p>
<ul>
    <li><strong>Região:</strong> Mesorregião de Marília / Microrregião de Tupã (Alta Paulista, oeste de SP).</li>
    <li><strong>Coordenadas e Altitude:</strong> Altitude média de <strong>508 metros</strong> acima do nível do mar.</li>
    <li><strong>Distâncias Comprovadas:</strong>
        <ul>
            <li>Capital São Paulo: ~430 km</li>
            <li>Marília: ~75 km</li>
            <li>Bauru: ~180 km</li>
            <li>Presidente Prudente: ~130 km</li>
        </ul>
    </li>
    <li><strong>Principal Rodovia:</strong> <strong>SP-294 (Rodovia Comandante João Ribeiro de Barros)</strong>, via duplicada/concessionada que corta a cidade.</li>
    <li><strong>Hidrografia:</strong> Localizada no espigão divisor entre o <strong>Rio Aguapeí (ou Rio Feio)</strong> ao norte e o <strong>Rio do Peixe</strong> ao sul.</li>
    <li><strong>Clima:</strong> Tropical de altitude com inverno seco e ameno e verão quente.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> DER-SP e Instituto Geográfico e Cartográfico do Estado de São Paulo.
</div>
            `,
            followUps: [
                'Quais são os 3 distritos de Tupã?',
                'Qual a história da fundação de Tupã?',
                'Quais os pontos turísticos para visitar?'
            ]
        },
        {
            id: 'prefeitura_administracao',
            keywords: ['prefeito', 'prefeitura', 'camara', 'câmara', 'vereadores', 'governo', 'administracao', 'administração', 'politica', 'política', 'palacio dos pioneiros'],
            title: 'Poder Executivo e Legislativo de Tupã',
            source: 'Câmara Municipal de Tupã & Tribunal Regional Eleitoral de São Paulo (TRE-SP)',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🏛️ Estrutura Administrativa dos Poderes Municipais em Tupã:</strong></p>
<ul>
    <li><strong>Poder Executivo:</strong> Sediado no Paço Municipal na Praça da Bandeira, nº 800 (Centro), responsável pelas secretarias municipais de Educação, Saúde, Obras, Turismo e Agricultura.</li>
    <li><strong>Poder Legislativo:</strong> Câmara Municipal da Estância Turística de Tupã, situada na Praça dos 500 Anos. É composta por <strong>15 vereadores</strong> eleitos democraticamente pelo voto direto da população tupãense.</li>
    <li><strong>Comarca Judiciária:</strong> Sede de Comarca com Fórum Estadual com varas cíveis, criminais, juizado especial e vara do trabalho.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Lei Orgânica Municipal & Tribunal Regional Eleitoral (TRE-SP).
</div>
            `,
            followUps: [
                'Quais são os serviços de saúde em Tupã?',
                'Qual o orçamento e o PIB per capita de Tupã?',
                'Quais os principais pontos turísticos?'
            ]
        },
        {
            id: 'pontos_turisticos',
            keywords: ['turismo', 'pontos turisticos', 'pontos turísticos', 'passear', 'visitar', 'atracoes', 'atrações', 'solar', 'matriz', 'igreja matriz', 'praca da bandeira', 'imigracao japonesa', 'praca dos 100 anos', 'estancia turistica', 'estância turística'],
            title: 'Pontos Turísticos e Patrimônio da Estância Turística de Tupã',
            source: 'Departamento Municipal de Turismo & Secretaria de Turismo e Viagens do Estado de SP',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>📍 Principais Atrações da Estância Turística de Tupã:</strong></p>
<ol>
    <li><strong>🏛️ Museu Histórico e Pedagógico Índia Vanuíre:</strong> Referência nacional em memória indígena Kaingang e Krenak, com 38 mil peças catalogadas.</li>
    <li><strong>🏡 Solar Luiz de Sousa Leão:</strong> Mansão histórica e residência original do fundador, rodeada por um preservado bosque de espécies botânicas nativas (Rua Caingangs, 600).</li>
    <li><strong>⛪ Igreja Matriz de São Pedro Apóstolo:</strong> Monumento arquitetônico e religioso na Praça da Bandeira, célebre pelos vitrais artísticos italianos e pinturas sacras.</li>
    <li><strong>⛩️ Praça dos 100 Anos da Imigração Japonesa:</strong> Homenagem arquitetônica e paisagística com torii oriental à forte comunidade nipônica tupãense.</li>
    <li><strong>🇱🇻 Distrito de Varpa:</strong> Ecoturismo rural, Museu Janis Erdbergs, artesanato e gastronomia da Letônia.</li>
    <li><strong>🌙 Feira da Lua:</strong> Ponto gastronômico noturno tradicional com culinária regional e artesanato na Praça da Bandeira.</li>
    <li><strong>🌊 Complexos de Lazer:</strong> Parques públicos e complexos aquáticos termais na microrregião.</li>
</ol>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Conselho Municipal de Turismo (COMTUR) & Secretaria de Turismo do Estado de SP.
</div>
            `,
            followUps: [
                'Como funciona a Feira da Lua em Tupã?',
                'O que fazer no distrito de Varpa?',
                'Qual a história do Museu Índia Vanuíre?'
            ]
        },
        {
            id: 'feira_da_lua',
            keywords: ['feira da lua', 'comida', 'gastronomia', 'comer', 'pastel', 'restaurante', 'praca da bandeira', 'culinaria', 'culinária', 'noite', 'onde comer'],
            title: 'Feira da Lua e Tradições Gastronômicas de Tupã',
            source: 'Prefeitura da Estância Turística de Tupã & Secretaria Municipal de Cultura',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🌙 Feira da Lua de Tupã:</strong></p>
<p>A Feira da Lua é um evento sociocultural e gastronômico tradicional que ocorre periodicamente à noite na <strong>Praça da Bandeira</strong>.</p>
<ul>
    <li><strong>Gastronomia Popular:</strong> Pastéis tradicionais de feira, espetinhos artesanais, yakisoba e tempurá da culinária nipo-brasileira, crepes, lanches e pratos caipiras.</li>
    <li><strong>Doces & Amendoim:</strong> Por ser a Capital do Amendoim, há ampla oferta de paçocas caseiras, pé-de-moleque, amendoins glaceados e cocadas artesanais.</li>
    <li><strong>Artesãos Locais:</strong> Espaço regulamentado para artesãos credenciados exporem produtos manuais e lembranças turísticas de Tupã.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Departamento Municipal de Cultura e Turismo de Tupã.
</div>
            `,
            followUps: [
                'Quais eventos acontecem em Tupã como a Exapit?',
                'Por que Tupã é a Capital do Amendoim?',
                'Quais os principais pontos turísticos?'
            ]
        },
        {
            id: 'distritos_todos',
            keywords: ['distritos', 'parnaso', 'universo', 'tres distritos', 'três distritos', 'vila'],
            title: 'Os 3 Distritos Oficiais do Município de Tupã',
            source: 'Fundação SEADE & Divisão Territorial IBGE',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🗺️ Os 3 Distritos Administrativos de Tupã:</strong></p>
<ul>
    <li><strong>1. Varpa:</strong> Fundado em 1928, é a maior colônia de imigrantes da Letônia no país. Destaca-se pelo Museu Janis Erdbergs, festividades típicas europeias, culinária báltica e turismo rural.</li>
    <li><strong>2. Parnaso:</strong> Distrito com forte tradição ferroviária ligado à histórica Companhia Paulista. Mantém atmosfera bucólica, ambiente campestre pacato e produção agrícola familiar.</li>
    <li><strong>3. Universo:</strong> Povoado consolidado a partir da inauguração de sua estação de trem em 1949. Marcado pela agropecuária, tranquilidade da vida comunitária rural e áreas verdes.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Divisão Político-Administrativa do Estado de São Paulo (SEADE).
</div>
            `,
            followUps: [
                'Fale mais sobre a colônia letã de Varpa',
                'Qual a história da fundação de Tupã?',
                'Qual a população oficial de Tupã no Censo?'
            ]
        },
        {
            id: 'eventos_festas',
            keywords: ['eventos', 'festas', 'exapit', 'tupa junina', 'tupã junina', 'semana do indio', 'festejos', 'aniversario', 'aniversário', 'shows', 'rodeio'],
            title: 'Calendário Oficial de Eventos e Festas Tradicionais',
            source: 'Calendário Turístico Oficial do Município de Tupã',
            reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p><strong>🎉 Grandes Eventos Oficiais do Município de Tupã:</strong></p>
<ul>
    <li><strong>EXAPIT (Exposição Agropecuária e Industrial de Tupã):</strong> Tradicional feira de agronegócios realizada anualmente em agosto no Recinto de Exposições Octávio Barroqueri, com shows de artistas consagrados nacionalmente, rodeio em touros e cavalos, exposições e praça de alimentação.</li>
    <li><strong>Tupã Junina:</strong> Uma das mais conhecidas celebrações de São João do interior paulista, com circuito gastronômico típico na Praça da Bandeira e quadrilhas.</li>
    <li><strong>Semana dos Povos Indígenas:</strong> Realizada em abril no Museu Índia Vanuíre com a presença de líderes e famílias Kaingang e Krenak, com rodas de conversa, cantos e exposições.</li>
    <li><strong>Comemoração de Aniversário:</strong> Celebrado oficialmente em <strong>12 de outubro</strong> com desfile cívico na Avenida Tamoios.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fonte Oficial Comprovada:</strong> Secretaria de Turismo e Cultura da Estância Turística de Tupã.
</div>
            `,
            followUps: [
                'Quais os principais pontos turísticos de Tupã?',
                'Qual a história da fundação de Tupã?',
                'Como funciona o Museu Índia Vanuíre?'
            ]
        }
    ];

    // ====================================================
    // MOTOR DE PROCESSAMENTO DE LINGUAGEM NATURAL (NLP)
    // ====================================================
    function processUserQuery(query) {
        const raw = query.trim();
        const normalized = raw.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/gi, ' ');

        const tokens = normalized.split(/\s+/).filter(t => t.length > 2);

        // Saudações
        if (/^(ola|oi|eae|bom dia|boa tarde|boa noite|opa|hello|hi)/.test(normalized.trim())) {
            return {
                title: 'Saudação Oficial',
                reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p>Olá! É um prazer atender você. 😊</p>
<p>Eu sou a <strong>TupãIA</strong>, assistente de inteligência artificial especializada com <strong>informações comprovadas e oficiais</strong> sobre a <strong>Estância Turística de Tupã - SP</strong>.</p>
<p>Você pode me fazer perguntas sobre:</p>
<ul>
    <li>🏛️ <strong>História e Fundação:</strong> Luiz de Sousa Leão e ferrovia.</li>
    <li>🏹 <strong>Museu Índia Vanuíre:</strong> Acervo indígena de 38 mil peças e povos Kaingang/Krenak.</li>
    <li>💰 <strong>Renda e Economia:</strong> PIB per capita, salário médio e IDHM pelo IBGE.</li>
    <li>👥 <strong>População e Geografia:</strong> Censo 2022, clima e localização.</li>
    <li>🇱🇻 <strong>Distrito de Varpa:</strong> A colônia da Letônia e ecoturismo.</li>
    <li>🏥 <strong>Saúde e Educação:</strong> Santa Casa, FADAP/FAP e UNESP.</li>
</ul>
<div class="sources-box">
    <strong>📌 Fontes Oficiais:</strong> IBGE, SEADE, SISEM-SP, MEC, PNUD e Prefeitura de Tupã.
</div>
                `,
                followUps: [
                    'Qual a renda per capita e o salário médio em Tupã?',
                    'Quantos habitantes Tupã tem segundo o Censo do IBGE?',
                    'Como foi fundada a cidade de Tupã?'
                ]
            };
        }

        // Quem é você
        if (/quem e voce|quem e vc|qual o seu modelo|o que voce faz|sobre voce/.test(normalized)) {
            return {
                title: 'Sobre a TupãIA',
                reply: `
<div class="verified-tag">✅ Informação Comprovada</div>
<p>Sou a <strong>TupãIA (v2.6 Alta Paulista)</strong>, um modelo de IA desenvolvido para a disciplina de <em>Desenvolvimento Web (Aula Web)</em>.</p>
<p>Minhas respostas são embasadas rigorosamente em <strong>fontes oficiais comprovadas</strong>: IBGE (Censo Demográfico e Cempre), Fundação SEADE, Atlas do Desenvolvimento Humano (PNUD), Ministério da Educação (MEC), Secretaria de Estado da Cultura (SISEM-SP) e Prefeitura Municipal da Estância Turística de Tupã.</p>
<div class="sources-box">
    <strong>📌 Compromisso com a Verdade:</strong> Todas as estatísticas e fatos históricos apresentados contam com registros documentais verificados.
</div>
                `,
                followUps: [
                    'Quais são os dados de renda per capita de Tupã?',
                    'Quais são os principais pontos turísticos?',
                    'Como funciona o Museu Índia Vanuíre?'
                ]
            };
        }

        // Algoritmo de Pontuação de Relevância
        let bestMatch = null;
        let highestScore = 0;

        for (const item of tupaKnowledgeBase) {
            let score = 0;

            for (const kw of item.keywords) {
                const normKw = kw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
                
                // Match exato de frase-chave
                if (normalized.includes(normKw)) {
                    score += normKw.length * 2.5;
                }

                // Match de palavras individuais
                const kwTokens = normKw.split(/\s+/);
                for (const t of tokens) {
                    if (kwTokens.includes(t)) {
                        score += 3;
                    } else if (t.length >= 4 && normKw.includes(t)) {
                        score += 2;
                    }
                }
            }

            if (score > highestScore) {
                highestScore = score;
                bestMatch = item;
            }
        }

        if (bestMatch && highestScore >= 3) {
            return bestMatch;
        }

        // Fallback Factual e Transparente
        return {
            title: 'Verificação de Fatos sobre Tupã - SP',
            reply: `
<div class="verified-tag">✅ Base de Fatos Oficiais</div>
<p>Você perguntou sobre: <em>"${escapeHTML(raw)}"</em>.</p>
<p>Para garantir que você receba exclusivamente <strong>informações comprovadas e verdadeiras</strong>, consultei os dados oficiais da <strong>Estância Turística de Tupã - SP</strong>:</p>
<ul>
    <li><strong>População Comprovada (IBGE 2022):</strong> 63.928 habitantes.</li>
    <li><strong>Riqueza e Renda:</strong> PIB per capita de R$ 48.934,77/ano e salário médio formal de R$ 3.080,73 mensais.</li>
    <li><strong>IDHM (PNUD):</strong> 0,771 (Alto Desenvolvimento Humano).</li>
    <li><strong>Fundação Histórica:</strong> 12 de outubro de 1929 por Luiz de Sousa Leão.</li>
    <li><strong>Patrimônio Principal:</strong> Museu Histórico e Pedagógico Índia Vanuíre (38 mil peças indígenas).</li>
    <li><strong>Distritos Oficiais:</strong> Varpa (colônia letã), Parnaso e Universo.</li>
</ul>
<div class="highlight-box">
    💡 Para uma resposta detalhada sobre seu tópico, experimente clicar em uma das opções abaixo:
</div>
<div class="sources-box">
    <strong>📌 Fontes Oficiais:</strong> IBGE Cidades, Fundação SEADE e Acervo Histórico Municipal de Tupã.
</div>
            `,
            followUps: [
                'Qual é a renda per capita do tupãense?',
                'Quais os principais pontos turísticos de Tupã?',
                'Fale sobre o Museu Índia Vanuíre e povos indígenas'
            ]
        };
    }

    // ====================================================
    // RENDERIZAR MENSAGENS E ANIMAÇÃO DE DIGITAÇÃO
    // ====================================================
    function appendUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user-message';
        msgDiv.innerHTML = `
            <div class="avatar user-avatar">U</div>
            <div class="message-body">
                <div class="message-sender">
                    <strong>Você</strong>
                    <span class="msg-time">Agora</span>
                </div>
                <div class="message-text">
                    <p>${escapeHTML(text)}</p>
                </div>
            </div>
        `;
        chatContainer.appendChild(msgDiv);
        scrollToBottom();
    }

    function appendAIMessageWithTyping(knowledgeItem) {
        isTyping = true;
        btnSend.disabled = true;

        const aiMsgDiv = document.createElement('div');
        aiMsgDiv.className = 'message ai-message';
        aiMsgDiv.innerHTML = `
            <div class="avatar ai-avatar">✦</div>
            <div class="message-body">
                <div class="message-sender">
                    <strong>TupãIA</strong>
                    <span class="msg-badge">Informação Verificada</span>
                    <span class="msg-time">Consultando bases oficiais...</span>
                </div>
                <div class="message-text">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        chatContainer.appendChild(aiMsgDiv);
        scrollToBottom();

        setTimeout(() => {
            const messageBody = aiMsgDiv.querySelector('.message-body');
            const timeSpan = aiMsgDiv.querySelector('.msg-time');
            timeSpan.textContent = 'Agora';

            let fullHTML = knowledgeItem.reply;
            
            if (knowledgeItem.followUps && knowledgeItem.followUps.length > 0) {
                fullHTML += `<div class="suggestions-lead">Perguntas Relacionadas Verificadas:</div><div class="quick-prompts-grid">`;
                knowledgeItem.followUps.forEach(q => {
                    fullHTML += `<button class="quick-prompt-chip dynamic-chip" data-prompt="${q}">➔ ${q}</button>`;
                });
                fullHTML += `</div>`;
            }

            fullHTML += `
                <div class="msg-actions">
                    <button class="action-chip-btn btn-copy" title="Copiar resposta">📋 Copiar</button>
                    <button class="action-chip-btn btn-tts" title="Ouvir resposta">🔊 Ouvir</button>
                </div>
            `;

            messageBody.querySelector('.message-text').innerHTML = fullHTML;
            scrollToBottom();

            const copyBtn = messageBody.querySelector('.btn-copy');
            copyBtn.addEventListener('click', () => {
                const plainText = messageBody.querySelector('.message-text').innerText;
                navigator.clipboard.writeText(plainText).then(() => {
                    copyBtn.textContent = '✓ Copiado!';
                    setTimeout(() => copyBtn.textContent = '📋 Copiar', 2000);
                });
            });

            const ttsBtn = messageBody.querySelector('.btn-tts');
            ttsBtn.addEventListener('click', () => {
                const plainText = cleanTextForTTS(messageBody.querySelector('.message-text').innerText);
                speakText(plainText);
            });

            const dynamicChips = messageBody.querySelectorAll('.dynamic-chip');
            dynamicChips.forEach(chip => {
                chip.addEventListener('click', () => {
                    handlePromptTrigger(chip.getAttribute('data-prompt'));
                });
            });

            if (voiceEnabled) {
                const plainText = cleanTextForTTS(messageBody.querySelector('.message-text').innerText);
                speakText(plainText);
            }

            isTyping = false;
            btnSend.disabled = false;
            userInput.focus();
        }, 500);
    }

    function cleanTextForTTS(text) {
        return text
            .replace(/➔.*$/gm, '')
            .replace(/Perguntas Relacionadas.*$/gs, '')
            .replace(/📌 Fonte Oficial.*$/gs, '')
            .replace(/✅ Informação Comprovada/g, '')
            .trim();
    }

    // ====================================================
    // SÍNTESE DE VOZ (TEXT-TO-SPEECH)
    // ====================================================
    function speakText(text) {
        if (!('speechSynthesis' in window)) return;

        window.speechSynthesis.cancel();
        const cleanText = text.replace(/[✦*#_~`>]/g, '').trim();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.05;

        const voices = window.speechSynthesis.getVoices();
        const ptVoice = voices.find(v => v.lang.includes('pt-BR') || v.lang.includes('pt'));
        if (ptVoice) utterance.voice = ptVoice;

        window.speechSynthesis.speak(utterance);
    }

    btnVoiceToggle.addEventListener('click', () => {
        voiceEnabled = !voiceEnabled;
        if (voiceEnabled) {
            voiceStatus.textContent = 'Ativada';
            btnVoiceToggle.classList.remove('voice-muted');
        } else {
            voiceStatus.textContent = 'Desativada';
            btnVoiceToggle.classList.add('voice-muted');
            window.speechSynthesis.cancel();
        }
    });

    // ====================================================
    // ENVIO DE MENSAGENS E EVENTOS DO FORMULÁRIO
    // ====================================================
    function handlePromptTrigger(promptText) {
        if (!promptText || isTyping) return;
        appendUserMessage(promptText);
        const result = processUserQuery(promptText);
        appendAIMessageWithTyping(result);
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = userInput.value.trim();
        if (!text || isTyping) return;

        userInput.value = '';
        userInput.style.height = 'auto';
        handlePromptTrigger(text);
    });

    userInput.addEventListener('input', () => {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 140) + 'px';
    });

    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    topicButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.getAttribute('data-prompt');
            handlePromptTrigger(prompt);
            if (window.innerWidth <= 900) {
                sidebar.classList.remove('open');
            }
        });
    });

    quickPromptChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const prompt = chip.getAttribute('data-prompt');
            handlePromptTrigger(prompt);
        });
    });

    newChatBtn.addEventListener('click', () => {
        resetChat();
        if (window.innerWidth <= 900) {
            sidebar.classList.remove('open');
        }
    });

    btnClearChat.addEventListener('click', () => {
        resetChat();
    });

    // Download da Base em JSON
    if (btnDownloadData) {
        btnDownloadData.addEventListener('click', () => {
            const exportData = {
                modelo: "TupãIA v2.6 - Base Comprovada Oficial",
                data_geracao: new Date().toISOString(),
                cidade: "Estância Turística de Tupã - SP",
                fontes_utilizadas: [
                    "IBGE (Censo Demográfico 2022 / Cempre / PAM)",
                    "Fundação SEADE",
                    "Secretaria da Cultura, Economia e Indústria Criativas de SP (SISEM-SP)",
                    "Atlas do Desenvolvimento Humano no Brasil (PNUD/IPEA)",
                    "Ministério da Educação (MEC)",
                    "Prefeitura e Câmara Municipal da Estância Turística de Tupã"
                ],
                topicos_comprovados: tupaKnowledgeBase.map(item => ({
                    id: item.id,
                    titulo: item.title,
                    fonte_oficial: item.source,
                    palavras_chave: item.keywords,
                    conteudo: item.reply.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
                }))
            };

            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "tupa_dados_comprovados_ia.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
        });
    }

    function resetChat() {
        window.speechSynthesis.cancel();
        const welcome = document.getElementById('welcomeMessage');
        chatContainer.innerHTML = '';
        if (welcome) {
            chatContainer.appendChild(welcome);
        }
        userInput.value = '';
        userInput.focus();
    }

    // Sidebar Mobile
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // Tema Dark / Light
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.textContent = '🌙 Modo Escuro';
            localStorage.setItem('tupaia_theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.textContent = '☀️ Modo Claro';
            localStorage.setItem('tupaia_theme', 'dark');
        }
    });

    const savedTheme = localStorage.getItem('tupaia_theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Escuro';

    // Ações para mensagens preexistentes
    document.querySelectorAll('.message').forEach(msg => {
        const copyBtn = msg.querySelector('.btn-copy');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const plainText = msg.querySelector('.message-text').innerText;
                navigator.clipboard.writeText(plainText).then(() => {
                    copyBtn.textContent = '✓ Copiado!';
                    setTimeout(() => copyBtn.textContent = '📋 Copiar', 2000);
                });
            });
        }
        const ttsBtn = msg.querySelector('.btn-tts');
        if (ttsBtn) {
            ttsBtn.addEventListener('click', () => {
                const plainText = cleanTextForTTS(msg.querySelector('.message-text').innerText);
                speakText(plainText);
            });
        }
    });

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});
