export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  TotalDocument: undefined;
  TotalType: undefined;
  TotalIndex: undefined;
  TotalSplit: undefined;
  AcademicDept: undefined;
  SalesPurchaseDept: undefined;
  AccountsDept: undefined;
  MaintainanceDept: undefined;
  EstablishmentDept: undefined;
  VCOfficeDept: undefined;
  // Add other screens here
};

// This allows type checking for the navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
