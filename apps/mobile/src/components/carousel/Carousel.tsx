import { colors, space } from '@app/tokens'
import { ChevronRight } from 'lucide-react-native'
import type { PropsWithChildren, ReactNode } from 'react'
import {
	Pressable,
	ScrollView,
	type StyleProp,
	StyleSheet,
	type TextStyle,
	View
} from 'react-native'

import { PreviewTitleHeader } from '../ui/PreviewTitleHeader'

interface Props extends PropsWithChildren {
  title?: string
  titleStyle?: StyleProp<TextStyle>
  beforeTitle?: ReactNode
  onPress?: () => void
}

export function Carousel({
  title,
  titleStyle,
  beforeTitle,
  children,
  onPress
}: Props) {
  return (
    <View style={styles.root}>
      {(title ?? Boolean(onPress)) && (
        <Pressable
          onPress={onPress}
          disabled={!onPress}
          hitSlop={12}
          style={styles.header}
        >
          {title && (
            <PreviewTitleHeader
              text={title}
              style={titleStyle}
            >
              {beforeTitle}
            </PreviewTitleHeader>
          )}

          {Boolean(onPress) && (
            <ChevronRight
              size={22}
              color={colors.text.primary}
            />
          )}
        </Pressable>
      )}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: space[3]
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space['layout-horizontal'],
    paddingVertical: space[2]
  },
  scroll: {
    gap: space[3],
    paddingHorizontal: space['layout-horizontal']
  }
})