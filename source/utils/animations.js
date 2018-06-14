/**
 * Created by rajatmareclbeck on 14/06/18.
 */
import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';

function stackScrollInterpolator (index, carouselProps) {
    const range = [1, 0, -1, -2, -3];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;
    return { inputRange, outputRange };
}

function stackAnimatedStyles (index, animatedValue, carouselProps) {
    const sizeRef = carouselProps.vertical ? carouselProps.itemHeight : carouselProps.itemWidth;
    const translateProp = carouselProps.vertical ? 'translateY' : 'translateX';

    const cardOffset = 18;
    const card1Scale = 0.9;
    const card2Scale = 0.8;

    const getTranslateFromScale = (index, scale) => {
        const centerFactor = 1 / scale * index;
        const centeredPosition = -Math.round(sizeRef * centerFactor);
        const edgeAlignment = Math.round((sizeRef - (sizeRef * scale)) / 2);
        const offset = Math.round(cardOffset * Math.abs(index) / scale);

        return centeredPosition - edgeAlignment - offset;
    };

    return {
        opacity: animatedValue.interpolate({
            inputRange: [-3, -2, -1, 0],
            outputRange: [0, 0.5, 0.75, 1],
            extrapolate: 'clamp'
        }),
        transform: [{
            scale: animatedValue.interpolate({
                inputRange: [-2, -1, 0, 1],
                outputRange: [card2Scale, card1Scale, 1, card1Scale],
                extrapolate: 'clamp'
            })
        }, {
            [translateProp]: animatedValue.interpolate({
                inputRange: [-3, -2, -1, 0, 1],
                outputRange: [
                    getTranslateFromScale(-3, card2Scale),
                    getTranslateFromScale(-2, card2Scale),
                    getTranslateFromScale(-1, card1Scale),
                    0,
                    sizeRef * 0.5
                ],
                extrapolate: 'clamp'
            })
        }]
    };
}

