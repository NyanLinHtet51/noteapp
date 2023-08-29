import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

const Logo = ({ showBackBtn }) => {
  const navigation = useNavigation();
  
  const backArrow = () => {
    navigation.goBack();
  }
  return (
    <View style={styles.logoParent}>
      <View style={styles.logo}>
        {
          showBackBtn &&
          <TouchableOpacity onPress={backArrow}>
            <Icon name="chevron-back-outline" style={styles.backArrow} />
          </TouchableOpacity>
        }
        <View style={styles.textParent}>
          <Text style={styles.logoText}>N O T E</Text>
          <Text style={styles.logoTextColor}>A P P</Text>
          <Text style={styles.logoText}>.</Text>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  backArrow: {
    fontSize: 25,
    color: '#000000',
    paddingTop: 4,
    alignSelf: 'flex-start'
  },
  logoParent: {
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 18,
  },
  logo: {
    flexDirection: 'row',
  },
  textParent: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
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