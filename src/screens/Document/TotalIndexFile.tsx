import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Header from '../../components/layout/Header';

interface FileItem {
  pdfid: number;
  fileName: string;
}

const TotalIndexFile: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch(
        'https://dmsreactapi.mssplonline.com/api/DashboardEntity/GetDashboardData',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 10,
            pageID: 1,
            searchBy: '',
            fromdt: '1900-01-01',
            todt: '2025-07-23',
            print: 1,
          }),
        }
      );

      const json = await response.json();
      if (json?.isSuccess && json.data?.totalIndex) {
        setFiles(json.data.totalIndex);
        setFilteredFiles(json.data.totalIndex);
      }
    } catch (error) {
      console.error('Error fetching index files:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = files.filter((item) =>
      item.fileName.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredFiles(filtered);
  };

  const renderItem = ({ item }: { item: FileItem }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.fileName}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.header}>Total Index/Split Files</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by File Name"
          value={search}
          onChangeText={handleSearch}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />
        ) : (
          <ScrollView horizontal>
            <View style={styles.table}>
              <View style={[styles.row, styles.headerRow]}>
                <Text style={styles.headerCell}>File Name</Text>
              </View>
              <FlatList
                data={filteredFiles}
                keyExtractor={(item) => item.pdfid.toString()}
                renderItem={renderItem}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TotalIndexFile;

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#0d6efd',
    color: 'white',
    padding: 12,
    borderRadius: 4,
  },
  searchInput: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  table: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#dee2e6',
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  cell: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
  },
  headerRow: {
    backgroundColor: '#e9ecef',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
});
