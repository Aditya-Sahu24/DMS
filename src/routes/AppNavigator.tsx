import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import LoginScreen from '../screens/Login/LoginScreen';
import { RootStackParamList } from './types';
import TotalDocuments from '../screens/Document/TotalDocument';
import DocumentType from '../screens/Document/DocumentType';
import TotalIndexFile from '../screens/Document/TotalIndexFile';
import AcademicDocumentsScreen from '../screens/DeptWiseDocs/AcademicDepartmentDocs';
import SalesPurchaseDocs from '../screens/DeptWiseDocs/SalesPurchaseDocs';
import AccountDocs from '../screens/DeptWiseDocs/AccountDocs';
import MaintainanceDocs from '../screens/DeptWiseDocs/MaintainanceDocs';
import EstablishmentDocs from '../screens/DeptWiseDocs/EstablishmentDocs';
import VCOfficeDocs from '../screens/DeptWiseDocs/VCOfficeDocs';

import PdfViewer from '../components/common/PdfViewer';

// Create the navigator with the type parameter
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      // options={{ title: 'Welcome to DMS' }}
      />
      <Stack.Screen
        name="TotalDocument"
        component={TotalDocuments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TotalType"
        component={DocumentType}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TotalIndex"
        component={TotalIndexFile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TotalSplit"
        component={TotalIndexFile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AcademicDept"
        component={AcademicDocumentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SalesPurchaseDept"
        component={SalesPurchaseDocs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AccountsDept"
        component={AccountDocs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MaintainanceDept"
        component={MaintainanceDocs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EstablishmentDept"
        component={EstablishmentDocs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VCOfficeDept"
        component={VCOfficeDocs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PdfViewer"
        component={PdfViewer}
        options={{ headerShown: true, title: 'PDF Preview' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
