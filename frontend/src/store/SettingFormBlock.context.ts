import React from 'react';

export type SettingFormValuesType = {
    filterValue: string;
    sortable: string;
}

interface ISettingFormBlockContext {
    settingFormBlockValue: SettingFormValuesType;
    setSettingFormBlockValue: React.Dispatch<React.SetStateAction<SettingFormValuesType>>;
}

export const SettingFormBlockContext = React.createContext<ISettingFormBlockContext>({ settingFormBlockValue: { sortable: '', filterValue: ''}, setSettingFormBlockValue: () => {} });