import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, useAnimatedValue } from "react-native";
import { useTheme } from "react-native-paper";
import Svg, { Path } from "react-native-svg";
import { selectionAsync } from "expo-haptics";

const ANIM_PART_DURATION = 3000;

export const PolygonOnboarding = () => {
  const { dark } = useTheme();
  const rotation = useAnimatedValue(0);
  const position = useAnimatedValue(300);
  const rotationInterpolation = rotation.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });
  const screenWidth = Dimensions.get("screen").width;
  const animation = useRef(
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(position, {
            toValue: -300,
            duration: ANIM_PART_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(position, {
            toValue: 300,
            duration: ANIM_PART_DURATION,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotation, {
          toValue: 360,
          duration: ANIM_PART_DURATION * 2,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
      ]),
    ),
  );

  useEffect(() => {
    animation.current?.start();

    return () => animation.current?.stop();
  }, [animation]);

  useEffect(() => {
    position.addListener((anim) => {
      if (anim.value === -300) {
        selectionAsync();
      }
    });

    return () => {
      position.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          { translateY: position },
          { rotate: rotationInterpolation },
        ],
      }}
    >
      <Svg
        width={screenWidth * 0.8}
        height={screenWidth * 0.8}
        viewBox="0 0 210 213"
        fill="none"
      >
        <Path
          d="M68.5867 5.72981C68.9585 0.608437 75.4876 -1.2193 78.4844 2.84316L78.6242 3.04026L107.35 45.3924C109.309 48.2803 113.181 49.0915 116.123 47.288L116.404 47.1053L158.617 18.1766C162.853 15.2737 168.353 19.2385 167.046 24.1144L166.977 24.347L151.777 73.2119C150.74 76.5438 152.52 80.0764 155.764 81.2518L156.083 81.3584L205.019 96.3248C209.929 97.8265 210.259 104.598 205.632 106.616L205.407 106.709L157.726 125.291C154.475 126.559 152.823 130.152 153.926 133.421L154.041 133.737L172.852 181.329C174.739 186.104 169.65 190.583 165.187 188.224L164.975 188.106L120.718 162.413C117.701 160.661 113.86 161.61 111.992 164.511L111.817 164.798L86.3369 209.177C83.7801 213.63 77.1056 212.445 76.1676 207.485L76.1269 207.246L68.621 156.625C68.1092 153.174 64.9728 150.762 61.5403 151.111L61.2071 151.154L10.6225 158.901C5.54685 159.679 2.31204 153.721 5.60491 149.895L5.76674 149.714L40.6648 112.285C43.0443 109.732 42.9729 105.777 40.5603 103.311L40.3197 103.077L2.72291 68.3589C-1.04976 64.8751 1.59197 58.631 6.63663 58.8207L6.87802 58.8349L57.9007 62.7813C61.3795 63.0503 64.4279 60.529 64.852 57.1052L64.8848 56.7709L68.5867 5.72981Z"
          stroke="#381E72"
          strokeWidth={2}
          strokeOpacity={dark ? 0.7 : 0.2}
        />
      </Svg>
    </Animated.View>
  );
};
