import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const GRID_CARD_W = (width - 32 - 12) / 2; // 16px padding *2, 12px gap

// --- Mock data (đổi URL ảnh tùy ý) ---
const suggestions = [
  {
    id: "s1",
    title: "Reflection",
    subtitle: "Christina Aguilera",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "s2",
    title: "In The Stars",
    subtitle: "Benson Boone",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",
  },
];

const charts = [
  {
    id: "c1",
    title: "Top 50",
    caption: "Canada",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "c2",
    title: "Top 50",
    caption: "Global",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "c3",
    title: "Top 50",
    caption: "Trending",
    image:
      "https://images.unsplash.com/photo-1520975922284-9bcd8dac25b0?q=80&w=800&auto=format&fit=crop",
  },
];

const albums = [
  {
    id: "a1",
    title: "ME",
    artist: "Jessica Gonzalez",
    image:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "a2",
    title: "Magna nost",
    artist: "Brian Thomas",
    image:
      "https://images.unsplash.com/photo-1520975922284-9bcd8dac25b0?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "a3",
    title: "Night Color",
    artist: "Christopher Lee",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
  },
];

const artists = [
  {
    id: "p1",
    name: "Jennifer Wilson",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Elizabeth Hall",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Anthony Mills",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Mia Nguyen",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
  },
];

// --- Sub components ---
const TopBar = () => {
  return (
    <View style={styles.topbar}>
      <View style={styles.logoDot} />
      <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
        <Ionicons name="notifications-outline" size={22} color="#2b2b2b" />
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=240&auto=format&fit=crop",
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.searchWrap}>
      <Ionicons name="search" size={18} color="#9aa1ac" />
      <TextInput
        placeholder="What you want to listen to"
        placeholderTextColor="#9aa1ac"
        style={styles.searchInput}
      />
    </View>
  );
};

