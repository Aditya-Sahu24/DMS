export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  // Add other screens here
};

// This allows type checking for the navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
