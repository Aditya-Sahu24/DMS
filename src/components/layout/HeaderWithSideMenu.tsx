import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  Platform,
  StatusBar,
  Image,

} from 'react-native';
import {
  Menu as MenuIcon,
  X as CloseIcon,
  ArrowLeft,
  LogOut,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logout } from "../../redux/features/auth/authSlice";

interface MenuItem {
  label: string;
  onPress: () => void;
}

interface HeaderWithSideDrawerProps {
  title: string;
  menuItems: MenuItem[];
}

const { width, height } = Dimensions.get('window');

const HeaderWithSideDrawer: React.FC<HeaderWithSideDrawerProps> = ({
  title,
  menuItems,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const handleMenuItemPress = (item: MenuItem) => {
    closeMenu();
    item.onPress();
  };

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {/* {navigation.canGoBack() && (
          <TouchableOpacity onPress={navigation.goBack} style={styles.backIcon}>
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
        )} */}

        <TouchableOpacity onPress={openMenu} style={styles.iconContainer}>
          <MenuIcon color="#fff" size={24} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#fff", borderRadius: 8, marginRight: 5 }}>
          <Image
            source={require('../../assets/images/Logo2.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={() => { navigation.navigate("Home" as never) }}>
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />

        <TouchableOpacity onPress={handleLogout} style={styles.logoutIcon}>
          <LogOut color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={menuOpen}
        transparent
        animationType="none"
        onRequestClose={closeMenu}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.menuHeader}>
            <Text style={styles.menuTitle}>Menu</Text>
            <TouchableOpacity onPress={closeMenu}>
              <CloseIcon color="#000" size={24} />
            </TouchableOpacity>
          </View>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMenuItemPress(item)}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  backIcon: {
    marginRight: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  logo: {
    width: 32,
    height: 32,
    // marginRight: 8,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  logoutIcon: {
    marginLeft: 'auto',
    // marginLeft: 12,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: height + (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0),
    width: width,
    backgroundColor: '#fff',
    zIndex: 2,
    paddingTop: 60,
    paddingHorizontal: 20,
    elevation: 10,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  menuTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  menuItem: {
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1,
  },
});

export default HeaderWithSideDrawer;
