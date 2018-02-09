import React, {Component} from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component {
    // noinspection JSUnusedGlobalSymbols
    static defaultProps = {
        onSwipeRight: () => {
        },
        onSwipeLeft: () => {
        },
        renderNoMoreCards: () => {
        }
    };

    constructor(props) {
        // noinspection JSCheckFunctionSignatures
        super(props);
        this.state = {index: 0};

        this.position = new Animated.ValueXY();

        // noinspection JSUnusedGlobalSymbols
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                // noinspection JSCheckFunctionSignatures
                this.position.setValue({x: gesture.dx, y: gesture.dy});
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition();
                }
            }
        });
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 })
        }
    }

    componentWillUpdate(){
        // Android specific
        // noinspection JSUnresolvedVariable
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
        LayoutAnimation.spring();
    }

    resetPosition() {
        Animated.spring(this.position, {
            toValue: {x: 0, y: 0}
        }).start();
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.position, {
            toValue: {x, y: 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            // callback after the animation is finished
            this.onSwipeComplete(direction);
        })
    }

    onSwipeComplete(direction) {
        const { onSwipeRight, onSwipeLeft, data } = this.props;
        const item = data[this.state.index];

        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
        // noinspection JSCheckFunctionSignatures
        this.position.setValue({x: 0, y: 0});
        this.setState({index: this.state.index + 1})
    }

    getCardStyle() {
        const { position } = this;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        // noinspection JSUnresolvedFunction
        return {
            ...position.getLayout(),
            transform: [{rotate}]
        }
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards()
        }

        const {data, renderCard} = this.props;
        return data.map((item, idx) => {
            if (idx < this.state.index) {
                return null;
            }
            else if (idx === this.state.index) {
                return (
                    <Animated.View
                        key={item.id}
                        style={[this.getCardStyle(), styles.cardStyle]}
                        {...this.panResponder.panHandlers}
                    >
                        {renderCard(item)}
                    </Animated.View>
                )
            }
            return (
                <Animated.View
                    key={item.id}
                    style={[styles.cardStyle, { top: 10 * (idx - this.state.index) }]}
                >
                    {renderCard(item)}
                </Animated.View>
            )
        }).reverse()
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        )
    }
}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
};

export default Deck;