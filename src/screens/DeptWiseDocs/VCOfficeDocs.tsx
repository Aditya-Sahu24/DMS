import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Header from '../../components/layout/Header';

interface DocFile {
  pdFid: number;
  pdfName: string;
  keywords: string;
  subFtype: string;
  pDate: string;
  isMain: string;
  entryDate: string;
  pdfPath: string;
}

interface DocMangrItem {
  docMid: number;
  fileNo: string;
  fileDef: string;
  department_Name: string;
  fDate: string;
  synopsis: string;
  complt: string;
  authPersn: string;
  perFr: string;
  perUt: string;
  createdate: string;
  sub_Subject_Name: string;
  fileType_Name: string;
  member_DocFiles: DocFile[];
}

const columnWidths = {
  srNo: 60,
  fileNo: 120,
  fileDef: 160,
  department: 180,
  fDate: 120,
  fileCount: 80,
};

const VCOfficeDocs = () => {
  const [data, setData] = useState<DocMangrItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchDocuments = async () => {
    try {
      const response = await axios.post(
        'https://dmsreactapi.mssplonline.com/api/DocMangr/GetDocMangr',
        {
          docMid: -1,
          fileTypId: -1,
          divisionid: 9,
          subsubjId: -1,
          user_Id: -1,
          fileNo: '',
        }
      );

      if (response.data.isSuccess) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleToggleExpand = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
  };

  const filteredData = data.filter(
    item =>
      item.fileNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.fileDef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sub_Subject_Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>VC Office Documents</Text>
        <Text style={styles.totalCount}>Total Records: {filteredData.length}</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by File No, Definition, Subject..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />

        {/* Outer vertical scroll */}
        <ScrollView style={{ flex: 1 }}>
          {/* Inner horizontal scroll for table */}
          <ScrollView horizontal>
            <View style={{ minWidth: 760 }}>
              <View style={[styles.row, styles.tableHeader]}>
                <Text style={[styles.cell, { width: columnWidths.srNo }]}>Sr. No</Text>
                <Text style={[styles.cell, { width: columnWidths.fileNo }]}>File No</Text>
                <Text style={[styles.cell, { width: columnWidths.fileDef }]}>Definition</Text>
                <Text style={[styles.cell, { width: columnWidths.department }]}>Department</Text>
                <Text style={[styles.cell, { width: columnWidths.fDate }]}>Date</Text>
                <Text style={[styles.cell, { width: columnWidths.fileCount }]}>Files</Text>
              </View>

              {filteredData.map((item, index) => (
                <View key={item.docMid}>
                  <TouchableOpacity
                    onPress={() => handleToggleExpand(item.docMid)}
                    style={[
                      styles.row,
                      index % 2 === 0 ? styles.dataRow : styles.alternateRow,
                    ]}
                  >
                    <Text style={[styles.cell, { width: columnWidths.srNo }]}>{index + 1}</Text>
                    <Text style={[styles.cell, { width: columnWidths.fileNo }]}>{item.fileNo}</Text>
                    <Text style={[styles.cell, { width: columnWidths.fileDef }]}>{item.fileDef || '-'}</Text>
                    <Text style={[styles.cell, { width: columnWidths.department }]}>{item.department_Name}</Text>
                    <Text style={[styles.cell, { width: columnWidths.fDate }]}>{formatDate(item.fDate)}</Text>
                    <Text style={[styles.cell, { width: columnWidths.fileCount }]}>
                      {item.member_DocFiles?.length}
                    </Text>
                  </TouchableOpacity>

                  {expanded === item.docMid && (
                    <View style={styles.detailsContainer}>
                      <Text style={styles.detailsTitle}>Details for Document #{item.docMid}</Text>
                      <Text><Text style={styles.bold}>Synopsis:</Text> {item.synopsis}</Text>
                      <Text><Text style={styles.bold}>Completion:</Text> {item.complt}</Text>
                      <Text><Text style={styles.bold}>Auth Person:</Text> {item.authPersn}</Text>
                      <Text><Text style={styles.bold}>Sub-Subject Name:</Text> {item.sub_Subject_Name}</Text>
                      <Text><Text style={styles.bold}>File Type Name:</Text> {item.fileType_Name}</Text>
                      <Text><Text style={styles.bold}>Period From:</Text> {formatDate(item.perFr)}</Text>
                      <Text><Text style={styles.bold}>Period Until:</Text> {formatDate(item.perUt)}</Text>
                      <Text><Text style={styles.bold}>Create Date:</Text> {formatDate(item.createdate)}</Text>

                      <Text style={styles.subHeader}>Associated Files ({item.member_DocFiles?.length})</Text>
                      {item.member_DocFiles.map(file => (
                        <View key={file.pdFid} style={styles.fileBox}>
                          <Text style={styles.bold}>{file.pdfName} (ID: {file.pdFid})</Text>
                          <Text>Keywords: {file.keywords || '-'}</Text>
                          <Text>Sub Type: {file.subFtype || '-'}</Text>
                          <Text>File Date: {formatDate(file.pDate)}</Text>
                          <Text>Is Main: {file.isMain || 'No'}</Text>
                          <Text>Entry Date: {formatDate(file.entryDate)}</Text>
                          <Text>Path: {file.pdfPath}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 8,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    backgroundColor: '#388E3C',
    color: 'white',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    textAlign: 'center'
  },
  totalCount: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
    color: '#444',
  },
  searchBar: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
  },
  tableHeader: {
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  dataRow: {
    backgroundColor: '#ffffff',
  },
  alternateRow: {
    backgroundColor: '#f0f4f8',
  },
  cell: {
    fontSize: 13,
    paddingHorizontal: 6,
    textAlign: 'left',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 4,
    borderRadius: 6,
    elevation: 1,
  },
  detailsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  subHeader: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  fileBox: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VCOfficeDocs;












