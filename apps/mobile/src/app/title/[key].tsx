import { HeroBackdrop } from '@/components/hero/HeroBackdrop'
import { TitleInfo } from '@/components/hero/TitleInfo'
import { SectionCarousel } from '@/components/section-carousel/SectionCarousel'
import { TitleCard } from '@/components/title-card/TitleCard'
import { Button } from '@/components/ui/Button'
import { FloatingButton } from '@/components/ui/FloatingButton'
import { Screen } from '@/components/ui/Screen'
import { useDiscoverFindByKey } from '@app/api'
import { colors, fontSize, fontWeight, space } from '@app/tokens'
import { router, useLocalSearchParams } from 'expo-router'
import { ChevronLeft, Plus } from 'lucide-react-native'
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

export default function TitleDetail() {
  const { key } = useLocalSearchParams<{ key: string}>()
  const { width } = useWindowDimensions()
  const { data, isPanding } = useDiscoverFindByKey(key)

  if (isPanding || !data || data.status !== 200) return <Screen />

  const title = data.data

  const year = title.releaseDate
    ? new Date(title.releaseDate).getFullYear()
    : null

  const meta = [year, ...title.genres.slice(0, 3)].filter(Boolean).join(' · ')

  const cast = title.cast.slice(0, 3).map(actor => actor.name).join(', ')

  return (
    <Screen edges={[]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroBackdrop
          coverUrl={title.coverUrl}
          height={width * 1.2}
        />

        <View style={styles.content}>
          <TitleInfo
            name={title.name}
            meta={meta}
            description={title.description}
            descriptionLines={4}
          />

          <Button 
            icon={Plus}
            size='lg'
            onPress={() => {}}
          >
            Add to library
          </Button>

          {!!cast && (
            <Text style={styles.line}>
              <Text style={styles.label}>Cast: </Text>
              {cast}
            </Text>
          )}
        </View>

        {!!title.similar.length && (
          <View style={styles.similar}>
            <SectionCarousel title='You man also like'>
              {title.similar.map(item => (
                <TitleCard
                  key={item.key}
                  title={item}
                  onPress={() => router.push(`/title/${item.key}`)}
                />
              ))}
            </SectionCarousel>
          </View>
        )}
      </ScrollView>

      <FloatingButton 
        onPress={() => router.back()}
        icon={ChevronLeft}
        side="left"
        iconOffset={-2}
      />
    </Screen>
  )
}

const styles = StyleSheet.create({
  content: {
    marginTop: -space[20],
    paddingHorizontal: space['layout-horizontal'],
    gap: space[4]
  },
  line: {
    color: colors.text['little-muted'],
    fontSize: fontSize.sm
  },
  label: {
    color: colors.text.primary,
    fontWeight: fontWeight.medium
  },
  similar: {
    marginTop: space[4],
  }
})
