import { View, StyleSheet, Text,Image } from "react-native";
import React from "react";
import colours from "../colours";
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from "react-redux";
import { selectDestination } from "../slices/navSlice";
// import Map from "../Components/Map";


const MapScreen = () => {
    const destination = useSelector(selectDestination)
    console.log(destination)
    const userName = destination.description.first + destination.description.last;
    const my_long = 77.58428356547333;
    const my_lat = 28.451212096281235;
    return (
        <View style={{ flex: 1, backgroundColor: colours.GREY }}>
            <View style={styles.map_container}>
                <MapView style={styles.map}
                    mapType="terrain"
                    initialRegion={{
                        latitude: my_lat,
                        longitude: my_long,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.041,
                    }}
                >
                    <Marker coordinate={{ latitude: parseFloat(destination.latitude), longitude: parseFloat(destination.longitude) }} pinColor='indigo' title={userName} />
                    <Marker coordinate={{ latitude: parseFloat(my_lat), longitude: parseFloat(my_long) }} pinColor='red' title='Me' />

                </MapView>
            </View>
            <View style={styles.cont}>
                <View style={{flexDirection:'row' ,  width:'90%',alignItems:'center'}}>
                    <Text style={{
                        fontSize: 33, padding: 5, color: colours.LIGHT,marginLeft:60
                    }}>{destination.description.first + " " + destination.description.last + "   "}
                    </Text>
                    <Image 
                        style={{width:60 , height:60 , borderRadius:30, marginHorizontal:20}}
                        source={destination.img}
                    />
                </View>

                <View style={styles.data_cont}>
                    <Text style={styles.data}>Latitude : {destination.latitude}    </Text>
                    <Text style={styles.data}>Longitude : {destination.longitude}    </Text>
                    <Text style={styles.data}>Country : {destination.location.country}    </Text>
                    <Text style={styles.data}>City : {destination.location.city}    </Text>
                </View>
            </View>
        </View>
    )
}

export default MapScreen

const styles = StyleSheet.create({
    map_container: {
        alignItems: 'center',
        height: '75%'
    },
    map: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%',
    },
    cont: {
        height: '25%',
        backgroundColor: colours.GREY,
        marginTop: -100,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        alignItems: 'center',
        padding: 10,
        flex: 1,
        // justifyContent:'center'
    },
    data_cont: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    data: {
        color: colours.LAV,
        fontSize: 20,
        margin: 3
    }

});