import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header';
import DepartmentWiseBarChart from '../../components/BarChart';
import { api } from '../../utils/Url';


const HomeScreen = () => {
  const navigation = useNavigation();

  const [statData, setStatData] = useState({
    totDoc: 0,
    totType: 0,
    totIndexFile: 0,
    totsplitedFile: 0,
  });

  const [departments, setDepartments] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      const response = await api.post(
        'DashboardEntity/GetDashboardData',
        {
          type: 1,
          pageID: 1,
          searchBy: '',
          fromdt: '1900-01-01',
          todt: new Date().toISOString().split('T')[0],
          print: 1,
        }
      );

      const dashboard = response.data?.data?.dashboardcls?.[0];
      if (dashboard) {
        setStatData({
          totDoc: dashboard.totDoc,
          totType: dashboard.totType,
          totIndexFile: dashboard.totIndexFile,
          totsplitedFile: dashboard.totsplitedFile,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load dashboard data');
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await api.post(
        'NewNodeMaster/GetNewNodeMaster',
        {
          id: -1,
          nodeID: -1,
          titleID: -1,
        }
      );

      if (response.data?.data?.length) {
        const names = response.data.data.map((item: any) => item.name);
        setDepartments(names);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load department data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchDepartmentData();
  }, []);

  const statCards = [
    { title: 'Total Document', value: statData.totDoc, color: '#007bff', screen: 'TotalDocument' },
    { title: 'Total Type', value: statData.totType, color: '#9c27b0', screen: 'TotalType' },
    { title: 'Total Index File', value: statData.totIndexFile, color: '#4caf50', screen: 'TotalIndex' },
    { title: 'Total Split File', value: statData.totsplitedFile, color: '#03a9f4', screen: 'TotalSplit' },
  ];

  const handleCardPress = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const handleDepartmentPress = (department: string) => {
    if (department === 'Academic Department') {
      navigation.navigate('AcademicDept' as never)
    }
    else if (department === 'Sales & Purchase') {
      navigation.navigate('SalesPurchaseDept' as never)
    }
    else if (department === 'Accounts') {
      navigation.navigate('AccountsDept' as never)
    }
    else if (department === 'Maintenance') {
      navigation.navigate('MaintainanceDept' as never)
    }
    else if (department === 'Establishment') {
      navigation.navigate('EstablishmentDept' as never)
    }
    else if (department === 'VC Office') {
      navigation.navigate('VCOfficeDept' as never)
    }
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {/* Stat Cards */}
        <View style={styles.cardRow}>
          {statCards.map((card, index) => (
            <TouchableOpacity key={index} style={[styles.card, { borderLeftColor: card.color }]} onPress={() => handleCardPress(card.screen)}>
              <Text style={[styles.cardTitle, { color: card.color }]}>{card.title}</Text>
              <Text style={styles.cardValue}>{card.value}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Department List */}
        <View style={styles.rowContainer}>
          <View style={styles.departmentBox}>
            <Text style={styles.departmentHeader}>Select Department</Text>
            {loading ? (
              <ActivityIndicator size="large" color="#007bff" />
            ) : (
              <FlatList
                data={departments}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleDepartmentPress(item)}>
                    <Text style={styles.departmentItem}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>

        {/* Department wise doc count */}
        <DepartmentWiseBarChart />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', padding: 16 },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  rowContainer: {
    marginTop: 20,
    flexDirection: 'column',
  },
  departmentBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  departmentHeader: {
    backgroundColor: '#ff6f00',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  departmentItem: {
    paddingVertical: 10,
    fontSize: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});

export default HomeScreen;


