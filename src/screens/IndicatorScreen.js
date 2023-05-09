import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G, Path } from "react-native-svg";
import { parse, interpolatePath } from "react-native-redash";

const arrayItems = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
];

const screenWidth = Dimensions.get("window").width;
const radius = 45;
const circleCircumference = 2 * Math.PI * radius;
const circleStroke = 10;
const halfCircle = radius + circleStroke;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const onePath = `M2.71875 9.875C4.90625 9.1875 6.6875 8.625 8.0625 8.1875C9.4375 7.6875 10.5625 7.28125 11.4375 6.96875C12.4375 6.59375 13.1875 6.25 13.6875 5.9375L15.9375 4.8125C16.8125 4.375 17.9375 3.8125 19.3125 3.125C20.6875 2.375 22.4688 1.4375 24.6562 0.3125C24.1562 2.6875 23.7812 4.9375 23.5312 7.0625C23.3438 9.125 23.1875 10.9688 23.0625 12.5938C22.875 14.4688 22.7812 16.1875 22.7812 17.75C22.7188 19.0625 22.625 20.8125 22.5 23C22.4375 25.1875 22.3438 27.5625 22.2188 30.125C22.0938 32.6875 21.9688 35.3125 21.8438 38C21.7188 40.6875 21.625 43.2188 21.5625 45.5938C21.5625 47.9062 21.5938 49.9062 21.6562 51.5938C21.7812 53.2812 22 54.4375 22.3125 55.0625C22.625 55.8125 23.0312 56.5312 23.5312 57.2188C23.9688 57.8438 24.4688 58.5625 25.0312 59.375C25.6562 60.125 26.4062 60.875 27.2812 61.625C25.8438 61.9375 24.5 62.2188 23.25 62.4688C22 62.6562 20.9062 62.8125 19.9688 62.9375C18.8438 63.125 17.8438 63.2812 16.9688 63.4062C16.0312 63.4688 14.75 63.625 13.125 63.875C11.75 64.0625 10 64.3125 7.875 64.625C5.75 64.875 3.125 65.1562 0 65.4688C1.625 64.4688 2.90625 63.5 3.84375 62.5625C4.84375 61.625 5.59375 60.8125 6.09375 60.125C6.65625 59.3125 7 58.5312 7.125 57.7812C7.1875 57.2812 7.28125 55.9375 7.40625 53.75C7.59375 51.5 7.75 48.875 7.875 45.875C8.0625 42.8125 8.21875 39.5625 8.34375 36.125C8.53125 32.625 8.65625 29.375 8.71875 26.375C8.78125 23.375 8.8125 20.8125 8.8125 18.6875C8.8125 16.5625 8.71875 15.2812 8.53125 14.8438C8.28125 14.4062 7.90625 13.9062 7.40625 13.3438C6.96875 12.8438 6.375 12.3125 5.625 11.75C4.9375 11.1875 3.96875 10.5625 2.71875 9.875Z`;
const twoPath = `M0.84375 2.90625C2.03125 3.78125 3.21875 4.4375 4.40625 4.875C5.65625 5.25 6.78125 5.5 7.78125 5.625C8.90625 5.8125 10.0312 5.84375 11.1562 5.71875C12.2188 5.59375 13.3125 5.21875 14.4375 4.59375C15.5625 3.96875 16.875 3.3125 18.375 2.625C19.875 1.9375 21.625 1.34375 23.625 0.84375C25.6875 0.28125 28.1562 0 31.0312 0C32.2812 0 33.5938 0.25 34.9688 0.75C36.4062 1.25 37.7812 1.90625 39.0938 2.71875C40.4062 3.46875 41.5938 4.3125 42.6562 5.25C43.7812 6.1875 44.625 7.125 45.1875 8.0625C45.8125 9 46.25 10.5312 46.5 12.6562C46.75 14.7188 46.8438 16.9688 46.7812 19.4062C46.7188 21.8438 46.5 24.25 46.125 26.625C45.8125 29 45.3438 30.9375 44.7188 32.4375C43.9688 33.75 42.5312 35.4375 40.4062 37.5C38.5938 39.25 35.875 41.5 32.25 44.25C28.625 47 23.75 50.2812 17.625 54.0938C21.25 54.0312 24.2812 53.9375 26.7188 53.8125C29.2188 53.625 31.25 53.4375 32.8125 53.25C34.625 53 36.0625 52.75 37.125 52.5C38.0625 52.125 39.0625 51.5938 40.125 50.9062C41 50.2812 41.9375 49.4688 42.9375 48.4688C44 47.4688 45.0312 46.1562 46.0312 44.5312C46.2188 47.9062 46.4062 50.5625 46.5938 52.5C46.7188 53.625 46.8125 54.5938 46.875 55.4062C46.9375 56.1562 47 57.0312 47.0625 58.0312C47.125 58.9062 47.1562 59.9062 47.1562 61.0312C47.2188 62.1562 47.3125 63.3438 47.4375 64.5938C44.3125 63.7812 41.4688 63.1562 38.9062 62.7188C36.3438 62.2188 34.1562 61.875 32.3438 61.6875C30.2188 61.4375 28.3125 61.3125 26.625 61.3125C24.875 61.375 22.9375 61.5312 20.8125 61.7812C18.9375 62.0312 16.6875 62.4062 14.0625 62.9062C11.5 63.3438 8.59375 64 5.34375 64.875C5.09375 64.1875 4.875 63.5 4.6875 62.8125C4.5 62.0625 4.34375 61.3438 4.21875 60.6562C4.03125 59.9062 3.875 59.1562 3.75 58.4062C3.625 57.6562 3.5 56.9375 3.375 56.25C3.25 55.625 3.15625 54.9688 3.09375 54.2812C3.03125 53.5938 2.96875 52.9375 2.90625 52.3125C7.90625 49.125 11.9688 46.25 15.0938 43.6875C18.2188 41.0625 20.6875 38.8438 22.5 37.0312C24.5625 34.9062 26.125 32.9688 27.1875 31.2188C28.25 29.0938 29.125 26.75 29.8125 24.1875C30.5 21.625 30.7188 19.25 30.4688 17.0625C30.2812 14.875 29.5312 13.0938 28.2188 11.7188C26.9062 10.2812 24.8125 9.65625 21.9375 9.84375C20.0625 9.96875 18.2812 10.625 16.5938 11.8125C14.9688 13 13.4688 14.4375 12.0938 16.125C10.7188 17.8125 9.5 19.625 8.4375 21.5625C7.375 23.4375 6.46875 25.2188 5.71875 26.9062C5.03125 28.5938 4.46875 30 4.03125 31.125C3.65625 32.25 3.46875 32.8438 3.46875 32.9062C3.40625 33.0312 3.3125 32.5625 3.1875 31.5C3.125 30.4375 3.03125 29.125 2.90625 27.5625C2.84375 25.9375 2.75 24.25 2.625 22.5C2.5 20.75 2.375 19.2812 2.25 18.0938C2.1875 17.1562 2.09375 15.9375 1.96875 14.4375C1.78125 12 1.40625 8.15625 0.84375 2.90625Z`;
const threePath = `M0.90625 0.46875C1.96875 1.21875 3.0625 1.78125 4.1875 2.15625C5.3125 2.53125 6.3125 2.8125 7.1875 3C8.25 3.25 9.28125 3.375 10.2812 3.375C11.5312 3.375 12.6562 3.21875 13.6562 2.90625C14.7188 2.59375 15.875 2.28125 17.125 1.96875C18.375 1.65625 19.8125 1.40625 21.4375 1.21875C23.0625 0.96875 25.0938 0.9375 27.5312 1.125C29.9688 1.3125 32.1562 1.875 34.0938 2.8125C36.0312 3.6875 37.6562 4.8125 38.9688 6.1875C40.3438 7.5 41.4062 8.96875 42.1562 10.5938C42.9062 12.2188 43.2812 13.875 43.2812 15.5625C43.1562 18.125 42.75 20.5312 42.0625 22.7812C41.4375 24.7188 40.4688 26.625 39.1562 28.5C37.8438 30.3125 35.9062 31.5938 33.3438 32.3438C36.4688 32.7812 38.9062 33.5938 40.6562 34.7812C42.4688 35.9688 43.875 37.1875 44.875 38.4375C46 39.9375 46.7812 41.5625 47.2188 43.3125C47.5938 45.625 47.5625 48 47.125 50.4375C46.6875 52.8125 45.875 55.0625 44.6875 57.1875C43.5625 59.25 42 61.0938 40 62.7188C38.0625 64.2812 35.7188 65.4375 32.9688 66.1875C31.0938 66.6875 28.9375 66.8125 26.5 66.5625C24.125 66.25 21.8125 65.8125 19.5625 65.25C17.3125 64.6875 15.2812 64.125 13.4688 63.5625C11.6562 63 10.4062 62.75 9.71875 62.8125C9.15625 62.875 8.5 63.0938 7.75 63.4688C7.0625 63.7812 6.25 64.2812 5.3125 64.9688C4.4375 65.5938 3.375 66.5 2.125 67.6875C2.4375 64.875 2.65625 62.625 2.78125 60.9375C2.96875 59.25 3.125 57.9062 3.25 56.9062C3.375 55.7812 3.4375 54.9375 3.4375 54.375V52.3125C3.4375 51.5625 3.40625 50.5938 3.34375 49.4062C3.28125 48.2188 3.21875 46.7188 3.15625 44.9062C6.34375 48.7812 9.34375 51.6875 12.1562 53.625C14.9688 55.5625 17.4375 56.9688 19.5625 57.8438C22.0625 58.8438 24.3438 59.3125 26.4062 59.25C28.1562 59.125 29.5625 58.5625 30.625 57.5625C31.6875 56.5 32.4375 55.25 32.875 53.8125C33.3125 52.375 33.4688 50.8438 33.3438 49.2188C33.2188 47.5312 32.8125 45.9688 32.125 44.5312C31.5 43.0312 30.625 41.75 29.5 40.6875C28.375 39.5625 27.0625 38.875 25.5625 38.625C23.75 38.3125 22.0312 38.2812 20.4062 38.5312C18.9688 38.7188 17.4688 39.1562 15.9062 39.8438C14.3438 40.4688 13.0312 41.5625 11.9688 43.125C11.8438 42.0625 11.75 41.1562 11.6875 40.4062C11.6875 39.6562 11.6562 39.0312 11.5938 38.5312C11.5312 37.9688 11.5 37.5625 11.5 37.3125C11.5 37 11.4688 36.5312 11.4062 35.9062C11.3438 35.4062 11.2812 34.75 11.2188 33.9375C11.2188 33.0625 11.1562 31.9688 11.0312 30.6562C12.1562 30.9688 13.2188 31.2188 14.2188 31.4062C15.2188 31.5312 16.0938 31.625 16.8438 31.6875C17.7188 31.75 18.5312 31.75 19.2812 31.6875C20.2188 31.625 21.3438 31.2812 22.6562 30.6562C24.0312 29.9688 25.3125 29.0625 26.5 27.9375C27.6875 26.8125 28.625 25.4688 29.3125 23.9062C30.0625 22.3438 30.3125 20.625 30.0625 18.75C29.5 14.9375 28.2188 12.2188 26.2188 10.5938C24.2812 8.90625 22.2812 8.125 20.2188 8.25C18.8438 8.4375 17.2188 9.09375 15.3438 10.2188C13.7188 11.1562 11.7812 12.5938 9.53125 14.5312C7.34375 16.4062 4.84375 19.0625 2.03125 22.5C2.15625 20.8125 2.21875 19.3125 2.21875 18C2.21875 16.625 2.21875 15.5 2.21875 14.625C2.21875 13.5625 2.1875 12.625 2.125 11.8125L1.84375 9C1.71875 8.0625 1.59375 6.875 1.46875 5.4375C1.34375 4 1.15625 2.34375 0.90625 0.46875Z`;

