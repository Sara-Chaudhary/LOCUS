import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, ActivityIndicator, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import colours from './../colours';
import filter from 'lodash.filter';
import { useNavigation } from "@react-navigation/native";
import { signOut } from 'firebase/auth';
import { auth } from '../configure';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination } from '../slices/navSlice';

const API_ENDPOINT = 'https://randomuser.me/api/?results=30'

const DashBoard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [fullData, setFullData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        setIsLoading(true);
        fetchData(API_ENDPOINT);
    }, []);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json.results);
            // console.log(json.results);
            setFullData(json.results);
            setIsLoading(false);

        } catch (error) {
            setError(error);
            console.log(error);
        }

    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(fullData, (user) => {
            return contains(user, formattedQuery)
        });
        setData(filteredData);
        // console.log(filteredData);
    };


    const contains = ({ name, email }, query) => {
        const { first, last } = name;

        if (first.includes(query) || last.includes(query) || email.includes(query)) {
            return true;
        }
        return false;
    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colours.GREY }}>
                <ActivityIndicator size={'large'} color={colours.LAV} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    Error in Fetching Data --- Please check your internet connection
                </Text>
            </View>
        )
    }

    const Out = () => {
        try {
            setIsLoading(true)
            signOut(auth)
            Alert.alert("GoodBye", "Return Soon")
            navigation.navigate('Welcome')
            setIsLoading(false);
        } catch (error) {
            alert(error.message)
            setIsLoading(false)
        }
    }

    const dispatch = useDispatch();


    return (
        <SafeAreaView style={{
            flex: 1,
            paddingHorizontal: 20, paddingTop: 50,
            backgroundColor: colours.GREY
        }}>
            <View style={styles.header}>
                <Image style={styles.img} source={require('./../assets/images/logo.png')} />
                <View>
                    <Text style={styles.main}> L O C U S  </Text>
                </View>
                <TouchableOpacity style={styles.signout_cont}
                    onPress={() => Out()}
                >
                    <Image style={styles.signout_img} source={require('./../assets/images/logout1.jpeg')} />
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.searchbar}
                placeholder='Search'
                clearButtonMode='always'
                autoCapitalize='none'
                autoCorrect={false}
                value={searchQuery}
                onChangeText={(query) => handleSearch(query)}
                returnKeyType='search'

            />
            <View style={{ height: 350 }}>
                <FlatList style={{ flex: 1, height: 500 }}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                console.log(item.location);
                                dispatch(setDestination({
                                    latitude: item.location.coordinates.latitude,
                                    longitude: item.location.coordinates.longitude,
                                    description: item.name,
                                    location:item.location,
                                    img:{uri : item.picture.thumbnail}
                                })
                                );
                            }}
                        >
                            <View style={styles.itemContainer}>
                                <Image style={styles.image} source={{ uri: item.picture.thumbnail }} />
                                <View>
                                    <Text style={styles.textName}>{item.name.first} {item.name.last}</Text>
                                    <Text style={styles.textEmail}>{item.email}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.login.username}
                />
            </View>

            <View style={styles.btn_container}>
                <TouchableOpacity style={styles.btn}
                    onPress={() => navigation.navigate("MapScreen")}
                >
                    <Text style={styles.btn_text}>N A V I G A T E  </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

export default DashBoard

const styles = StyleSheet.create({
    searchbar: {
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        borderColor: '#ccc',
        backgroundColor: colours.WHITE,
        marginBottom: 20
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 12
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    textName: {
        fontSize: 17,
        marginLeft: 20,
        fontWeight: '600',
        color: colours.LIGHT
    },
    textEmail: {
        fontSize: 14,
        marginLeft: 20,
        color: colours.LAV,
    },
    btn_container: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    header: {
        height: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    img: {
        width: 70,
        height: 70,
    },
    main: {
        fontSize: 37,
        marginHorizontal: 10,
        color: colours.WHITE
    },
    text: {
        fontSize: 21,
        marginLeft: 20,
        fontWeight: '600',
        color: colours.WHITE
    },
    btn: {
        borderWidth: 4,
        height: 60,
        width: 400 - 32,
        borderColor: colours.LIGHT,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginVertical: 10
    },
    btn_text: {
        fontSize: 20,
        color: colours.LIGHT
    },
    signout_cont: {
        marginLeft: 30
    },
    signout_img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        padding: 10
    }
});

