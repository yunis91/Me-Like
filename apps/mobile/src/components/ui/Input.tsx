import { colors, fontSize, radius, space } from "@app/tokens"
import { Eye, EyeOff } from "lucide-react-native"
import { useState } from "react"
import { Pressable, StyleSheet, Text, TextInput, type TextInputProps, View } from "react-native"


interface Props extends TextInputProps {
  error?: string
  isPassword?: boolean
}

export function Input({error, isPassword, value, ...props}: Props) {
  const [isHidden, setIsHidden] = useState(isPassword)

  return (
    <View style={styles.root}>
      <View style={[styles.field, !!error && styles.fieldError]}>
        <TextInput
          style={ styles.input }
          placeholderTextColor={colors.text.muted}
          secureTextEntry={isPassword && isHidden}
          value={value ?? ''}
          {...props}
        />

        {isPassword && (
          <Pressable
            hitSlop={12}
            onPress={() => setIsHidden(v => !v)}
          >
            {isHidden ? (
              <EyeOff
                size={20}
                color={colors.text.muted}
              />
            ) : (
              <Eye
                size={20}
                color={colors.text.muted}
              />
            )}
          </Pressable>
        )}

      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  root: { gap: space[2] },
  field: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space[5],
    borderRadius: radius.full,
    borderWidth: 1,
    backgroundColor: colors.secondary,
  },
  fieldError: { borderColor: colors.status.error },
  input: {
    flex: 1,
    color: colors.text.primary,
    fontSize: fontSize.base
  },
  inputError: {
    borderWidth: 1,
    borderColor: colors.status.error
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm,
    paddingHorizontal: space[2]
  },

})