const parseOne = parse(onePath);
const parseTwo = parse(twoPath);
const parseThree = parse(threePath);

const IndicatorScreen = () => {
  const [isFinal, setIsFinal] = useState(false);

  const scrollX = useSharedValue(0);
  const progress = useSharedValue(0);
  const numberPath = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const animatedProp = useAnimatedProps(() => ({
    strokeDashoffset:
      circleCircumference - (circleCircumference * progress.value) / 100, //1 50 100
  }));

  const animatedPropForNumber = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        numberPath.value,
        [0, 1, 2],
        [parseOne, parseTwo, parseThree]
      ),
    };
  });

  const onViewableItemsChanged = useCallback(({ viewableItems }) => {
    const presentIndex = viewableItems[0].index;
    let progressValue = 0;
    if (presentIndex === 0) {
      progressValue = 1;
      setIsFinal(false);
    } else if (presentIndex === 1) {
      progressValue = 50;
      setIsFinal(false);
    } else {
      progressValue = 100;
      setTimeout(() => {
        setIsFinal(true);
      }, 300);
    }

    numberPath.value = withTiming(presentIndex, {
      duration: 500,
      easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
    });

    progress.value = withTiming(progressValue, {
      duration: 300,
      easing: Easing.linear,
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1F456E" }}>
      <View style={{ flex: 4, justifyContent: "center", alignItems: "center" }}>
        {/* SVG number animation  */}
        <View
          style={{
            width: wp(20),
            height: wp(20),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Svg width={52} height={70} viewBox="0 0 52 70">
            <AnimatedPath animatedProps={animatedPropForNumber} fill="white" />
          </Svg>
        </View>
        <Animated.FlatList
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          onViewableItemsChanged={onViewableItemsChanged}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          pagingEnabled
          horizontal
          data={arrayItems}
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  flex: 1,
                  width: wp(100),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "white", fontSize: wp(4) }}>
                  This is page {index + 1}.
                </Text>
              </View>
            );
          }}
        />
      </View>

      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row" }}>
          {arrayItems.map((_, index) => {
            return <Indicator key={index} index={index} scrollX={scrollX} />;
          })}
        </View>
      </View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <Svg
          height={radius * 3}
          width={radius * 3}
          viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
        >
          <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
            <Circle
              stroke={"gray"}
              strokeWidth={circleStroke}
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              strokeDasharray={circleCircumference}
            />
            <AnimatedCircle
              stroke={"white"}
              strokeWidth={circleStroke}
              cx="50%"
              cy="50%"
              r={radius}
              fill="transparent"
              strokeDasharray={circleCircumference}
              animatedProps={animatedProp}
              strokeLinecap="round"
            />
          </G>
        </Svg>

        <TouchableOpacity
          disabled={!isFinal}
          // onPress={() => navigation.navigate('home')}
          style={{
            position: "absolute",
            height: wp(18),
            width: wp(18),
          }}
        >
          <Image
            resizeMode={"contain"}
            source={require("../../assets/checkMark.png")}
            style={{
              height: wp(18),
              width: wp(18),
              tintColor: isFinal ? "#4dff4d" : "gray",
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const Indicator = ({ scrollX, index }) => {
  const animationStyle = useAnimatedStyle(() => {
    const width = interpolate(
      scrollX.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      [40, 20, 40],
      "clamp"
    );

    const backgroundColor = interpolateColor(
      scrollX.value,
      [
        (index - 1) * screenWidth,
        index * screenWidth,
        (index + 1) * screenWidth,
      ],
      ["gray", "white", "gray"]
    );

    return {
      width,
      backgroundColor,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: hp(0.5),
          marginRight: wp(2),
          borderRadius: wp(2),
        },
        animationStyle,
      ]}
    />
  );
};

export default IndicatorScreen;

const styles = StyleSheet.create({
  blackStripeStyle: {
    height: hp(1),
    width: wp(15),
    backgroundColor: "gray",
    opacity: 0.3,
    marginRight: wp(8),
    transform: [
      {
        skewX: "50deg",
      },
    ],
  },
  roadContainerStyle: {
    height: hp(10),
    backgroundColor: "white",
    width: wp(100),
    marginBottom: wp(40),
    alignItems: "center",
    paddingLeft: wp(10),
    flexDirection: "row",
  },
});
