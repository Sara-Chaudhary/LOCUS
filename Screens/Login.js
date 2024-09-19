import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, ScrollView, ActivityIndicator , Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../configure";
import colours from "../colours";
import { signInWithEmailAndPassword } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";



const Login = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)


    loginUser = async (email, password) => {
        try {
            setIsLoading(true);
            await signInWithEmailAndPassword(auth, email, password)
            Alert.alert("Hello there , \n\n","Login Successful !!!\nEnjoy :)")
            navigation.navigate('DashBoard')
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
            <ScrollView style={{
                flex: 1,
                padding: 35,
                backgroundColor: colours.GREY
            }}>
                <KeyboardAvoidingView behavior="padding">

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

                    <Text style={{ fontSize: 32, color: colours.LIGHT, marginBottom: 10 }}>Log In </Text>
                    <Text style={{ fontSize: 20, color: colours.LAV, fontStyle: 'italic' }}>
                        Log In now to navigate your friends and family
                    </Text>

                    <View style={{ marginVertical: 22 }}>
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
                            onPress={() => loginUser(email, password)}
                        >
                            <Text style={{ color: colours.LAV, fontSize: 22 }}>Log In   </Text>
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity style={styles.bottomContainer}
                                onPress={() => navigation.navigate("Register")}
                            >
                                <Text style={{ fontSize: 17, color: colours.LIGHT, fontStyle: 'italic' }}>Don't have an account ?  </Text>
                                <Text style={{ fontSize: 17, color: colours.LIGHT }}>{" "}Sign Up </Text>
                            </TouchableOpacity>

                        </View>

                    </View>

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>

    )

}

export default Login

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
        width: '99%',
        marginVertical: 28
    },
    bottomContainer: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    }
})