import { useLocalSearchParams } from "expo-router"
import { Text } from "react-native";

const OrderWithId = () => {
    const { id } = useLocalSearchParams();

    return (
        <Text>Order with id - { id }</Text>
    )
}