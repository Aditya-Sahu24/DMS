import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import HeaderWithSideMenu from './HeaderWithSideMenu';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/features/auth/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();


  const handleLogout = () => {
    dispatch(logout());               // Clear auth state
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],    // Reset stack to Login
    });
  };

  return (
    <View>
      <HeaderWithSideMenu
        title="DMS"
        menuItems={[
          { label: 'Home', onPress: () => navigation.navigate('Home' as never) },
          { label: 'Total Documents', onPress: () => navigation.navigate('TotalDocument' as never) },
          { label: 'Total Types', onPress: () => navigation.navigate('TotalType' as never) },
          { label: 'Total Index File', onPress: () => navigation.navigate('TotalIndex' as never) },
          { label: 'Total Split file', onPress: () => navigation.navigate('TotalSplit' as never) },
          { label: 'Academic Documents', onPress: () => navigation.navigate('AcademicDept' as never) },
          { label: 'Sales & Purchase Documaents', onPress: () => navigation.navigate('SalesPurchaseDept' as never) },
          { label: 'Accounts Documents', onPress: () => navigation.navigate('AccountsDept' as never) },
          { label: 'Maintainance Documents', onPress: () => navigation.navigate('MaintainanceDept' as never) },
          { label: 'Establishment Documents', onPress: () => navigation.navigate('EstablishmentDept' as never) },
          { label: 'VC Office Documents', onPress: () => navigation.navigate('VCOfficeDept' as never) },
          {
            label: 'Logout', onPress: () => {
              handleLogout()
            }
          },
        ]}
      />
    </View>
  )
}

export default Header