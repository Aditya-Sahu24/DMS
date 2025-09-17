import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { api } from '../../utils/Url';
import Header from '../../components/layout/Header';

interface FileItem {
  pdFid: number;
  pdfName: string;
  keywords: string;
  subFtype: string;
  entryDate: string;
  pdfPath: string;
}

interface DocumentItem {
  docMid: number;
  fileNo: string;
  fileDef: string;
  department_Name: string;
  createdate: string;
  synopsis: string;
  complt: string;
  sub_Subject_Name: string;
  fileType_Name: string;
  perFr: string;
  perUt: string;
  authPersn: string;
  member_DocFiles: FileItem[];
}

export default function TotalDocuments({ navigation }: { navigation: any }) {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await api.post(
        'DocMangr/GetDocMangr',
        {
          docMid: -1,
          fileTypId: -1,
          divisionid: -1,
          subsubjId: -1,
          user_Id: -1,
          fileNo: '',
        }
      );
      setDocuments(response.data.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const filteredDocs = documents.filter(doc =>
    doc.fileNo.toLowerCase().includes(search.toLowerCase()) ||
    doc.fileDef?.toLowerCase().includes(search.toLowerCase()) ||
    doc.department_Name.toLowerCase().includes(search.toLowerCase())
  );

  const renderDocRow = ({ item }: { item: DocumentItem }) => {
    const isExpanded = expandedId === item.docMid;

    return (
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={() => toggleExpand(item.docMid)} style={styles.row}>
          <Text style={[styles.cell, styles.colFileNo]}>{item.fileNo}</Text>
          <Text style={[styles.cell, styles.colDef]}>{item.fileDef || '-'}</Text>
          <Text style={[styles.cell, styles.colDept]}>{item.department_Name}</Text>
          <Text style={[styles.cell, styles.colDate]}>{new Date(item.createdate).toLocaleDateString()}</Text>
          <Text style={[styles.cell, styles.colFiles]}>{item.member_DocFiles?.length || 0}</Text>
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedBox}>
            <Text style={styles.detailTitle}>Details for Document #{item.docMid}</Text>
            <Text><Text style={styles.bold}>Synopsis:</Text> {item.synopsis}</Text>
            <Text><Text style={styles.bold}>Sub-Subject Name:</Text> {item.sub_Subject_Name}</Text>
            <Text><Text style={styles.bold}>File Type:</Text> {item.fileType_Name}</Text>
            <Text><Text style={styles.bold}>Completion:</Text> {item.complt}</Text>
            <Text><Text style={styles.bold}>Auth Person:</Text> {item.authPersn || '-'}</Text>
            <Text><Text style={styles.bold}>Period From:</Text> {new Date(item.perFr).toLocaleDateString()}</Text>
            <Text><Text style={styles.bold}>Period Until:</Text> {new Date(item.perUt).toLocaleDateString()}</Text>
            <Text><Text style={styles.bold}>Create Date:</Text> {new Date(item.createdate).toLocaleDateString()}</Text>

            <Text style={[styles.bold, { marginTop: 10 }]}>Associated Files ({item.member_DocFiles.length})</Text>
            {item.member_DocFiles.map(file => (
              <View key={file.pdFid} style={styles.fileBox}>
                <Text style={styles.bold}>{file.pdfName}</Text>
                <Text>Keywords: {file.keywords || '-'}</Text>
                <Text>Sub Type: {file.subFtype || '-'}</Text>
                <Text>Entry Date: {new Date(file.entryDate).toLocaleDateString()}</Text>
                <TouchableOpacity
                  style={styles.showDocButton}
                  onPress={() => navigation.navigate("PdfViewer", { uri: file.pdfPath })}
                >
                  <Text style={styles.showDocText}>Show Document</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Document Details</Text>
        </View>

        {/* Search */}
        <TextInput
          placeholder="Search Documents (ID, File No, Definition, Dept...)"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.colFileNo]}>File No</Text>
          <Text style={[styles.cell, styles.colDef]}>Definition</Text>
          <Text style={[styles.cell, styles.colDept]}>Department</Text>
          <Text style={[styles.cell, styles.colDate]}>Date</Text>
          <Text style={[styles.cell, styles.colFiles]}>Files</Text>
        </View>

        <ScrollView>
          <View>
            <FlatList
              data={filteredDocs}
              renderItem={renderDocRow}
              keyExtractor={(item) => item.docMid.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: "center"
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  rowContainer: {
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  cell: {
    fontSize: 12,
    paddingHorizontal: 4,
  },
  // proportional column widths
  colFileNo: { flex: 1.2 },   // File numbers usually short
  colDef: { flex: 2.5 },      // Definition needs more space
  colDept: { flex: 2 },       // Department names medium
  colDate: { flex: 1.5 },     // Dates fixed width
  colFiles: { flex: 0.8, textAlign: "center" }, // File count small

  expandedBox: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
  detailTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  fileBox: {
    marginTop: 6,
    padding: 6,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
  showDocButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1976D2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: "flex-start",
  },
  showDocText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
  },


});










