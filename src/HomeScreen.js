import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const animationsList = [
  {
    name: "Indicator animation",
    navigationName: "indicator",
  },
  {
    name: "Header bar animation",
    navigationName: "headerBar",
  },
  {
    name: "Progress bar animation",
    navigationName: "",
  },
  {
    name: "SVG Path Animation",
    navigationName: "svgPath",
  },
];

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{}}
        data={animationsList}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.navigationName)}
              activeOpacity={0.7}
              style={styles.itemContainerStyle}
            >
              <Text style={{ fontSize: wp(5) }}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  itemContainerStyle: {
    height: hp(6),
    borderBottomWidth: wp(0.2),
    borderBottomColor: "#bfbfbf",
    justifyContent: "center",
    paddingLeft: wp(2),
  },
});
