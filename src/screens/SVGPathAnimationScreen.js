import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Svg, { Path, G } from "react-native-svg";
import { interpolatePath, parse } from "react-native-redash";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const neutralLeftEye = `M343 870 c-47 -19 -58 -92 -20 -128 40 -37 98 -28 123 19 18 36 10 73 -23 99 -28 22 -46 24 -80 10z`;
const neutralRightEye = `M858 861 c-34 -27 -42 -63 -24 -100 38 -72 146 -45 146 36 0 65 -72 103 -122 64z`;
const neutralMouth = `M362 438 c-16 -16 -15 -43 2 -57 9 -8 92 -11 281 -9 242 3 269 5 279 21 8 12 8 22 0 35 -10 15 -37 17 -280 20 -201 2 -273 -1 -282 -10z`;
const happyLeftEye = `M355 851 c-76 -19 -108 -58 -75 -91 l21 -21 33 20 c41 26 57 26 104 2 42 -21 72 -14 72 19 0 22 -54 70 -80 70 -10 0 -24 2 -32 4 -7 2 -26 1 -43 -3z`;
const happyRightEye = `M852 850 c-39 -9 -82 -46 -82 -71 0 -32 30 -39 72 -18 47 24 63 24 104 -2 l33 -20 21 21 c16 16 18 25 10 40 -21 39 -98 63 -158 50z`;
const happyMouth = `M271 593 c-13 -25 3 -114 33 -178 34 -76 97 -139 175 -178 60 -29 74 -32 161 -32 87 0 101 3 161 32 112 55 189 161 208 285 15 94 41 88 -369 88 -332 0 -360 -1 -369 -17z m659 -77 c0 -40 -29 -96 -76 -146 -117 -125 -311 -125 -428 0 -47 50 -76 106 -76 146 l0 24 290 0 290 0 0 -24z`;
const sadMouth = `M612 446 c-243 -44 -279 -57 -256 -94 6 -9 22 -18 36 -20 21 -3 462 70 510 84 22 6 30 31 18 55 -14 26 -34 24 -308 -25z`;
const angryMouth = `M516 590 c-52 -20 -109 -69 -130 -110 -29 -56 20 -71 52 -16 11 19 42 47 69 63 43 25 58 28 133 28 75 0 90 -3 133 -28 27 -16 58 -44 69 -63 20 -34 52 -45 61 -21 13 35 -68 120 -140 147 -71 26 -180 26 -247 0z`;
const angryLeftEye = `M277 873 c-4 -3 -7 -14 -7 -24 0 -12 18 -23 69 -38 64 -19 68 -22 63 -46 -6 -32 31 -75 65 -75 23 0 63 31 63 50 0 6 11 10 24 10 14 0 27 4 30 9 15 24 -14 40 -144 79 -148 45 -153 46 -163 35z`;

// Neutral face parse
const parseNLE = parse(neutralLeftEye);
const parseNRE = parse(neutralRightEye);
const parseNM = parse(neutralMouth);
//Happy face parse
const parseHLE = parse(happyLeftEye);
const parseHRE = parse(happyRightEye);
const parseHM = parse(happyMouth);
//Sad mouth
const parseSM = parse(sadMouth);
//Angry face
const parseAM = parse(angryMouth);
const parseALE = parse(angryLeftEye);

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SVGPathAnimationScreen = () => {
  const faceValue = useSharedValue(1);

  const changeFaceValue = (value) => {
    faceValue.value = withTiming(value, {
      duration: 800,
      easing: Easing.bezier(0.27, 0.27, 0.04, 0.99),
    });
  };

  const animatedLeftEyePath = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        faceValue.value,
        [1, 2, 3],
        [parseNLE, parseNLE, parseHLE]
      ),
    };
  });

  const animatedRightEyePath = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        faceValue.value,
        [1, 2, 3],
        [parseNRE, parseNRE, parseHRE]
      ),
    };
  });

  const animatedMouthPath = useAnimatedProps(() => {
    return {
      d: interpolatePath(
        faceValue.value,
        [1, 2, 3],
        [parseSM, parseNM, parseHM]
      ),
    };
  });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Svg
        style={{
          backgroundColor: "orange",
          overflow: "hidden",
          borderRadius: 128 / 2,
        }}
        width={128}
        height={128}
        viewBox="0 0 128 128"
        preserveAspectRatio="xMidYMid meet"
      >
        <G
          fill="#000000"
          transform="translate(0.000000,128.000000) scale(0.100000,-0.100000)"
        >
          <Path
            fill="black"
            d="M501 1265 c-110 -24 -226 -89 -311 -175 -250 -250 -252 -649 -5 -895 122 -121 256 -183 419 -192 292 -16 560 170 649 452 31 99 31 271 0 370 -101 318 -428 510 -752 440z m245 -76 c98 -17 210 -78 288 -155 219 -220 219 -569 -1 -789 -219 -219 -568 -218 -788 3 -270 269 -194 722 148 891 118 58 225 73 353 50z"
          />

          {/* left eye  */}
          <AnimatedPath fill={"white"} animatedProps={animatedLeftEyePath} />

          {/* right eye  */}
          <AnimatedPath fill={"white"} animatedProps={animatedRightEyePath} />

          {/* Mouth  */}
          <AnimatedPath fill={"white"} animatedProps={animatedMouthPath} />
        </G>
      </Svg>

      <View style={styles.textContainerStyle}>
        <TouchableOpacity onPress={() => changeFaceValue(1)}>
          <Text style={styles.textStyle}>Confused</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeFaceValue(2)}>
          <Text style={styles.textStyle}>Netural</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeFaceValue(3)}>
          <Text style={styles.textStyle}>Happy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SVGPathAnimationScreen;

const styles = StyleSheet.create({
  textContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(10),
    width: wp(100),
  },
  textStyle: {
    fontWeight: "400",
    fontSize: wp(4),
  },
});
