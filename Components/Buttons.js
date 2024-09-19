import React from 'react'
import { Text, View,TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import colours from '../colours';

const Button = (props) =>{
    const isLoading = props.isLoading || false;

    return (
        <TouchableOpacity 
            style={{...styles.btn,
                    ...props.style
            }}
            onPress={props.onPress}       
        >
            {
                isLoading && isLoading == true ? (
                    <ActivityIndicator size={'small'} color={colours.WHITE}/>
                ) :(
                    <Text style={{color:colours.LAV, fontSize:22}}>
                        {props.title}
                    </Text>
                )
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn:{
        // backgroundColor: colours.L,
        paddingHorizontal:20,
        paddingVertical:17,
        borderRadius:13,
        borderWidth:2,
        borderColor:colours.LAV,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default Button;