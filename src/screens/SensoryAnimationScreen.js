import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  SensorType,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const SensoryAnimationScreen = () => {
  const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 10,
  }); // <- initialization
  const style = useAnimatedStyle(() => {
    const yaw = Math.abs(animatedSensor.sensor.value.yaw);
    const pitch = Math.abs(animatedSensor.sensor.value.pitch);
    return {
      height: withTiming(yaw * 200 + 20, { duration: 100 }), // <- usage
      width: withTiming(pitch * 200 + 20, { duration: 100 }), // <- usage
    };
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={[{ backgroundColor: "black" }, style]} />
    </View>
  );
};

export default SensoryAnimationScreen;

const styles = StyleSheet.create({});
