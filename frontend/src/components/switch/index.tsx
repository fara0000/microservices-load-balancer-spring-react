import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
    label: string;
    value: boolean;
    setValue: any;
}

export const SwitchControl: FC<Props> = ({ label, value, setValue }) => {
    return (
        <FormControl display='flex' w="full" flexDir="column" justifyContent="space-between" alignItems="center" flex={1} my={2} px={8}>
            <FormLabel htmlFor='switch' mb='0'>{label}</FormLabel>
            <Switch id='switch' onChange={() => setValue(!value)}/>
        </FormControl>
    );
}