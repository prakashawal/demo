import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";

const screenWidht = Dimensions.get("window").width;

const HeaderBarAnimationScreen = () => {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
  });

  const animatedTopText = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollY.value,
      [0, 100],
      [0, screenWidht / 2.5],
      "clamp"
    );
    const translateY = interpolate(scrollY.value, [0, 100], [10, -80], "clamp");

    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  const animatedBottomText = useAnimatedStyle(() => {
    const translateX = interpolate(
      scrollY.value,
      [0, 100],
      [0, screenWidht / 4],
      "clamp"
    );
    const translateY = interpolate(scrollY.value, [0, 100], [10, -80], "clamp");
    // const scale = interpolate(scrollY.value, [10, 100], [1, 0.6], 'clamp');
    const fontSize = interpolate(scrollY.value, [0, 100], [25, 15], "clamp");

    return {
      transform: [{ translateX }, { translateY }],
      fontSize,
    };
  });

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: 200,
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          // zIndex: 2,
        }}
      >
        <Image
          style={{ flex: 1 }}
          source={{
            uri: "https://img.freepik.com/premium-photo/abstract-painting-color-texture-modern-futuristic-pattern-loseup-painting-colorful-background_88135-37864.jpg",
          }}
        />
      </View>

      <Animated.ScrollView
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={{
          flex: 1,
          marginTop: 100,
        }}
      >
        <View
          style={{
            height: 100,
            backgroundColor: "transparent",
          }}
        ></View>
        <View style={{ height: 500, backgroundColor: "red" }} />
        <View style={{ height: 500, backgroundColor: "green" }} />
        <View style={{ height: 500, backgroundColor: "blue" }} />
        <View style={{ height: 500, backgroundColor: "yellow" }} />
        <View style={{ height: 500, backgroundColor: "red" }} />
        <View style={{ height: 500, backgroundColor: "yellow" }} />
        <View style={{ height: 500, backgroundColor: "green" }} />
      </Animated.ScrollView>

      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 200,
            justifyContent: "flex-end",
            paddingLeft: wp(5),
            paddingBottom: hp(3),
          },
        ]}
      >
        <Animated.Text
          style={[
            { fontWeight: "700", fontSize: 15, color: "white" },
            animatedTopText,
          ]}
        >
          2/2
        </Animated.Text>
        <Animated.Text
          style={[{ fontWeight: "700", color: "white" }, animatedBottomText]}
        >
          Fill in personal details
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default HeaderBarAnimationScreen;

const styles = StyleSheet.create({});
