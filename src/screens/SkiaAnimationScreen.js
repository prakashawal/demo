import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import {
  Canvas,
  Rect,
  mix,
  useSharedValueEffect,
  useValue,
} from "@shopify/react-native-skia";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const SkiaAnimationScreen = () => {
  const x = useValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
  }, [progress]);

  useSharedValueEffect(() => {
    x.current = mix(progress.value, 0, 100);
  }, progress);

  return (
    <Canvas style={{ flex: 1 }}>
      <Rect x={x} y={100} width={100} height={100} color="red" />
    </Canvas>
  );
};

export default SkiaAnimationScreen;

const styles = StyleSheet.create({});
