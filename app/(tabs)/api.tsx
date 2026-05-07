import { ActivityIndicator, FlatList, StyleSheet } from "react-native";

import useFetch from "@/hooks/useFetch";
import { Post } from "@/types/Post";

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function ApiDataScreen() {
  const { data, isLoading, error, hasMore, loadMore, currentPage } = useFetch<Post>(
    "https://jsonplaceholder.typicode.com/posts",
    { page: 1, limit: 10 }
  );

  if (isLoading && (!data || data.length === 0)) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>{`Error: ${error}`}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList<Post>
        data={data || []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <ThemedText type="subtitle">{item.title}</ThemedText>
            <ThemedText>{item.body}</ThemedText>
          </ThemedView>
        )}
        ListFooterComponent={
          hasMore && !isLoading ? (
            <ThemedView style={{ padding: 20, alignItems: 'center' }}>
              <ThemedText onPress={loadMore}>Load More...</ThemedText>
              <ThemedText style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Page {currentPage}</ThemedText>
            </ThemedView>
          ) : (
            hasMore ? (
              <ThemedView style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" />
              </ThemedView>
            ) : (
              <ThemedView style={{ padding: 20, alignItems: 'center' }}>
                <ThemedText>No more data</ThemedText>
                <ThemedText style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Page {currentPage}</ThemedText>
              </ThemedView>
            )
          )
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 10,
  },
});