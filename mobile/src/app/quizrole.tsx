
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// =====================================================
// QUIZ INTERATIVO - ROTA DO ROLÊ
// =====================================================

type Categoria = "show" | "bar" | "restaurante" | "cultural";

type Alternativa = {
  texto: string;
  emoji: string;
  categoria: Categoria;
};

type Pergunta = {
  titulo: string;
  alternativas: Alternativa[];
};

// =====================================================
// PERGUNTAS DO QUIZ
// =====================================================

const perguntas: Pergunta[] = [
  {
    titulo: "Qual é sua vibe hoje?",
    alternativas: [
      {
        emoji: "🎤",
        texto: "Quero música e agitação",
        categoria: "show",
      },
      {
        emoji: "🍽️",
        texto: "Prefiro algo tranquilo",
        categoria: "restaurante",
      },
      {
        emoji: "🍻",
        texto: "Quero sair com os amigos",
        categoria: "bar",
      },
      {
        emoji: "🎭",
        texto: "Quero algo diferente",
        categoria: "cultural",
      },
    ],
  },
  {
    titulo: "Qual ambiente você prefere?",
    alternativas: [
      {
        emoji: "🎶",
        texto: "Música ao vivo",
        categoria: "show",
      },
      {
        emoji: "🍝",
        texto: "Um jantar especial",
        categoria: "restaurante",
      },
      {
        emoji: "🍺",
        texto: "Um lugar descontraído",
        categoria: "bar",
      },
      {
        emoji: "🎨",
        texto: "Arte e cultura",
        categoria: "cultural",
      },
    ],
  },
  {
    titulo: "O que não pode faltar no seu rolê?",
    alternativas: [
      {
        emoji: "🎸",
        texto: "Música boa",
        categoria: "show",
      },
      {
        emoji: "🍕",
        texto: "Comida deliciosa",
        categoria: "restaurante",
      },
      {
        emoji: "🗣️",
        texto: "Uma boa conversa",
        categoria: "bar",
      },
      {
        emoji: "🎟️",
        texto: "Novas experiências",
        categoria: "cultural",
      },
    ],
  },
  {
    titulo: "Como seria sua noite perfeita?",
    alternativas: [
      {
        emoji: "🎉",
        texto: "Dançando e curtindo",
        categoria: "show",
      },
      {
        emoji: "🥂",
        texto: "Jantando e relaxando",
        categoria: "restaurante",
      },
      {
        emoji: "🍻",
        texto: "Conversando com amigos",
        categoria: "bar",
      },
      {
        emoji: "🎭",
        texto: "Conhecendo algo novo",
        categoria: "cultural",
      },
    ],
  },
];

// =====================================================
// RESULTADOS
// =====================================================

