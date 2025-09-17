import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import Pdf from "react-native-pdf";
import RNFS from "react-native-fs";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/types";

type Props = NativeStackScreenProps<RootStackParamList, "PdfViewer">;

const PdfViewer: React.FC<Props> = ({ route }) => {
  const { uri } = route.params;
  const [localPath, setLocalPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const downloadPdf = async () => {
      try {
        setLoading(true);
        setError(null);

        const path = `${RNFS.DocumentDirectoryPath}/temp.pdf`;

        const download = RNFS.downloadFile({
          fromUrl: uri,
          toFile: path,
          progress: (res) => {
            const percent = (res.bytesWritten / res.contentLength) * 100;
            setProgress(percent);
          },
        });

        await download.promise;
        setLocalPath(`file://${path}`);
        setLoading(false);
      } catch (e: any) {
        setLoading(false);
        setError("Failed to download PDF: " + e.message);
      }
    };

    downloadPdf();
  }, [uri]);

  return (
    <View style={styles.container}>
      {localPath && !error && (
        <Pdf
          source={{ uri: localPath }}
          style={styles.pdf}
          onLoadComplete={(pages) => {
            console.log(`✅ PDF loaded with ${pages} pages`);
          }}
          onError={(err: any) => {
            setError("Failed to open PDF: " + err.message);
            console.error("❌ PDF Error:", err);
          }}
        />
      )}

      {/* Loader overlay */}
      {loading && !error && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007bff" />
          <Text style={styles.loadingText}>
            Downloading... {progress.toFixed(0)}%
          </Text>
        </View>
      )}

      {/* Error */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.urlText}>URL: {uri}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  pdf: { flex: 1, width: "100%" },
  loadingContainer: {
    position: "absolute",
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 1000,
  },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorContainer: {
    position: "absolute",
    top: 50, left: 20, right: 20,
    padding: 15,
    backgroundColor: "#ffebee",
    borderRadius: 6,
  },
  errorText: { color: "#d32f2f", fontSize: 16, marginBottom: 5 },
  urlText: { fontSize: 12, color: "#666" },
});

export default PdfViewer;





