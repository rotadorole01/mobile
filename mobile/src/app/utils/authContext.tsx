
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

// =====================================================
// TIPAGEM DO CONTEXTO DE AUTENTICAÇÃO
// =====================================================

type AuthContextProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
};

// =====================================================
// CRIAÇÃO DO CONTEXTO
// =====================================================

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isLoading: true,
  logIn: async () => {},
  logOut: async () => {},
});

// =====================================================
// PROVIDER DE AUTENTICAÇÃO
// =====================================================

export default function AuthProvider({
  children,
}: PropsWithChildren) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ===================================================
  // VERIFICAR LOGIN SALVO NO ASYNCSTORAGE
  // ===================================================

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("my-key");

        if (jsonValue !== null) {
          const resultado = JSON.parse(jsonValue);

          if (resultado.isLoggedIn === true) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(
          "Erro ao verificar o status do login:",
          error
        );

        setIsLoggedIn(false);
      } finally {
        // Finaliza apenas o carregamento.
        // Não altera o status de login.
        setIsLoading(false);
      }
    };

    verificarLogin();
  }, []);

  // ===================================================
  // REALIZAR LOGIN
  // ===================================================

  const logIn = async () => {
    try {
      const jsonValue = JSON.stringify({
        isLoggedIn: true,
      });

      await AsyncStorage.setItem("my-key", jsonValue);

      setIsLoggedIn(true);

      console.log("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar login:", error);
    }
  };

  // ===================================================
  // REALIZAR LOGOUT
  // ===================================================

  const logOut = async () => {
    try {
      const jsonValue = JSON.stringify({
        isLoggedIn: false,
      });

      await AsyncStorage.setItem("my-key", jsonValue);

      setIsLoggedIn(false);

      console.log("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar logout:", error);
    }
  };

  // ===================================================
  // DISPONIBILIZA O CONTEXTO PARA AS TELAS
  // ===================================================

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
