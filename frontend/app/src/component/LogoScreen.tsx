import React, {useEffect, useRef} from 'react';
import {Animated, View, StyleSheet, ImageSourcePropType} from 'react-native';

interface LogoScreenProps {
    source: ImageSourcePropType;
}

const LogoScreen: React.FC<LogoScreenProps> = ({
    source,
} ) => {

    let fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, [fadeAnim]);

    return (
      <View style={[styles.container_logo]}>
          <Animated.Image source={source} style={[ styles.logo, { opacity: fadeAnim } ]} />
      </View>
    );
};

const styles = StyleSheet.create({
    container_logo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: '75%',
        height: '75%',
        resizeMode: 'contain',
    },
});

export default LogoScreen;
