import { Text, View, ImageBackground, StyleSheet, Image, TouchableOpacity } from "react-native";
import colours from "../colours";
import Button from "../Components/Buttons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('./../assets/images/test11.jpeg')}
        style={styles.Background}>
        <Image source={require('./../assets/images/logo.png')} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>W e l c o m e  </Text>
        <Text style={styles.subtitle}>To LOCUS ,Your Guide To   </Text>
        <Text style={styles.subtitle}> Your Friends & Family      </Text>

        <View style={{ marginTop: 79 }}>
          <Button
            title="S I G N    U P   "
            onPress={() => navigation.navigate("Register")}
            style={styles.btn}
          />
          <View>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.bottomContainer}>
              <Text style={{ color: colours.LAV, fontSize: 15 }}
              >Already have an account ?    </Text>
              <Text style={{ color: colours.LAV, fontSize: 16 }}> Log In  </Text>
            </TouchableOpacity>
          </View>
        </View>

      </ImageBackground>

    </View>
  );
}

export default Welcome

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 390
  },
  title: {
    fontSize: 47,
    color: colours.WHITE,
    textTransform: "uppercase",
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    color: colours.WHITE,
  },
  btn: {
    width: 350,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    marginBottom: 100,
    width:'90%'
  }
})