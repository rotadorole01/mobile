import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../utils/authContext";

export default function DashBoard() {
  const route = useRouter();
  const auth = useContext(AuthContext);

  const [menuAberto, setMenuAberto] = useState(false);

  function abrirMenu() {
    setMenuAberto(!menuAberto);
  }

  function logout() {
    auth.logOut();
    route.navigate("/");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.pagina}>
        {/* CABEÇALHO */}
        <LinearGradient
          colors={["#075b91", "#6b5a64", "#ff6633"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.header}
        >
          <View style={styles.logoArea}>
            <FontAwesome name="map-marker" size={30} color="#ffffff" />

            <Text style={styles.logo}>Rota do Rolê</Text>
          </View>

          <Pressable
            style={styles.botaoMenu}
            onPress={() => {
              abrirMenu();
            }}
          >
            <Ionicons
              name={menuAberto ? "close" : "menu"}
              size={32}
              color="#ffffff"
            />
          </Pressable>
        </LinearGradient>

        {/* MENU */}
        {menuAberto && (
          <View style={styles.menu}>
            <Pressable
              style={styles.itemMenu}
              onPress={() => {
                setMenuAberto(false);
              }}
            >
              <Ionicons name="home-outline" size={20} color="#075b91" />

              <Text style={styles.textoMenu}>Início</Text>
            </Pressable>

            <Pressable style={styles.itemMenu}>
              <Ionicons name="calendar-outline" size={20} color="#075b91" />

              <Text style={styles.textoMenu}>Eventos</Text>
            </Pressable>

            <Pressable style={styles.itemMenu}>
              <Ionicons name="add-circle-outline" size={20} color="#075b91" />

              <Text style={styles.textoMenu}>Cadastrar Evento</Text>
            </Pressable>

            <Pressable style={styles.itemMenu}>
              <Ionicons name="person-outline" size={20} color="#075b91" />

              <Text style={styles.textoMenu}>Minha Conta</Text>
            </Pressable>

            {/* SAIR */}
            <Pressable
              style={styles.itemMenu}
              onPress={() => {
                logout();
              }}
            >
              <Ionicons name="exit-outline" size={20} color="#ff6633" />

              <Text style={styles.textoSair}>Sair</Text>
            </Pressable>
          </View>
        )}

        {/* CONTEÚDO DA DASHBOARD */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* BANNER PRINCIPAL */}
          <View style={styles.bannerPrincipal}>
            <Pressable style={styles.setaBanner}>
              <Ionicons name="chevron-back" size={28} color="#ffffff" />
            </Pressable>

            <View style={styles.bannerConteudo}>
              <Ionicons name="calendar" size={45} color="#ff6633" />

              <Text style={styles.bannerTitulo}>Descubra seu próximo rolê</Text>

              <Text style={styles.bannerTexto}>
                Encontre eventos, shows, bares e muito mais.
              </Text>
            </View>

            <Pressable style={styles.setaBanner}>
              <Ionicons name="chevron-forward" size={28} color="#ffffff" />
            </Pressable>
          </View>

          {/* EXPLORE POR CATEGORIA */}
          <View style={styles.secao}>
            <Text style={styles.tituloSecao}>Explore por Categoria</Text>

            <View style={styles.linhaTitulo} />

            <View style={styles.categorias}>
              {/* SHOWS */}
              <Pressable style={styles.cardCategoria}>
                <Ionicons name="musical-notes" size={42} color="#ff6633" />

                <Text style={styles.nomeCategoria}>Shows</Text>
              </Pressable>

              {/* BARES */}
              <Pressable style={styles.cardCategoria}>
                <Ionicons name="beer" size={42} color="#ff6633" />

                <Text style={styles.nomeCategoria}>Bares</Text>
              </Pressable>

              {/* RESTAURANTES */}
              <Pressable style={styles.cardCategoria}>
                <Ionicons name="restaurant" size={42} color="#ff6633" />

                <Text style={styles.nomeCategoria}>Restaurantes</Text>
              </Pressable>

              {/* CULTURAL */}
              <Pressable style={styles.cardCategoria}>
                <FontAwesome5 name="theater-masks" size={38} color="#ff6633" />

                <Text style={styles.nomeCategoria}>Cultural</Text>
              </Pressable>
            </View>
          </View>

          {/* NOSSOS PARCEIROS */}
          <View style={styles.secaoParceiros}>
            <Text style={styles.tituloSecao}>Nossos Parceiros</Text>

            <View style={styles.linhaTitulo} />

            {/* BANNER DOS PARCEIROS */}
            <View style={styles.bannerParceiros}>
              <Pressable style={styles.setaParceiro}>
                <Ionicons name="chevron-back" size={25} color="#ffffff" />
              </Pressable>

              <View style={styles.parceiroConteudo}>
                <FontAwesome5 name="handshake" size={45} color="#ff6633" />

                <Text style={styles.parceiroTitulo}>Espaço para Parceiros</Text>
              </View>

              <Pressable style={styles.setaParceiro}>
                <Ionicons name="chevron-forward" size={25} color="#ffffff" />
              </Pressable>
            </View>

            <Text style={styles.textoParceiro}>
              Tem um negócio e quer mais visibilidade na cidade?
            </Text>

            <Pressable style={styles.botaoParceiro}>
              <FontAwesome5 name="handshake" size={17} color="#ffffff" />

              <Text style={styles.textoBotaoParceiro}>
                Seja um Parceiro / Patrocinador
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* TELA */

  safeArea: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  pagina: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  /* CABEÇALHO */

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

  /* MENU */

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

  /* ROLAGEM */

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingBottom: 50,
  },

  /* BANNER PRINCIPAL */

  bannerPrincipal: {
    height: 210,

    backgroundColor: "#ffffff",

    marginHorizontal: 15,
    marginTop: 20,

    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,

    overflow: "hidden",
  },

  bannerConteudo: {
    flex: 1,

    alignItems: "center",

    paddingHorizontal: 10,
  },

  bannerTitulo: {
    color: "#075b91",

    fontSize: 20,
    fontWeight: "bold",

    textAlign: "center",

    marginTop: 12,
  },

  bannerTexto: {
    color: "#666666",

    fontSize: 13,

    textAlign: "center",

    marginTop: 7,
  },

  setaBanner: {
    width: 42,
    height: 55,

    backgroundColor: "#888888",

    alignItems: "center",
    justifyContent: "center",
  },

  /* SEÇÕES */

  secao: {
    paddingHorizontal: 15,

    marginTop: 45,
  },

  tituloSecao: {
    color: "#075b91",

    fontSize: 24,
    fontWeight: "bold",

    textAlign: "center",
  },

  linhaTitulo: {
    width: 55,
    height: 4,

    backgroundColor: "#ff6633",

    borderRadius: 5,

    alignSelf: "center",

    marginTop: 10,
    marginBottom: 25,
  },

  /* CATEGORIAS */

  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  cardCategoria: {
    width: "48%",
    height: 135,

    backgroundColor: "#ffffff",

    borderRadius: 10,

    alignItems: "center",
    justifyContent: "center",

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
    color: "#075b91",

    fontSize: 16,
    fontWeight: "bold",

    marginTop: 12,
  },

  /* PARCEIROS */

  secaoParceiros: {
    paddingHorizontal: 15,

    marginTop: 45,

    alignItems: "center",
  },

  bannerParceiros: {
    width: "100%",
    height: 190,

    backgroundColor: "#ffffff",

    borderRadius: 10,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.1,
    shadowRadius: 5,

    elevation: 3,

    overflow: "hidden",
  },

  parceiroConteudo: {
    flex: 1,

    alignItems: "center",

    paddingHorizontal: 10,
  },

  parceiroTitulo: {
    color: "#075b91",

    fontSize: 18,
    fontWeight: "bold",

    marginTop: 12,

    textAlign: "center",
  },

  setaParceiro: {
    width: 40,
    height: 50,

    backgroundColor: "#888888",

    alignItems: "center",
    justifyContent: "center",
  },

  textoParceiro: {
    color: "#173b5e",

    fontSize: 14,

    textAlign: "center",

    marginTop: 25,
    marginBottom: 15,
  },

  botaoParceiro: {
    minHeight: 50,

    backgroundColor: "#075b91",

    borderRadius: 6,

    paddingHorizontal: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoParceiro: {
    color: "#ffffff",

    fontSize: 14,
    fontWeight: "bold",

    marginLeft: 8,
  },
});
