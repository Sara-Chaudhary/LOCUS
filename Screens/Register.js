import { View, Image, Text, TextInput, KeyboardAvoidingView, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator ,Alert} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import colours from "../colours";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configure";
import { SafeAreaView } from "react-native-safe-area-context";


const Register = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName ]= useState('')


    regUser = async (email, password) => {
        try {
            setIsLoading(true);
            await createUserWithEmailAndPassword(auth, email, password)
            Alert.alert("Account Creation Successfull\n\n","Login Now to access it.")
            navigation.navigate('Login')
            setIsLoading(false);
            
        } catch (error) {
            alert(error.message)
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colours.GREY }}>
                <ActivityIndicator size={'large'} color={colours.LAV} />
            </View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colours.GREY }}>
            <ScrollView
                style={{
                    flex: 1,
                    padding: 35,
                    backgroundColor: colours.GREY
                }}
            >
                <KeyboardAvoidingView>

                    <Image
                        source={require('./../assets/images/logo.png')}
                        resizeMode="contain"
                        style={{
                            width: 100,
                            height: 100,
                            marginLeft: -12,
                            marginVertical: 22
                        }}
                    />
                    <Text style={{ fontSize: 32, color: colours.WHITE, marginBottom: 10 }}>Sign Up</Text>
                    <Text style={{ fontSize: 20, color: colours.LAV, fontStyle: 'italic' }}>
                        SignUp now for free and keep your friends and family close
                    </Text>

                    <View style={{ marginVertical: 22 }}>
                    <View style={styles.container}>
                            <View style={[styles.inputContainer, { borderColor: colours.LAV }]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Name"
                                    placeholderTextColor={colours.LAV}
                                    onChangeText={text => setName(text)}
                                    value={name}
                                    autoCapitalize="none"
                                    // autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={[styles.inputContainer, { borderColor: colours.LAV }]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email Address"
                                    placeholderTextColor={colours.LAV}
                                    onChangeText={text => setEmail(text)}
                                    value={email}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                        </View>

                        <View style={styles.container}>
                            <View style={[styles.inputContainer, { borderColor: colours.LAV }]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor={colours.LAV}
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.btn}
                            onPress={() => regUser(email, password)}
                        >
                            <Text style={{ color: colours.LAV, fontSize: 22 }}>Sign Up   </Text>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity style={styles.bottomContainer}
                                onPress={() => navigation.navigate("Login")}
                            >
                                <Text style={{ fontSize: 17, color: colours.LIGHT, fontStyle: 'italic' }}>Already have an account ?  </Text>
                                <Text style={{ fontSize: 17, color: colours.LIGHT }}>{" "}Log In </Text>
                            </TouchableOpacity>

                        </View>

                    </View>


                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )

}

export default Register

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 12,
        borderBottomWidth: 1,
        borderBottomColor: colours.LIGHT,
        marginVertical: 16,
        flexDirection: "row"
    },
    input: {
        flex: 1,
        paddingTop: 0,
        fontSize: 18,
        color: colours.LIGHT,
    },
    container: {

    },
    btn: {
        // backgroundColor: colours.L,
        paddingHorizontal: 20,
        paddingVertical: 17,
        borderRadius: 13,
        borderWidth: 2,
        borderColor: colours.LAV,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginVertical: 28
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    }
})