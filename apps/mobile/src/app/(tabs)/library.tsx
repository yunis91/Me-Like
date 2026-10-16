import StatusFilter from '@/components/library/StatusFilter'
import { TitleCard } from '@/components/titles'
import { Screen } from '@/components/ui/Screen'
import { ScreenTitle } from '@/components/ui/ScreenTitle'
import { useLibraryFindAll, useUserFindMe } from '@app/api'
import { colors, fontSize, space } from '@app/tokens'
import { type TLibraryStatus } from '@app/types'
import { Redirect } from 'expo-router'
import { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default function Library() {
  const {data: me, isLoading, isError} = useUserFindMe()

  const [status, setStatus] = useState<TLibraryStatus | null>(null)

  const {data, isPending} = useLibraryFindAll({
    status: status ? [status] : undefined, take: 27,
  }, {
    query: {enabled: !!me}
  })

  const entries = data?.status === 200 ? data.data.items : []

  if(isLoading) return <Screen />
  
    if(isError || !me) return <Redirect href='/login' />

  return (
    <Screen>
      <View style={styles.header}>
        <ScreenTitle>Library</ScreenTitle>
      </View>
      
      <StatusFilter
        value={status}
        onChange={setStatus}
      />
      
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({item}) => (
          <TitleCard
            title={item.title}
            onPress={() => {}}
          />
        )}
        ListEmptyComponent={
          isPending ? null : <Text style={styles.empty}>Nothing here yet</Text>
        }
      />
    </Screen>
  )
}


const styles = StyleSheet.create({
  header: {
    marginBottom: space[4],
    paddingHorizontal: space['layout-horizontal']
  },
  list: {
    gap: space[3],
    padding: space['layout-horizontal']
  },
  row: {
    gap: space[3]
  },
  empty: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    textAlign: 'center'
  }
})