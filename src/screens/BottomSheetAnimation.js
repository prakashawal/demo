import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const INITIAL_HEIGHT = -SCREEN_HEIGHT / 3;

const BottomSheetAnimation = () => {
  const y = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      y.value = event.translationY + ctx.startY;
      y.value = Math.max(y.value, -SCREEN_HEIGHT);
    },
    onEnd: (event, _) => {
      if (-event.translationY > SCREEN_HEIGHT / 3) {
        y.value = withTiming(-SCREEN_HEIGHT, { duration: 300 });
      } else {
        y.value = withSpring(INITIAL_HEIGHT);
      }
    },
  });

  useEffect(() => {
    y.value = INITIAL_HEIGHT;
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    let transformStyle = {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };

    let radiusStyle = {};

    if (y.value === -SCREEN_HEIGHT) {
      radiusStyle = {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      };
    } else {
      radiusStyle = {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      };
    }

    return {
      ...transformStyle,
      ...radiusStyle,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Animated.View style={[styles.bottomSheetStyle, animatedStyle]}>
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View>
              <View style={styles.lineGrayStyle} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
};

export default BottomSheetAnimation;

const styles = StyleSheet.create({
  bottomSheetStyle: {
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    top: SCREEN_HEIGHT,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineGrayStyle: {
    height: 8,
    width: 80,
    borderRadius: 10,
    backgroundColor: "gray",
    alignSelf: "center",
    marginTop: 10,
  },
});
