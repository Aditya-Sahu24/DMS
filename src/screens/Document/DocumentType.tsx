import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import Header from '../../components/layout/Header';
// import { Ionicons } from '@expo/vector-icons';

interface DocumentType {
  docID: number;
  doc_Name: string;
  doc_shortname: string;
  parentDoc_Name: string | null;
  entry_Date: string;
}

export default function DocumentType({ navigation }: { navigation: any }) {
  const [docTypes, setDocTypes] = useState<DocumentType[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDocumentTypes();
  }, []);

  const fetchDocumentTypes = async () => {
    try {
      const response = await axios.post(
        'https://dmsreactapi.mssplonline.com/api/OtherDocType/GetOtherDocType',
        {
          docID: -1,
          parentDocId: 0,
          userId: '',
        }
      );
      if (response.data?.isSuccess) {
        setDocTypes(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching document types:', error);
    }
  };

  const filteredData = docTypes.filter((item) =>
    [item.doc_Name, item.doc_shortname, item.parentDoc_Name]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: DocumentType }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.doc_Name}</Text>
      <Text style={styles.cell}>{item.doc_shortname}</Text>
      <Text style={styles.cell}>{item.parentDoc_Name || '-'}</Text>
      <Text style={styles.cell}>
        {new Date(item.entry_Date).toLocaleDateString()}
      </Text>
    </View>
  );

  return (
    <>
      <Header />
      <View style={styles.container}>
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            {/* {<Ionicons name="arrow-back" size={24} color="#fff" />} */}
          </TouchableOpacity>
          <Text style={styles.headerText}>Document Types</Text>
        </View>

        {/* Search */}
        <TextInput
          style={styles.searchInput}
          placeholder="Search Document Types (Name, Short Name, Parent, Year...)"
          value={search}
          onChangeText={setSearch}
        />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Name</Text>
          <Text style={styles.cell}>Short Name</Text>
          <Text style={styles.cell}>Parent Name</Text>
          <Text style={styles.cell}>Entry Date</Text>
        </View>

        {/* List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.docID.toString()}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: '#007bff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#cbd5e0',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    paddingHorizontal: 4,
  },
});
