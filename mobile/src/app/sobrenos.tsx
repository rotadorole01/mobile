import {
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// =====================================================
// SOBRE NÓS - ROTA DO ROLÊ
// =====================================================

export default function SobreNos() {
  const route = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);

  // ===================================================
  // MENU HAMBÚRGUER
  // ===================================================

  function abrirMenu() {
    setMenuAberto((anterior) => !anterior);
  }

  // ===================================================
  // NAVEGAÇÃO
  // ===================================================

  function irParaInicio() {
    setMenuAberto(false);
    route.navigate("/dashboard");
  }

  function irParaEventos() {
    setMenuAberto(false);
    route.navigate("/eventos");
  }

  function irParaCadastrarEvento() {
    setMenuAberto(false);
    route.push("/cadastro");
  }

  function irParaMinhaConta() {
    setMenuAberto(false);
    route.navigate("/perfil");
  }

  function irParaSobreNos() {
    setMenuAberto(false);
    // Já estamos na página Sobre Nós.
  }

  function irParaQuizRole() {
    setMenuAberto(false);
    route.navigate("/quizrole");
  }

  function logout() {
    setMenuAberto(false);
    route.replace("/login");
  }

  // ===================================================
  // INTERFACE
  // ===================================================

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
            onPress={abrirMenu}
            accessibilityLabel="Abrir menu"
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
            <Pressable
              style={styles.itemMenu}
              onPress={irParaInicio}
            >
              <Ionicons
                name="home-outline"
                size={20}
                color="#075b91"
              />
              <Text style={styles.textoMenu}>Início</Text>
            </Pressable>

            <Pressable
              style={styles.itemMenu}
              onPress={irParaEventos}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#075b91"
              />
              <Text style={styles.textoMenu}>Eventos</Text>
            </Pressable>

            <Pressable
              style={styles.itemMenu}
              onPress={irParaCadastrarEvento}
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

            <Pressable
              style={styles.itemMenu}
              onPress={irParaMinhaConta}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="#075b91"
              />
              <Text style={styles.textoMenu}>Minha Conta</Text>
            </Pressable>

            <Pressable
              style={styles.itemMenu}
              onPress={irParaSobreNos}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#075b91"
              />
              <Text style={styles.textoMenu}>Sobre Nós</Text>
            </Pressable>

            <Pressable
              style={styles.itemMenu}
              onPress={irParaQuizRole}
            >
              <Ionicons
                name="game-controller-outline"
                size={20}
                color="#075b91"
              />
              <Text style={styles.textoMenu}>Quiz do Rolê</Text>
            </Pressable>

            <Pressable
              style={styles.itemMenu}
              onPress={logout}
            >
              <Ionicons
                name="exit-outline"
                size={20}
                color="#ff6633"
              />
              <Text style={styles.textoSair}>Sair</Text>
            </Pressable>
          </View>
        )}

        {/* ============================================
            CONTEÚDO DA PÁGINA
        ============================================ */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* ==========================================
              BANNER SOBRE NÓS - MELHORADO
          ========================================== */}

          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1400&q=80",
            }}
            style={styles.bannerPrincipal}
            imageStyle={styles.bannerImagem}
          >
            <LinearGradient
              colors={[
                "rgba(7, 28, 51, 0.88)",
                "rgba(21, 77, 114, 0.76)",
                "rgba(255, 102, 51, 0.22)",
                "rgba(59, 39, 48, 0.84)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.overlayBanner}
            >
              <View style={styles.seloBanner}>
                <Ionicons
                  name="sparkles-outline"
                  size={14}
                  color="#ff6633"
                />
                <Text style={styles.seloTexto}>ROTA DO ROLÊ</Text>
              </View>

              <Text style={styles.tituloBanner}>
                Descubra a essência do{"\n"}seu próximo rolê
              </Text>

              <View style={styles.linhaBanner} />

              <Text style={styles.subtituloBanner}>
                Conectando você aos melhores eventos, bares,
                restaurantes e experiências da cidade com
                praticidade, estilo e identidade local.
              </Text>
            </LinearGradient>
          </ImageBackground>

          {/* ==========================================
              QUEM SOMOS
          ========================================== */}

          <View style={styles.secao}>
            <Text style={styles.tituloSecao}>Quem Somos</Text>

            <View style={styles.linhaTitulo} />

            <Text style={styles.textoSecao}>
              O{" "}
              <Text style={styles.textoNegrito}>
                Rota do Rolê
              </Text>{" "}
              é uma plataforma criada para conectar pessoas
              aos melhores eventos, lugares e experiências da
              cidade.
            </Text>

            <Text style={styles.textoSecaoAdicional}>
              Nosso objetivo é facilitar a descoberta de novas
              opções de lazer, reunindo shows, bares,
              restaurantes e eventos culturais em um só lugar.
            </Text>
          </View>

          {/* ==========================================
              NOSSA MISSÃO
          ========================================== */}

          <View style={styles.secao}>
            <Text style={styles.tituloSecao}>Nossa Missão</Text>

            <View style={styles.linhaTitulo} />

            <Text style={styles.textoSecao}>
              Nossa missão é promover a cultura local,
              valorizar os estabelecimentos e aproximar as
              pessoas das melhores experiências de
              entretenimento.
            </Text>

            <Text style={styles.textoSecaoAdicional}>
              Queremos tornar mais simples encontrar o próximo
              rolê e incentivar a participação nos eventos da
              nossa região.
            </Text>
          </View>

          {/* ==========================================
              O QUE VOCÊ ENCONTRA AQUI
          ========================================== */}

          <View style={styles.secao}>
            <Text style={styles.tituloSecao}>
              O que você encontra aqui
            </Text>

            <View style={styles.linhaTitulo} />

            <View style={styles.categorias}>
              <View style={styles.cardCategoria}>
                <Ionicons
                  name="musical-notes"
                  size={40}
                  color="#ff6633"
                />

                <Text style={styles.nomeCategoria}>Shows</Text>

                <Text style={styles.descricaoCategoria}>
                  Eventos musicais e apresentações ao vivo.
                </Text>
              </View>

              <View style={styles.cardCategoria}>
                <Ionicons
                  name="beer"
                  size={40}
                  color="#ff6633"
                />

                <Text style={styles.nomeCategoria}>Bares</Text>

                <Text style={styles.descricaoCategoria}>
                  Lugares para aproveitar bons momentos.
                </Text>
              </View>

              <View style={styles.cardCategoria}>
                <Ionicons
                  name="restaurant"
                  size={40}
                  color="#ff6633"
                />

                <Text style={styles.nomeCategoria}>
                  Restaurantes
                </Text>

                <Text style={styles.descricaoCategoria}>
                  Experiências gastronômicas para todos.
                </Text>
              </View>

              <View style={styles.cardCategoria}>
                <FontAwesome5
                  name="theater-masks"
                  size={37}
                  color="#ff6633"
                />

                <Text style={styles.nomeCategoria}>
                  Cultural
                </Text>

                <Text style={styles.descricaoCategoria}>
                  Cultura, arte e entretenimento.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// =====================================================
// ESTILOS
// =====================================================

const styles = StyleSheet.create({
  // ===================================================
  // ESTRUTURA
  // ===================================================

  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  pagina: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  // ===================================================
  // CABEÇALHO
  // ===================================================

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

  // ===================================================
  // MENU HAMBÚRGUER
  // ===================================================

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

  textoSair: {
    color: "#ff6633",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 12,
  },

  // ===================================================
  // ROLAGEM
  // ===================================================

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingBottom: 50,
  },

  // ===================================================
  // BANNER PRINCIPAL
  // ===================================================

  bannerPrincipal: {
    minHeight: 320,
    justifyContent: "center",
    overflow: "hidden",
  },

  bannerImagem: {
    resizeMode: "cover",
  },

  overlayBanner: {
    minHeight: 320,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 34,
  },

  seloBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.20)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 30,
    marginBottom: 18,
  },

  seloTexto: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1,
  },

  tituloBanner: {
    color: "#ffffff",
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 42,
    textShadowColor: "rgba(0,0,0,0.45)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 8,
  },

  linhaBanner: {
    width: 75,
    height: 4,
    backgroundColor: "#ff6633",
    borderRadius: 5,
    marginTop: 18,
    marginBottom: 18,
  },

  subtituloBanner: {
    color: "#ffffff",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 680,
    opacity: 0.97,
  },

  // ===================================================
  // SEÇÕES
  // ===================================================

  secao: {
    paddingHorizontal: 20,
    marginTop: 40,
  },

  tituloSecao: {
    color: "#075b91",
    fontSize: 24,
    fontWeight: "bold",
  },

  linhaTitulo: {
    width: 55,
    height: 4,
    backgroundColor: "#ff6633",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 20,
  },

  textoSecao: {
    color: "#173b5e",
    fontSize: 15,
    lineHeight: 24,
  },

  textoSecaoAdicional: {
    color: "#173b5e",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 15,
  },

  textoNegrito: {
    fontWeight: "bold",
  },

  // ===================================================
  // CATEGORIAS
  // ===================================================

  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  cardCategoria: {
    width: "48%",
    minHeight: 165,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  nomeCategoria: {
    color: "#ff6633",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },

  descricaoCategoria: {
    color: "#173b5e",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    marginTop: 8,
  },
});