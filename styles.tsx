import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subTitle: {
    fontSize: 20,
    color: "white",
  },
  touchable: {
    backgroundColor: "#feff9c",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 10,
    width: 135,
    height: 52,
    justifyContent: "center",
    alignItems: "center"
  },
  touchableText: {
    color: "#3b3b3b",
    fontWeight: "bold",
    fontSize: 18
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
  },
  input: {
    paddingLeft: 8,
    fontSize: 20,
    color: "black",
    marginTop: 14,
    borderWidth: 1,
    borderColor: "white",
    height: 52,
    borderRadius: 8
  },
});

export default styles;