const resultados = {
  show: {
    emoji: "🎤",
    titulo: "Shows e Música ao Vivo",
    descricao:
      "Seu estilo combina com muita música, energia e diversão! Que tal curtir um show na sua região?",
  },
  bar: {
    emoji: "🍻",
    titulo: "Bares e Encontros",
    descricao:
      "Seu rolê ideal é aproveitar bons momentos com os amigos em um ambiente descontraído!",
  },
  restaurante: {
    emoji: "🍽️",
    titulo: "Restaurantes",
    descricao:
      "Você prefere aproveitar uma ótima refeição em um ambiente agradável e tranquilo!",
  },
  cultural: {
    emoji: "🎭",
    titulo: "Eventos Culturais",
    descricao:
      "Você gosta de conhecer coisas novas! Teatro, arte e cultura combinam com seu estilo.",
  },
};

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function QuizRole() {
  const route = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<Categoria[]>([]);
  const [resultadoFinal, setResultadoFinal] =
    useState<Categoria | null>(null);

  // ===================================================
  // NAVEGAÇÃO
  // =====================================================

  function navegar(caminho: string) {
    setMenuAberto(false);
    route.navigate(caminho as any);
  }

  // ===================================================
  // CADASTRAR EVENTO - ROTA CORRIGIDA
  // =====================================================

  function irParaCadastro() {
    setMenuAberto(false);
    route.push("/cadastro");
  }

  // ===================================================
  // CALCULAR RESULTADO
  // =====================================================

  function calcularResultado(lista: Categoria[]): Categoria {
    const pontos: Record<Categoria, number> = {
      show: 0,
      bar: 0,
      restaurante: 0,
      cultural: 0,
    };

    lista.forEach((categoria) => {
      pontos[categoria] += 1;
    });

    // Em caso de empate, prioriza a última
    // categoria escolhida entre as empatadas.

    let vencedor = lista[0];

    lista.forEach((categoria) => {
      if (pontos[categoria] >= pontos[vencedor]) {
        vencedor = categoria;
      }
    });

    return vencedor;
  }

  // ===================================================
  // RESPONDER PERGUNTA
  // =====================================================

  function responder(categoria: Categoria) {
    const novasRespostas = [...respostas, categoria];

    setRespostas(novasRespostas);

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      const resultado = calcularResultado(novasRespostas);
      setResultadoFinal(resultado);
    }
  }

  // ===================================================
  // VOLTAR PERGUNTA
  // =====================================================

  function voltarPergunta() {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
      setRespostas((anterior) => anterior.slice(0, -1));
    }
  }

  // ===================================================
  // REINICIAR QUIZ
  // =====================================================

  function reiniciarQuiz() {
    setPerguntaAtual(0);
    setRespostas([]);
    setResultadoFinal(null);
  }

  // ===================================================
  // INTERFACE
  // =====================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pagina}>

        {/* ============================================
            CABEÇALHO
        ============================================ */}

        <LinearGradient
          colors={["#075b91", "#6b5a64", "#ff6633"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.header}
        >
          <View style={styles.logoArea}>
            <FontAwesome
              name="map-marker"
              size={30}
              color="#ffffff"
            />

            <Text style={styles.logo}>Rota do Rolê</Text>
          </View>

          <Pressable
            style={styles.botaoMenu}
            onPress={() => setMenuAberto(!menuAberto)}
          >
            <Ionicons
              name={menuAberto ? "close" : "menu"}
              size={32}
              color="#ffffff"
            />
          </Pressable>
        </LinearGradient>

        {/* ============================================
            MENU HAMBÚRGUER
        ============================================ */}

        {menuAberto && (
          <View style={styles.menu}>

            {/* INÍCIO */}

            <Pressable
              style={styles.itemMenu}
              onPress={() => navegar("/dashboard")}
            >
              <Ionicons
                name="home-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>Início</Text>
            </Pressable>

            {/* EVENTOS */}

            <Pressable
              style={styles.itemMenu}
              onPress={() => navegar("/eventos")}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>Eventos</Text>
            </Pressable>

            {/* CADASTRAR EVENTO - CONECTADO */}

            <Pressable
              style={styles.itemMenu}
              onPress={irParaCadastro}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Cadastrar Evento
              </Text>
            </Pressable>

            {/* MINHA CONTA */}

            <Pressable
              style={styles.itemMenu}
              onPress={() => navegar("/perfil")}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>Minha Conta</Text>
            </Pressable>

            {/* SOBRE NÓS */}

            <Pressable
              style={styles.itemMenu}
              onPress={() => navegar("/sobrenos")}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>Sobre Nós</Text>
            </Pressable>

            {/* QUIZ - PÁGINA ATUAL */}

            <Pressable
              style={styles.itemMenu}
              onPress={() => setMenuAberto(false)}
            >
              <Ionicons
                name="help-circle-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Qual é o Seu Rolê?
              </Text>
            </Pressable>

          </View>
        )}

        {/* ============================================
            CONTEÚDO PRINCIPAL
        ============================================ */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >

          {/* ==========================================
              BANNER
          ========================================== */}

          <LinearGradient
            colors={["#075b91", "#173b5e"]}
            style={styles.banner}
          >
            <Ionicons
              name="game-controller-outline"
              size={45}
              color="#ff6633"
            />

            <Text style={styles.tituloBanner}>
              Qual é o Seu Rolê?
            </Text>

            <Text style={styles.subtituloBanner}>
              Responda às perguntas e descubra qual
              passeio combina mais com você!
            </Text>
          </LinearGradient>

          {/* ==========================================
              QUIZ
          ========================================== */}

          {resultadoFinal === null ? (

            <View style={styles.secaoQuiz}>

              <Text style={styles.progressoTexto}>
                Pergunta {perguntaAtual + 1} de {perguntas.length}
              </Text>

              {/* ====================================
                  BARRA DE PROGRESSO CORRIGIDA
              ==================================== */}

              <View style={styles.barraFundo}>
                <View
                  style={[
                    styles.barraProgresso,
                    {
                      width:
                        `${((perguntaAtual + 1) / perguntas.length) * 100}%` as const,
                    },
                  ]}
                />
              </View>

              {/* PERGUNTA */}

              <Text style={styles.tituloPergunta}>
                {perguntas[perguntaAtual].titulo}
              </Text>

              {/* ALTERNATIVAS */}

              {perguntas[perguntaAtual].alternativas.map(
                (alternativa, index) => (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [
                      styles.cardAlternativa,
                      pressed && styles.cardPressionado,
                    ]}
                    onPress={() =>
                      responder(alternativa.categoria)
                    }
                  >
                    <Text style={styles.emojiAlternativa}>
                      {alternativa.emoji}
                    </Text>

                    <Text style={styles.textoAlternativa}>
                      {alternativa.texto}
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#075b91"
                    />
                  </Pressable>
                )
              )}

              {/* BOTÃO VOLTAR */}

              {perguntaAtual > 0 && (
                <Pressable
                  style={styles.botaoVoltar}
                  onPress={voltarPergunta}
                >
                  <Ionicons
                    name="arrow-back"
                    size={19}
                    color="#075b91"
                  />

                  <Text style={styles.textoVoltar}>
                    Pergunta anterior
                  </Text>
                </Pressable>
              )}

            </View>

          ) : (

            // =========================================
            // RESULTADO FINAL
            // =========================================

            <View style={styles.resultadoContainer}>

              <Text style={styles.resultadoEmoji}>
                {resultados[resultadoFinal].emoji}
              </Text>

              <Text style={styles.resultadoTitulo}>
                Seu rolê ideal é...
              </Text>

              <Text style={styles.resultadoCategoria}>
                {resultados[resultadoFinal].titulo}
              </Text>

              <View style={styles.linhaTitulo} />

              <Text style={styles.resultadoDescricao}>
                {resultados[resultadoFinal].descricao}
              </Text>

              {/* REFAZER QUIZ */}

              <Pressable
                style={styles.botaoRefazer}
                onPress={reiniciarQuiz}
              >
                <Ionicons
                  name="refresh-outline"
                  size={20}
                  color="#ffffff"
                />

                <Text style={styles.textoBotao}>
                  Refazer Quiz
                </Text>
              </Pressable>

              {/* VER EVENTOS */}

              <Pressable
                style={styles.botaoEventos}
                onPress={() => navegar("/eventos")}
              >
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color="#ffffff"
                />

                <Text style={styles.textoBotao}>
                  Explorar Eventos
                </Text>
              </Pressable>

            </View>
          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  pagina: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  // CABEÇALHO

  header: {
    height: 75,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },

  logoArea: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 9,
  },

  botaoMenu: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  // MENU HAMBÚRGUER

  menu: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    paddingVertical: 5,
    elevation: 5,
    zIndex: 9,
  },

  itemMenu: {
    height: 50,
    paddingHorizontal: 25,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  textoMenu: {
    color: "#173b5e",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },

  // ROLAGEM

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingBottom: 50,
  },

  // BANNER

  banner: {
    minHeight: 210,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
  },

  tituloBanner: {
    color: "#ffffff",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },

  subtituloBanner: {
    color: "#ffffff",
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 10,
  },

  // QUIZ

  secaoQuiz: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  progressoTexto: {
    color: "#075b91",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },

  barraFundo: {
    width: "100%",
    height: 8,
    backgroundColor: "#dddddd",
    borderRadius: 10,
    overflow: "hidden",
  },

  barraProgresso: {
    height: "100%",
    backgroundColor: "#ff6633",
    borderRadius: 10,
  },

  tituloPergunta: {
    color: "#075b91",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 25,
    textAlign: "center",
  },

  cardAlternativa: {
    backgroundColor: "#ffffff",
    minHeight: 75,
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#eeeeee",
    elevation: 2,
  },

  cardPressionado: {
    backgroundColor: "#fff0e9",
    borderColor: "#ff6633",
  },

  emojiAlternativa: {
    fontSize: 27,
    marginRight: 14,
  },

  textoAlternativa: {
    flex: 1,
    color: "#173b5e",
    fontSize: 15,
    fontWeight: "500",
  },

  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginTop: 10,
  },

  textoVoltar: {
    color: "#075b91",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
  },

  // RESULTADO

  resultadoContainer: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginTop: 30,
    paddingHorizontal: 22,
    paddingVertical: 35,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  resultadoEmoji: {
    fontSize: 65,
    marginBottom: 20,
  },

  resultadoTitulo: {
    color: "#173b5e",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  resultadoCategoria: {
    color: "#ff6633",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 12,
  },

  linhaTitulo: {
    width: 60,
    height: 4,
    backgroundColor: "#ff6633",
    borderRadius: 5,
    marginTop: 20,
    marginBottom: 20,
  },

  resultadoDescricao: {
    color: "#173b5e",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 30,
  },

  botaoRefazer: {
    backgroundColor: "#075b91",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  botaoEventos: {
    backgroundColor: "#ff6633",
    width: "100%",
    minHeight: 50,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 9,
  },

});
