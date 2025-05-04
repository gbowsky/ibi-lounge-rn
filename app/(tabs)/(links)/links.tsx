import { NoGrades } from "@/components/grades/NoGrades";
import { GlobalIcon } from "@/components/ui/GlobalIcon";
import { GlobalScreen } from "@/components/ui/GlobalScreen";
import { LinkItem, SectionItem } from "@/lib/api/links";
import { i18n } from "@/lib/localization";
import { useApiStore } from "@/stores/ApiStore";
import { useEffect } from "react";
import { Linking, StyleSheet, View } from "react-native";
import { List } from "react-native-paper";

const HARD_LINKS_SECTION: SectionItem[] = [
  {
    title: "Полезные ссылки",
    data: [
      {
        translated: "links.eos",
        text: "ЕЭОС",
        href: "https://lms.ibispb.ru",
      },
      {
        translated: "links.employees",
        text: "Педагогический состав",
        href: "https://ibispb.ru/sveden/employees/",
      },
      {
        translated: "links.contacts",
        text: "Контакты",
        href: "https://ibispb.ru/contacts/",
      },
    ],
  },
];

export default function LinksScreen({}) {
  const { links, loadLinks, linksLoading, linksError } = useApiStore();

  async function fetchData() {
    await loadLinks();
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GlobalScreen<LinkItem, SectionItem>
      title={i18n.get("screens.links")}
      largeTitle
      sectionListProps={{
        onRefresh: () => fetchData(),
        refreshing: linksLoading,
        sections: [...HARD_LINKS_SECTION, ...links],
        keyExtractor: (_, index) => `links-${index}`,
        renderSectionHeader: ({ section }) => (
          <List.Subheader key={`section-${section.title}`}>
            {section.title}
          </List.Subheader>
        ),
        renderItem: ({ item, index }) => (
          <List.Item
            onPress={async () => {
              const canOpen = await Linking.canOpenURL(item.href);
              if (canOpen) {
                Linking.openURL(item.href);
              }
            }}
            key={`link-${index}`}
            title={item.translated ? i18n.get(item.translated) : item.text}
            titleNumberOfLines={4}
            left={({ color, style }) => (
              <View style={style}>
                <GlobalIcon color={color} icon="link" size={20} />
              </View>
            )}
          />
        ),
        ListEmptyComponent: (
          <NoGrades
            loading={linksLoading}
            code={linksError}
            onReload={() => loadLinks()}
          />
        ),
      }}
    />
  );
}

const styles = StyleSheet.create({
  grade: {
    flex: 1,
    minWidth: 40,
    textAlign: "right",
  },
});
