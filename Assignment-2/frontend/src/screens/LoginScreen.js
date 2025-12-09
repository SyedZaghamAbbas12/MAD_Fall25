import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import {
  TextInput,
  Button,
  Text,
  Title,
  HelperText,
} from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Svg, { Circle } from "react-native-svg";
import { useAuth } from "../context/AuthContext";

const { width, height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    const result = await login({ email, password });
    setLoading(false);

    if (!result.success) {
      setError(result.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Svg height={height} width={width} style={styles.bgSvg}>
        <Circle cx={width * 0.15} cy={height * 0.1} r={80} fill="#004a99" opacity="0.3" />
        <Circle cx={width * 0.9} cy={height * 0.2} r={100} fill="#007bff" opacity="0.35" />
        <Circle cx={width * 0.2} cy={height * 0.95} r={90} fill="#007bff" opacity="0.25" />
      </Svg>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
          <Title style={styles.title}>Welcome Back</Title>
          <Text style={styles.subtitle}>Login to continue</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" duration={1000} style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            left={<TextInput.Icon icon="email" />}
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry={!showPassword}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />

          {error ? (
            <HelperText type="error" visible>
              {error}
            </HelperText>
          ) : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Login
          </Button>

          <Button
            mode="text"
            onPress={() => navigation.navigate("Register")}
            style={styles.linkButton}
          >
            Don't have an account? Register
          </Button>
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eaf2ff" },
  bgSvg: { position: "absolute", top: 0, left: 0 },
  scrollContainer: { flexGrow: 1, justifyContent: "center", padding: 20 },
  header: { alignItems: "center", marginBottom: 25 },
  title: { fontSize: 32, fontWeight: "bold", color: "#004a99", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#004a99" },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    elevation: 6,
    shadowColor: "#004a99",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  input: { marginBottom: 12 },
  button: {
    marginTop: 10,
    paddingVertical: 6,
    backgroundColor: "#004a99",
    borderRadius: 10,
  },
  linkButton: { marginTop: 15, alignSelf: "center" },
});
