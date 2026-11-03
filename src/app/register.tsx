
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// =====================================================
// PÁGINA DE CADASTRO DE USUÁRIO
// =====================================================

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // ===================================================
  // DADOS DO FORMULÁRIO
  // ===================================================

  const [namefull, setNamefull] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [senha2, setSenha2] = useState<string>("");
  const [usuario, setUsuario] = useState<string>("");

  const [tipoConta, setTipoConta] = useState<string>(
    "Apenas Usuário - Pessoa Física"
  );

  const [tipoAberto, setTipoAberto] = useState<boolean>(false);
  const [menuAberto, setMenuAberto] = useState<boolean>(false);

  const telaPequena = width < 700;

  // ===================================================
  // ABRIR E FECHAR MENU
  // ===================================================

  function abrirMenu() {
    setMenuAberto(!menuAberto);
  }

  // ===================================================
  // VALIDAR CADASTRO
  // ===================================================

  function onClickAcessar() {
    if (namefull.trim() === "") {
      Alert.alert(
        "Campo obrigatório",
        "O nome completo está em branco. Por favor, preencha o campo."
      );
      return;
    }

    if (usuario.trim() === "") {
      Alert.alert(
        "Campo obrigatório",
        "O e-mail está em branco. Por favor, preencha o campo."
      );
      return;
    }

    if (senha.trim() === "") {
      Alert.alert(
        "Campo obrigatório",
        "A senha está em branco. Por favor, preencha o campo."
      );
      return;
    }

    if (senha2.trim() === "") {
      Alert.alert(
        "Campo obrigatório",
        "Confirme sua senha."
      );
      return;
    }

    if (senha !== senha2) {
      Alert.alert(
        "Senhas diferentes",
        "As senhas informadas são diferentes. Por favor, corrija."
      );
      return;
    }

    router.navigate("/login");
  }

  // ===================================================
  // NAVEGAÇÃO DO MENU HAMBÚRGUER
  // ===================================================

  function irParaInicio() {
    setMenuAberto(false);
    router.push("/");
  }

  function irParaEventos() {
    setMenuAberto(false);
    router.push("/eventos");
  }

  // ===================================================
  // CADASTRAR EVENTO - CONEXÃO CORRIGIDA
  // ===================================================

  function irParaCadastrarEvento() {
    setMenuAberto(false);
    router.push("/cadastro");
  }

  // ===================================================
  // MINHA CONTA
  // ===================================================

  function irParaMinhaConta() {
    setMenuAberto(false);
    router.push("/perfil");
  }

  // ===================================================
  // SOBRE NÓS
  // ===================================================

  function irParaSobreNos() {
    setMenuAberto(false);
    router.push("/sobrenos");
  }

  // ===================================================
  // QUIZ DO ROLÊ
  // ===================================================

  function irParaQuizRole() {
    setMenuAberto(false);
    router.push("/quizrole");
  }

  // ===================================================
  // INTERFACE
  // ===================================================

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* ==========================================
            CABEÇALHO
        ========================================== */}

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

            <Text style={styles.logo}>
              Rota do Rolê
            </Text>
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

        {/* ==========================================
            MENU HAMBÚRGUER
        ========================================== */}

        {menuAberto && (
          <View style={styles.menu}>

            {/* INÍCIO */}

            <Pressable
              style={styles.itemMenu}
              onPress={irParaInicio}
            >
              <Ionicons
                name="home-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Início
              </Text>
            </Pressable>

            {/* EVENTOS */}

            <Pressable
              style={styles.itemMenu}
              onPress={irParaEventos}
            >
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Eventos
              </Text>
            </Pressable>

            {/* CADASTRAR EVENTO - CORRIGIDO */}

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

            {/* MINHA CONTA */}

            <Pressable
              style={styles.itemMenu}
              onPress={irParaMinhaConta}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Minha Conta
              </Text>
            </Pressable>

            {/* SOBRE NÓS */}

            <Pressable
              style={styles.itemMenu}
              onPress={irParaSobreNos}
            >
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Sobre Nós
              </Text>
            </Pressable>

            {/* QUIZ DO ROLÊ */}

            <Pressable
              style={styles.itemMenu}
              onPress={irParaQuizRole}
            >
              <Ionicons
                name="game-controller-outline"
                size={20}
                color="#075b91"
              />

              <Text style={styles.textoMenu}>
                Quiz do Rolê
              </Text>
            </Pressable>

          </View>
        )}

        {/* ==========================================
            CONTEÚDO DA PÁGINA
        ========================================== */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* TÍTULO PRINCIPAL */}

          <View style={styles.titleArea}>
            <Text
              style={[
                styles.titulo,
                telaPequena && styles.tituloMobile,
              ]}
            >
              Cadastro de Usuário
            </Text>

            <View style={styles.titleLine} />

            <Text style={styles.subtitle}>
              Crie sua conta para acessar todos os recursos da plataforma.
            </Text>
          </View>

          {/* ========================================
              FORMULÁRIO DE CADASTRO
          ======================================== */}

          <View
            style={[
              styles.main,
              telaPequena && styles.mainMobile,
            ]}
          >

            {/* INFORMAÇÕES DE ACESSO */}

            <View style={styles.sectionTitleArea}>
              <View style={styles.sectionTitleRow}>
                <Feather
                  name="user-plus"
                  size={25}
                  color="#07569a"
                />

                <Text
                  style={[
                    styles.sectionTitle,
                    telaPequena && styles.sectionTitleMobile,
                  ]}
                >
                  Informações de Acesso
                </Text>
              </View>

              <View style={styles.sectionLine} />
            </View>

            {/* ======================================
                TIPO DE CONTA
            ====================================== */}

            <Text style={styles.inputText}>
              Tipo de Conta *
            </Text>

            <Pressable
              style={styles.select}
              onPress={() => setTipoAberto(!tipoAberto)}
            >
              <Text style={styles.selectText}>
                {tipoConta}
              </Text>

              <Text style={styles.arrow}>
                {tipoAberto ? "▲" : "▼"}
              </Text>
            </Pressable>

            {tipoAberto && (
              <View style={styles.optionsContainer}>

                {/* PESSOA FÍSICA */}

                <Pressable
                  style={styles.option}
                  onPress={() => {
                    setTipoConta(
                      "Apenas Usuário - Pessoa Física"
                    );
                    setTipoAberto(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    Apenas Usuário - Pessoa Física
                  </Text>
                </Pressable>

                {/* EMPRESA */}

                <Pressable
                  style={styles.option}
                  onPress={() => {
                    setTipoConta(
                      "Empresa ou Organizador - CNPJ"
                    );
                    setTipoAberto(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    Empresa ou Organizador - CNPJ
                  </Text>
                </Pressable>

              </View>
            )}

            {/* ======================================
                NOME COMPLETO
            ====================================== */}

            <Text style={styles.inputText}>
              Nome Completo *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Informe o Nome Completo"
              placeholderTextColor="#999999"
              value={namefull}
              onChangeText={setNamefull}
            />

            {/* ======================================
                E-MAIL
            ====================================== */}

            <Text style={styles.inputText}>
              E-mail *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Informe seu e-mail"
              placeholderTextColor="#999999"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={usuario}
              onChangeText={setUsuario}
            />

            {/* ======================================
                SENHA
            ====================================== */}

            <Text style={styles.inputText}>
              Senha *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Informe sua senha"
              placeholderTextColor="#999999"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            {/* ======================================
                REPETIR SENHA
            ====================================== */}

            <Text style={styles.inputText}>
              Repetir senha *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Repita sua senha"
              placeholderTextColor="#999999"
              secureTextEntry
              value={senha2}
              onChangeText={setSenha2}
            />

            {/* ======================================
                BOTÃO CRIAR CONTA
            ====================================== */}

            <Pressable
              style={({ pressed }) => [
                styles.button,
                pressed && styles.buttonPressed,
              ]}
              onPress={onClickAcessar}
            >
              <Text style={styles.buttonText}>
                Criar Conta
              </Text>
            </Pressable>

            {/* ======================================
                LINK PARA LOGIN
            ====================================== */}

            <View style={styles.loginArea}>
              <Text style={styles.loginText}>
                Já possui cadastro?{" "}
              </Text>

              <Link href="/login" asChild>
                <Pressable>
                  <Text style={styles.textoLink}>
                    Faça o login!
                  </Text>
                </Pressable>
              </Link>
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

  container: {
    flex: 1,
    backgroundColor: "#f5f6f8",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 50,
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

  // ===================================================
  // TÍTULO PRINCIPAL
  // ===================================================

  titleArea: {
    alignItems: "center",
    paddingTop: 65,
    paddingHorizontal: 20,
    paddingBottom: 32,
  },

  titulo: {
    color: "#07569a",
    fontSize: 38,
    fontWeight: "800",
    textAlign: "center",
  },

  tituloMobile: {
    fontSize: 29,
  },

  titleLine: {
    width: 70,
    height: 4,
    backgroundColor: "#ff5733",
    borderRadius: 5,
    marginTop: 19,
    marginBottom: 22,
  },

  subtitle: {
    color: "#68788c",
    fontSize: 15,
    textAlign: "center",
    maxWidth: 700,
  },

  // ===================================================
  // FORMULÁRIO PRINCIPAL
  // ===================================================

  main: {
    width: "90%",
    maxWidth: 860,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 36,
    paddingVertical: 38,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  mainMobile: {
    width: "92%",
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderRadius: 14,
  },

  // ===================================================
  // TÍTULO DO FORMULÁRIO
  // ===================================================

  sectionTitleArea: {
    alignItems: "center",
    marginBottom: 30,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionTitle: {
    color: "#07569a",
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginLeft: 9,
  },

  sectionTitleMobile: {
    fontSize: 20,
  },

  sectionLine: {
    width: 60,
    height: 4,
    backgroundColor: "#ff5733",
    borderRadius: 4,
    marginTop: 14,
  },

  // ===================================================
  // CAMPOS DO FORMULÁRIO
  // ===================================================

  inputText: {
    width: "100%",
    color: "#123b63",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 9,
  },

  input: {
    width: "100%",
    height: 53,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d4d9",
    borderRadius: 9,
    paddingHorizontal: 16,
    color: "#123b63",
    fontSize: 14,
    marginBottom: 24,
  },

  // ===================================================
  // SELEÇÃO DE TIPO DE CONTA
  // ===================================================

  select: {
    width: "100%",
    height: 53,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d4d9",
    borderRadius: 9,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  selectText: {
    flex: 1,
    color: "#315b84",
    fontSize: 14,
    paddingRight: 10,
  },

  arrow: {
    color: "#315b84",
    fontSize: 11,
  },

  optionsContainer: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d0d4d9",
    borderRadius: 9,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  option: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  optionText: {
    color: "#315b84",
    fontSize: 14,
  },

  // ===================================================
  // BOTÃO CRIAR CONTA
  // ===================================================

  button: {
    width: "100%",
    height: 56,
    backgroundColor: "#ff5733",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  buttonPressed: {
    backgroundColor: "#e94c2b",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },

  // ===================================================
  // LINK PARA LOGIN
  // ===================================================

  loginArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },

  loginText: {
    color: "#68788c",
    fontSize: 14,
  },

  textoLink: {
    color: "#07569a",
    fontSize: 14,
    fontWeight: "700",
  },

});
