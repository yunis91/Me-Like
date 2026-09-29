import type { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@app/tokens'

interface Props {
  children?: ReactNode
  edges?: ('top' | 'bottom')[]
}

export function Screen({ children, edges = ['top'] }: Props) {
  if (edges.length === 0) {
    return <View style={styles.root}>{children}</View>
  }

  return (
    <SafeAreaView
      style={styles.root}
      edges={edges}
    >
      {children}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg.base
  }
})
