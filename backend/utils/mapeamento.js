const categorias = {
    categoria1: {
      nome: "Outras Atividades Complementares",
      subcategorias: {
        10: { 
          nome: "Ensino",
          atividades: {
            100: "Atividade Institucional de Monitoria (voluntária ou financiada) sob orientação de docente da UFBA",
            101: "Programa ou Grupo de Educação Tutorial sob orientação de docente da UFBA",
            102: "Grupo de Estudos sob orientação de docente da UFBA"
          }
        },
        11: { 
          nome: "Pesquisa",
          atividades: {
            110: "Participação em projetos de iniciação científica sob orientação de docente da UFBA",
            111: "Apresentação de trabalhos (oral ou pôster) em eventos científicos",
            112: "Trabalho publicado em periódico com comitê científico",
            113: "Trabalho publicado em anais de conferência nacional ou internacional com comitê científico",
            114: "Trabalho publicado em anais de conferência regional com comitê científico",
            115: "Premiação em trabalhos de pesquisa"
          }
        },
        12: { 
          nome: "Vivências Profissionais",
          atividades: {
            120: "Atividades de Gestão de Redes de Computadores Acadêmicas na UFBA",
            121: "Certificação na área de tecnologia com temas de computação e informática",
            122: "Treinamento profissional na área de formação do aluno (curso de capacitação)",
            123: "Participação em grupos de competição acadêmica da UFBA",
            124: "Participação em olimpíadas e/ou maratonas na área de computação"
          }
        },
        13: { 
          nome: "Eventos Técnicos Científicos",
          atividades: {
            130: "Participação em congressos, seminários, simpósios, conferências, fóruns, workshops, semana de curso, etc.",
            131: "Associação em sociedade científica (ex.: SBC, IEEE, ACM)",
            132: "Premiação em olimpíadas e/ou maratonas na área de computação"
          }
        },
        14: { 
          nome: "Intervenção Organizacional",
          atividades: {
            140: "Participação em comissão organizadora de eventos de caráter científico e/ou acadêmico",
            141: "Participação em eventos como ministrante de cursos",
            142: "Coordenação de congressos, simpósios e semanas científicas",
            143: "Desenvolvimento de solução tecnológica",
            144: "Participação em atividades administrativas/organizacionais do Colegiado ou do Instituto de Computação"
          }
        },
        15: { 
          nome: "Representação Estudantil",
          atividades: {
            150: "Mandato de representação discente na UFBA (CA, DA e/ou DCE)",
            151: "Representação discente nas Unidades de Ensino (Colegiado, Departamento e/ou Congregação)",
            152: "Representação estudantil em sociedades científicas da computação (ex.: SBC, IEEE, ACM)"
          }
        },
        16: { 
          nome: "Formação Interdisciplinar",
          atividades: {
            160: "Cursos de idiomas presenciais ou à distância, com aprovação, a partir do nível intermediário",
            161: "Certificação de proficiência em língua estrangeira",
            162: "Disciplinas cursadas dentro ou fora da UFBA que não pertençam à matriz curricular do BCC"
          }
        },
        17: { 
          nome: "Outros",
          atividades: {
            170: "Participação em atividades físicas como dança, ginástica, lutas e esportes realizados sob orientação profissional",
            171: "Participação em atividades culturais, como recitais, espetáculos, festivais ou eventos culturais",
            172: "Doação de sangue"
          }
        }
      }
    },
    categoria2: {
      nome: "Extensão",
      atividades: {
        200: "Ação Curricular em Comunidade e Sociedade (ACCS)",
        201: "Estágio supervisionado (obrigatório e não-obrigatório)",
        202: "Programa de Extensão (projetos e outras ações de extensão universitária, cursos, eventos, prestação de serviços)",
        203: "Projeto de extensão (ações contínuas de caráter comunitário, educativo, cultural, científico e tecnológico)",
        204: "Curso de extensão (atividades sistematizadas de caráter didático para a disseminação de princípios, conceitos, fundamentos, métodos e tecnologias)",
        205: "Atividade de Campo (produções e socialização de conhecimento junto a segmentos da sociedade)",
        206: "Evento acadêmico-científico (palestras, congressos, jornadas, seminários, workshops, simpósios)",
        207: "Publicação e outros produtos acadêmicos (elaboração de publicações e outros instrumentos para difusão cultural, artística, científica e tecnológica)",
        208: "Organização de Evento (participação como membro de comissão organizadora de evento acadêmico-científico)",
        209: "Prestação de Serviço à Comunidade (ações através de conhecimentos da Universidade disponibilizados sob a forma de atendimento, consulta, exames, ensaios laboratoriais, consultoria, etc.)",
        210: "Liga Acadêmica (participação com intervenções que envolvam diretamente as comunidades externas à UFBA)",
        211: "Empresa Júnior (participação em Empresa Júnior na UFBA com intervenções que envolvam diretamente as comunidades externas)",
        212: "Movimento Estudantil e Coletivos Estudantis (gestão dos Centros Acadêmicos e/ou Diretórios Acadêmicos, com intervenções que envolvam diretamente as comunidades externas à UFBA)"
      }
    }
  };
  
  const cursoMapping = {
      1: 'BCC',
      2: 'BSI',
      3: 'LC'
  };
  
  const statusMapping = {
      0: 'pendente',
      1: 'aprovado',
      2: 'rejeitado'
  };
  
  module.exports = { categorias, cursoMapping, statusMapping };
  
