import { FloatingButton } from "@/components/ui/FloatingButton"
import { Screen } from "@/components/ui/Screen"
import { router } from "expo-router"
import { ChevronLeft } from "lucide-react-native"
import { Text } from "react-native"


export default function Subscription() {
    return (
			<Screen>
        <FloatingButton
            onPress={() => { router.back()}}
            side='left'
            icon={ChevronLeft}
            iconOffset={-2}
        />
        <Text>
            Subscription
        </Text>
    </Screen>
		)
}