const SectionHeader = ({ title, actionText, onPress }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionText ? (
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const SuggestionCard = ({ item }) => {
  return (
    <TouchableOpacity style={[styles.suggestCard, { width: GRID_CARD_W }]}>
      <Image source={{ uri: item.image }} style={styles.suggestImage} />
      <View style={styles.suggestOverlay} />
      <View style={styles.suggestTextWrap}>
        <Text numberOfLines={1} style={styles.suggestTitle}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={styles.suggestSubtitle}>
          {item.subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const ChartCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.chartCard}>
      <Image source={{ uri: item.image }} style={styles.chartImage} />
      <Text style={styles.chartTitle}>{item.title}</Text>
      <Text style={styles.chartCaption}>{item.caption}</Text>
      <Text style={styles.chartSub}>Daily chart-toppers update</Text>
    </TouchableOpacity>
  );
};

const AlbumCard = ({ item }) => {
  return (
    <TouchableOpacity style={styles.albumCard}>
      <Image source={{ uri: item.image }} style={styles.albumImage} />
      <Text numberOfLines={1} style={styles.albumTitle}>
        {item.title}
      </Text>
      <Text numberOfLines={1} style={styles.albumArtist}>
        {item.artist}
      </Text>
    </TouchableOpacity>
  );
};

const ArtistPill = ({ item }) => {
  return (
    <View style={styles.artistWrap}>
      <Image source={{ uri: item.image }} style={styles.artistAvatar} />
      <Text numberOfLines={1} style={styles.artistName}>
        {item.name}
      </Text>
      <TouchableOpacity style={styles.followBtn}>
        <Text style={styles.followTxt}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Home Screen ---
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <TopBar />

        <View style={{ marginTop: 8 }}>
          <Text style={styles.hello}>Good morning,</Text>
          <Text style={styles.userName}>Ashley Scott</Text>
        </View>

        <SearchBar />

        {/* Suggestions */}
        <SectionHeader title="Suggestions for you" />
        <View style={styles.gridRow}>
          {suggestions.map((s) => (
            <SuggestionCard key={s.id} item={s} />
          ))}
        </View>

        {/* Charts */}
        <SectionHeader title="Charts" actionText="See all" onPress={() => {}} />
        <FlatList
          horizontal
          data={charts}
          keyExtractor={(it) => it.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => <ChartCard item={item} />}
        />

        {/* Trending albums */}
        <SectionHeader
          title="Trending albums"
          actionText="See all"
          onPress={() => {}}
        />
        <FlatList
          horizontal
          data={albums}
          keyExtractor={(it) => it.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => <AlbumCard item={item} />}
        />

        {/* Popular artists */}
        <SectionHeader
          title="Popular artists"
          actionText="See all"
          onPress={() => {}}
        />
        <FlatList
          horizontal
          data={artists}
          keyExtractor={(it) => it.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          renderItem={({ item }) => <ArtistPill item={item} />}
        />
        <View style={{ height: 24 }} />
      </ScrollView>

      {/* Bottom mock tab bar (để giống ảnh, chưa gắn điều hướng) */}
      <View style={styles.tabbar}>
        <TabItem active label="Home" icon="home" />
        <TabItem label="Search" icon="search" />
        <TabItem label="Feed" icon="albums-outline" />
        <TabItem label="Library" icon="library-outline" />
      </View>
    </View>
  );
}

const TabItem = ({ label, icon, active }) => (
  <TouchableOpacity style={styles.tabItem}>
    <Ionicons
      name={
        icon === "home"
          ? active
            ? "home"
            : "home-outline"
          : icon === "search"
          ? "search"
          : icon === "library-outline"
          ? "library-outline"
          : icon
      }
      size={22}
      color={active ? "#2b6be6" : "#8a8f99"}
    />
    <Text style={[styles.tabLabel, active && { color: "#2b6be6" }]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { paddingBottom: 88 }, // chừa chỗ cho tabbar
  topbar: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e74d5b",
  },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#ddd" },
  hello: { fontSize: 14, color: "#6f7780", paddingHorizontal: 16 },
  userName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#171a1f",
    paddingHorizontal: 16,
    marginTop: 2,
  },
  searchWrap: {
    marginTop: 14,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e6e8ec",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f7f8fa",
  },
  searchInput: { flex: 1, fontSize: 14, color: "#1e1f24" },

  sectionHeader: {
    marginTop: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: "#171a1f" },
  actionText: { color: "#6f7780", fontSize: 13, fontWeight: "600" },

  gridRow: {
    paddingHorizontal: 16,
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },
  suggestCard: {
    height: GRID_CARD_W * 1.05,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ddd",
  },
  suggestImage: { width: "100%", height: "100%" },
  suggestOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  suggestTextWrap: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
  },
  suggestTitle: { color: "#fff", fontWeight: "800", fontSize: 16 },
  suggestSubtitle: { color: "#f0f0f0", marginTop: 2, fontSize: 12 },

  chartCard: {
    width: 140,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eceff3",
    overflow: "hidden",
  },
  chartImage: { width: "100%", height: 90 },
  chartTitle: {
    marginTop: 8,
    paddingHorizontal: 10,
    fontWeight: "800",
    fontSize: 16,
    color: "#171a1f",
  },
  chartCaption: {
    paddingHorizontal: 10,
    color: "#6f7780",
    fontWeight: "700",
    marginTop: 2,
  },
  chartSub: {
    paddingHorizontal: 10,
    color: "#8a8f99",
    fontSize: 12,
    marginTop: 6,
    marginBottom: 10,
  },

  albumCard: { width: 140 },
  albumImage: {
    width: 140,
    height: 140,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  albumTitle: {
    marginTop: 8,
    fontWeight: "700",
    color: "#171a1f",
  },
  albumArtist: { color: "#6f7780", fontSize: 12, marginTop: 2 },

  artistWrap: {
    width: 160,
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eceff3",
    paddingVertical: 14,
  },
  artistAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#eee" },
  artistName: {
    marginTop: 10,
    fontWeight: "700",
    color: "#171a1f",
    paddingHorizontal: 12,
  },
  followBtn: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#171a1f",
  },
  followTxt: { color: "#fff", fontWeight: "700", fontSize: 12 },

  tabbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
    borderTopWidth: 1,
    borderTopColor: "#eef1f5",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabItem: { alignItems: "center", gap: 4 },
  tabLabel: { fontSize: 11, color: "#8a8f99", fontWeight: "700" },
});
