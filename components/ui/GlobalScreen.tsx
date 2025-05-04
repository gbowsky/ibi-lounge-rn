import { useSettingsStore } from "@/stores/UserPrefs";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation, useTheme } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  FlatList,
  LayoutChangeEvent,
  SectionListProps,
  SectionList,
} from "react-native";
import { Appbar, Divider, Surface, Text } from "react-native-paper";
import { FlatListProps } from "react-native/Libraries/Lists/FlatList";

const MaterialHeader = ({
  title,
  transparent,
}: {
  title: string;
  transparent: boolean;
}) => {
  const nativeTheme = useTheme();
  const { blurAndroidEnabled } = useSettingsStore();

  return (
    <Appbar.Header
      statusBarHeight={0}
      style={{
        backgroundColor: transparent ? "transparent" : nativeTheme.colors.card,
      }}
      mode="small"
    >
      <Appbar.Content
        titleStyle={{ fontFamily: "RobotoSlab-Medium", fontSize: 20 }}
        title={title}
      />
    </Appbar.Header>
  );
};

const SystemFooter = ({
  children,
  paddingBottom = 0,
}: PropsWithChildren<{ paddingBottom?: number }>) => {
  const nativeTheme = useTheme();
  const { blurAndroidEnabled } = useSettingsStore();

  if (Platform.OS === "ios" || blurAndroidEnabled) {
    return (
      <BlurView
        experimentalBlurMethod="dimezisBlurView"
        tint="systemChromeMaterial"
        intensity={100}
      >
        <Divider />
        {children}
        <View style={{ height: paddingBottom }} />
      </BlurView>
    );
  }

  return (
    <Surface
      style={{
        backgroundColor: nativeTheme.colors.card,
      }}
    >
      <Divider />
      {children}
      <View style={{ height: paddingBottom }} />
    </Surface>
  );
};

interface GlobalScreenProps<FlatListDataItem, SectionDataItem> {
  largeTitle?: boolean;
  flatListProps?: Omit<FlatListProps<FlatListDataItem>, "ListHeaderComponent">;
  sectionListProps?: Omit<
    SectionListProps<FlatListDataItem, SectionDataItem>,
    "ListHeaderComponent"
  >;
  scrollViewProps?: ScrollViewProps;
  footer?: ReactNode;
  title?: string;
  modal?: boolean;
}

export const GlobalScreen = <
  FlatListDataItem = undefined,
  SectionDataItem = undefined,
>(
  props: GlobalScreenProps<FlatListDataItem, SectionDataItem>,
) => {
  const {
    sectionListProps,
    flatListProps,
    scrollViewProps,
    largeTitle,
    footer,
    title = "unnamed",
    modal = false,
  } = props;

  const navigation = useNavigation();
  const tabbarHeight = modal ? 0 : useBottomTabBarHeight();
  const [footerHeight, setFooterHeight] = useState(0);
  const shouldEnableLargeTitleQuirk =
    Platform.OS === "android" && largeTitle && !modal;
  const [isTransparent, setTransparent] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: "RobotoSlab-Medium",
      },
      headerLargeTitleStyle: {
        fontFamily: "RobotoSlab-Medium",
      },
    });
    if (Platform.OS !== "android" || !largeTitle || !navigation || modal) {
      return;
    }
    navigation.setOptions({
      title: "",
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: shouldEnableLargeTitleQuirk
          ? "transparent"
          : undefined,
      },
    });
  }, [navigation]);

  const globalScreenScrollHandler = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    navigation.setOptions({
      headerTitleStyle: {
        fontFamily: "RobotoSlab-Medium",
      },
      headerLargeTitleStyle: {
        fontFamily: "RobotoSlab-Medium",
      },
    });
    if (Platform.OS !== "android" || !largeTitle || modal) {
      return;
    }

    const scrollHeight = event.nativeEvent.contentOffset.y;
    setTransparent(scrollHeight <= 64);

    navigation.setOptions({
      headerShadowVisible: false,
      headerTitle: scrollHeight > 64 ? title : "",
      headerStyle: {
        backgroundColor: scrollHeight <= 64 ? "transparent" : undefined,
      },
    });
  };

  const globalFooterLayoutHandler = (event: LayoutChangeEvent) => {
    setFooterHeight(event.nativeEvent.layout.height);
  };

  if (sectionListProps) {
    return (
      <View style={styles.root}>
        <SectionList
          {...sectionListProps}
          contentInsetAdjustmentBehavior="automatic"
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          automaticallyAdjustsScrollIndicatorInsets
          onScroll={globalScreenScrollHandler}
          ListHeaderComponent={
            shouldEnableLargeTitleQuirk ? (
              <MaterialHeader title={title} transparent={isTransparent} />
            ) : undefined
          }
          ListFooterComponent={
            <View style={{ height: tabbarHeight + footerHeight }} />
          }
        />
        {footer && (
          <View
            onLayout={globalFooterLayoutHandler}
            style={{ ...styles.footer, bottom: tabbarHeight }}
          >
            <SystemFooter paddingBottom={modal ? 24 : 0}>{footer}</SystemFooter>
          </View>
        )}
      </View>
    );
  }

  if (flatListProps) {
    return (
      <View style={styles.root}>
        <FlatList
          {...flatListProps}
          contentInsetAdjustmentBehavior="automatic"
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          automaticallyAdjustsScrollIndicatorInsets
          onScroll={globalScreenScrollHandler}
          ListHeaderComponent={
            shouldEnableLargeTitleQuirk ? (
              <MaterialHeader title={title} transparent={isTransparent} />
            ) : undefined
          }
          ListFooterComponent={
            <View style={{ height: tabbarHeight + footerHeight }} />
          }
        />
        {footer && (
          <View
            onLayout={globalFooterLayoutHandler}
            style={{ ...styles.footer, bottom: tabbarHeight }}
          >
            <SystemFooter paddingBottom={modal ? 24 : 0}>{footer}</SystemFooter>
          </View>
        )}
      </View>
    );
  }

  if (scrollViewProps) {
    return (
      <View style={styles.root}>
        <ScrollView
          {...scrollViewProps}
          style={styles.container}
          contentInsetAdjustmentBehavior="automatic"
          automaticallyAdjustContentInsets
          automaticallyAdjustKeyboardInsets
          automaticallyAdjustsScrollIndicatorInsets
          onScroll={globalScreenScrollHandler}
        >
          {shouldEnableLargeTitleQuirk && (
            <MaterialHeader title={title} transparent={isTransparent} />
          )}
          {props.scrollViewProps?.children}
          <View style={{ height: tabbarHeight + footerHeight }} />
        </ScrollView>
        {footer && (
          <View
            onLayout={globalFooterLayoutHandler}
            style={{ ...styles.footer, bottom: tabbarHeight }}
          >
            <SystemFooter paddingBottom={modal ? 24 : 0}>{footer}</SystemFooter>
          </View>
        )}
      </View>
    );
  }

  return <Text>wow such</Text>;
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
  },
});
