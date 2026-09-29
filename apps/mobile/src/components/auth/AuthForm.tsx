import { Button } from "@/components/ui/Button"
import { FloatingButton } from "@/components/ui/FloatingButton"
import { Input } from "@/components/ui/Input"
import { Screen } from "@/components/ui/Screen"
import { ApiError } from "@app/api"
import { AUTH_CONTENT } from '@app/constants'
import { authSchema, type TAuthForm } from '@app/schemas'
import { colors, fontSize, fontWeight, space } from "@app/tokens"
import { zodResolver } from '@hookform/resolvers/zod'
import { router } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { Controller, useForm } from 'react-hook-form'
import { Pressable, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"

interface Props {
	type: keyof typeof AUTH_CONTENT
	isPending: boolean
	error: unknown
	onSubmit: (data: TAuthForm) => void
}

export function AuthForm({error, isPending, onSubmit, type}: Props) {
	
	const content = AUTH_CONTENT[type]

	const { control, handleSubmit } = useForm<TAuthForm>({
		resolver: zodResolver(authSchema)
	})

	return (
  <Screen>
    <View style={styles.root}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.center}
        bottomOffset={140}
        keyboardShouldPersistTaps='handled'
      >
        <Text style={styles.title}>{content.title}</Text>

      <View style={styles.form}>
        <Controller
          control={control}
          name='email'
          render={({field, fieldState})=> (
          <Input
            placeholder='Enter email:'
            autoCapitalize="none"
            keyboardType="email-address"
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({field, fieldState})=> (
          <Input
            placeholder='Enter password:'
            isPassword
            value={field.value}
            onChangeText={field.onChange}
            error={fieldState.error?.message}
          />
          )}
        />
        {error instanceof ApiError && (
          <Text style={styles.error}>{error.messages[0]}</Text>
        )}

        <Button
          size='lg'
          onPress={handleSubmit(onSubmit)}
          isDisabled={isPending}
        >
          {isPending ?  content.pending : content.submit}
        </Button>



        </View>
      </KeyboardAwareScrollView>
      <FloatingButton
          icon={ChevronLeft}
          onPress={() => router.replace('/')}
          side='left'
      />
      <Pressable onPress={() => router.replace(content.footerHref)}>
        <Text style={styles.link}>
          {content.footerText}{' '}
          <Text style={styles.linkAccent}>{content.footerAction}</Text>
        </Text>
      </Pressable>
    </View>

  </Screen>
)}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: space[3],
    paddingBottom: space[6]
  },
  scroll: {
    flex: 1
  },
  center: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: space[10]
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize['2xl'],
    fontWeight: fontWeight.bold,
    textAlign: 'center'
  },
  form: {
    gap: space[3]
  },
  error: {
    color: colors.status.error,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  link: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  linkAccent: {
    fontWeight: fontWeight.semibold,
    textDecorationLine: 'underline'
  }
})