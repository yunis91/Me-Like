import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { colors } from '@app/tokens'

export function Loader() {
  return (
    <View style={styles.root}>
      <ActivityIndicator
        size='large'
        color={colors.text.primary}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
