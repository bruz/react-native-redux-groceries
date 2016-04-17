import React, {
  Animated,
  Component,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class Item extends Component {
  constructor(props) {
    super(props)

    this.state = {
      scaleY: new Animated.Value(1),
      pan: new Animated.ValueXY()
    }
  }

  _reset() {
    Animated.timing(this.state.pan, {
      toValue: {x: 0, y: 0},
      duration: 250
    }).start()
  }

  _checkForRemoval() {
    this.state.pan.flattenOffset()
    let x = this.state.pan.x._value
    if (Math.abs(x) > 50) {
      this.refs.wrapper.measure((ox, oy, width) => {
        let newX
        if (x > 0) {
          newX = width
        } else {
          newX = -2 * width
        }

        Animated.sequence([
          Animated.timing(this.state.pan, {
            toValue: {x: newX, y: 0},
            duration: 250
          }),
          Animated.timing(this.state.pan, {
            toValue: {x: 0, y: 0},
            duration: 0
          })
        ]).start(() => {
          this.props.onRemove()
        })
      })
    } else {
      this._reset()
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => this.props.removable,

      onPanResponderGrant: () => {
        this.state.pan.setOffset({x: this.state.pan.x._value})
        this.state.pan.setValue({x: 0})
      },

      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y}
      ]),

      onPanResponderRelease: () => this._checkForRemoval(),

      onPanResponderTerminate: () => this._checkForRemoval()
    })
  }

  render() {
    const { pan, scaleY } = this.state
    const translateX = pan.x

    const animatedCardStyles = {transform: [{translateX}, {scaleY}]}
    const wrapperStyles = {
      backgroundColor: '#00AA00',
      transform: [{scaleY}]
    }

    return (
      <Animated.View style={wrapperStyles}>
        <View ref="wrapper">
          <Animated.View style={animatedCardStyles} {...this._panResponder.panHandlers}>
            <View style={styles.row}>
              <Text style={styles.text}>
                {this.props.name}
              </Text>
            </View>
            <View style={styles.separator} />
          </Animated.View>
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC'
  },
  text: {
    flex: 1,
    fontSize: 20
  }
})
