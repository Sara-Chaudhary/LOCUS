import React from "react";
import MapView, { Marker } from 'react-native-maps';
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useSelector } from "react-redux";
import { selectDestination } from "../slices/navSlice";

const Map = () => {
    const destination = useSelector(selectDestination)
    console.log(destination)
    return (
        <View style={styles.map_container}>
            <MapView style={styles.map}
                mapType="terrain"
                initialRegion={{
                    latitude: 28.7041,
                    longitude: 77.1025,
                    latitudeDelta: .2922,
                    longitudeDelta: 0.0471,
                }}
            >
                <Marker coordinate={{ latitude: 28.7141, longitude: 77.1425 }} pinColor='red' title='Sara' />
                {/* <Marker coordinate={{ latitude: 28.6141, longitude: 77.0925 }} pinColor='plum' title='Anushka' />
                            <Marker coordinate={{ latitude: 28.6741, longitude: 77.0325 }} pinColor='orange' title='Ishita' />
                            <Marker coordinate={{ latitude: 28.7841, longitude: 77.1625 }} pinColor='green' title='Soumya' />
                            <Marker coordinate={{ latitude: 28.7041, longitude: 77.1025 }} pinColor='indigo' title='Tanisha' /> */}
            </MapView>

        </View>
    )
}

export default Map;

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
    Header: {
        flexDirection: 'row',
        //   backgroundColor: colours.GREY,
        height: 100,
        marginVertical: 10,
        borderRadius: 20,
        padding: 10,
        alignContent: 'center'
    },
});