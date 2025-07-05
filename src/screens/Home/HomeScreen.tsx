// // src/screens/HomeScreen.tsx
// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const HomeScreen = () => (
//   <View style={styles.container}>
//     <Text style={styles.text}>Welcome to Document Management System!</Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   text: { fontSize: 20, fontWeight: 'bold' },
// });

// export default HomeScreen;


// HomeScreen.tsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet, FlatList } from 'react-native';
// import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';

const statCards = [
  { title: 'Total Document', value: 38, color: '#007bff' },
  { title: 'Total Type', value: 4, color: '#9c27b0' },
  { title: 'Total Index File', value: 25, color: '#4caf50' },
  { title: 'Total Split File', value: 25, color: '#03a9f4' },
];

const departments = [
  'Academic Department',
  'Sales & Purchase',
  'Accounts',
  'Maintenance',
  'Establishment',
  'VC Office',
];

const chartData = [
  { department: 'Academic Department', count: 9 },
  { department: 'Sales & Purchase', count: 10 },
  { department: 'Accounts', count: 4 },
  { department: 'Maintenance', count: 5 },
  { department: 'Establishment', count: 2 },
  { department: 'VC Office', count: 8 },
];

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Stat Cards */}
      <View style={styles.cardRow}>
        {statCards.map((card, index) => (
          <View key={index} style={[styles.card, { borderLeftColor: card.color }]}>
            <Text style={[styles.cardTitle, { color: card.color }]}>{card.title}</Text>
            <Text style={styles.cardValue}>{card.value}</Text>
          </View>
        ))}
      </View>

      {/* Department List and Chart */}
      <View style={styles.rowContainer}>
        <View style={styles.departmentBox}>
          <Text style={styles.departmentHeader}>Select Department</Text>
          <FlatList
            data={departments}
            keyExtractor={(item) => item}
            renderItem={({ item }) => <Text style={styles.departmentItem}>{item}</Text>}
          />
        </View>

        {/* <View style={styles.chartContainer}>
          <Text style={styles.chartHeader}>Department Wise Document Counts</Text>
          <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
            <VictoryBar
              data={chartData}
              x="department"
              y="count"
              style={{
                data: { fill: '#9c27b0', width: 20 },
                labels: { fontSize: 10 },
              }}
            />
          </VictoryChart>
        </View> */}
      </View>
    </ScrollView>
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

  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
  },
  chartHeader: {
    backgroundColor: '#9c27b0',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 8,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;
