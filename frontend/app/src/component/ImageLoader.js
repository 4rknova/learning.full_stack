import React, {Component} from 'react';
import {Image, Animated} from 'react-native';

class ImageLoader extends Component {
    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }
    
    render() {
        return (
            <Animated.Image
              onLoad={this.onLoad} {...this.props}
              style={[{ opacity: this.state.opacity }, this.props.style ]}
            />
        )
    }
}

export default ImageLoader;
