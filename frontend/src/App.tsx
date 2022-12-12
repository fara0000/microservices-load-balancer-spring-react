import React, { useEffect, useState } from 'react';
import {MainPage} from "./views/main/MainPage";
import { SettingFormBlockContext, SettingFormValuesType } from "./store/SettingFormBlock.context";

export const App = () => {
    const [settingFormBlockValue, setSettingFormBlockValue] = useState<SettingFormValuesType>({ filterValue: '', sortable: '' })

    return (
        <SettingFormBlockContext.Provider value={{ settingFormBlockValue, setSettingFormBlockValue }}>
            <MainPage />
        </SettingFormBlockContext.Provider>)
};