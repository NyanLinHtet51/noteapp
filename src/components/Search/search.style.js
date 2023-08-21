import { StyleSheet } from "react-native";

const SearchStyles = StyleSheet.create({
  inputParent: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ECECEC',
    width: '96%',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 18
  },
  inputText: {
    flex: 1,
    height: 40,
    fontSize: 16,
    marginLeft: 12
  },
  button: {
    fontSize: 25,
    color: '#7C7C7C',
    paddingTop: 4
  },
});

export default SearchStyles;