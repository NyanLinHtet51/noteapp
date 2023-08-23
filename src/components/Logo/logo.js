import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Logo = ({ showBackBtn, navigation }) => {
  const backArrow = () => {
    navigation.navigate("Home")
  }
  return (
    <View style={styles.logoParent}>
        {
          showBackBtn &&
            <TouchableOpacity onPress={backArrow}>
              <Icon name="chevron-back-outline" style={styles.backArrow} />
            </TouchableOpacity>
        }
        <Text style={styles.logoText}>N O T E</Text>
        <Text style={styles.logoTextColor}>A P P</Text>
        <Text style={styles.logoText}>.</Text>
      </View>
    
  )
}

const styles = StyleSheet.create({
  backArrow: {
    fontSize: 25,
    color: '#000000',
    paddingTop: 4,
    position: 'absolute',
    left: -86,
    top: 0
  },
  logoParent: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 18,
    position: 'relative',
  },
  logoText: {
    color: "#1F2937",
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10
  },
  logoTextColor: {
    color: "#B0E9CA",
    fontSize: 24,
    fontWeight: '600',
    marginLeft: 10
  }
})

export default Logo